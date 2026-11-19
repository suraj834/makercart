const http = require("http");
const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

function loadEnv() {
  try {
    fs.readFileSync(path.join(__dirname, ".env"), "utf8").split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    });
  } catch (error) {}
}

loadEnv();

const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function json(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" });
  response.end(JSON.stringify(body));
}

function requestJson(options, body) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => {
        let parsed;
        try { parsed = JSON.parse(data); } catch (error) { parsed = { error: { description: data } }; }
        if (response.statusCode >= 400) reject(Object.assign(new Error(parsed.error?.description || "Razorpay request failed"), { statusCode: response.statusCode }));
        else resolve(parsed);
      });
    });
    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function createRazorpayOrder(request, response) {
  let body = "";
  request.on("data", (chunk) => { body += chunk; });
  request.on("end", async () => {
    try {
      const payload = JSON.parse(body || "{}");
      const amount = Number(payload.amount);
      if (!Number.isInteger(amount) || amount < 100) return json(response, 400, { error: "Amount must be at least 100 paise." });
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return json(response, 500, { error: "Razorpay is not configured on the server." });
      const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
      const order = await requestJson({ hostname: "api.razorpay.com", path: "/v1/orders", method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } }, JSON.stringify({ amount, currency: "INR", receipt: String(payload.receipt || `mc_${Date.now()}`).slice(0, 40) }));
      json(response, 200, { order_id: order.id, amount: order.amount, currency: order.currency, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) { json(response, error.statusCode === 401 ? 401 : 500, { error: error.message }); }
  });
}

function verifyRazorpayPayment(request, response) {
  let body = "";
  request.on("data", (chunk) => { body += chunk; });
  request.on("end", () => {
    try {
      const payload = JSON.parse(body || "{}");
      if (!payload.razorpay_order_id || !payload.razorpay_payment_id || !payload.razorpay_signature) return json(response, 400, { verified: false, error: "Missing payment verification fields." });
      const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${payload.razorpay_order_id}|${payload.razorpay_payment_id}`).digest("hex");
      const expectedBuffer = Buffer.from(expected);
      const receivedBuffer = Buffer.from(payload.razorpay_signature);
      const valid = expectedBuffer.length === receivedBuffer.length && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
      if (!valid) return json(response, 400, { verified: false, error: "Payment signature mismatch." });
      json(response, 200, { verified: true });
    } catch (error) { json(response, 400, { verified: false, error: "Invalid verification request." }); }
  });
}

function fileForRequest(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const requested = pathname === "/" ? "/index.html" : pathname;
  const file = path.resolve(root, `.${requested}`);
  if (!file.startsWith(root + path.sep) && file !== root) return null;
  return file;
}

const server = http.createServer((request, response) => {
  if (request.method === "OPTIONS" && request.url.startsWith("/api/")) {
    response.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" });
    response.end();
    return;
  }
  if (request.method === "POST" && request.url === "/api/create-order") return createRazorpayOrder(request, response);
  if (request.method === "POST" && request.url === "/api/verify-payment") return verifyRazorpayPayment(request, response);
  const file = fileForRequest(request.url);
  if (!file) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" });
    fs.createReadStream(file).pipe(response);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Maker Cart listening on port ${port}`);
});
