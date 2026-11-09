const STORE_NAME = "Maker Cart";
const SPREADSHEET_NAME = "Maker Cart Orders";
const SCREENSHOT_FOLDER_NAME = "Maker Cart Payment Screenshots";

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: STORE_NAME }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);
    const sheet = getOrdersSheet();
    const orderId = `MC-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd-HHmmss")}`;
    let screenshotUrl = "";
    if (payload.screenshot && payload.screenshot.data) {
      const folder = getScreenshotFolder();
      const bytes = Utilities.base64Decode(payload.screenshot.data);
      const blob = Utilities.newBlob(bytes, payload.screenshot.type || "image/jpeg", `${orderId}-${payload.screenshot.name || "payment-proof.jpg"}`);
      screenshotUrl = folder.createFile(blob).getUrl();
    }
    sheet.appendRow([
      new Date(), orderId, "New", payload.name || "", payload.phone || "", payload.address || "",
      payload.payment || "", payload.total || "", JSON.stringify(payload.items || []), screenshotUrl
    ]);
    return jsonResponse({ ok: true, orderId, screenshotUrl });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function getOrdersSheet() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty("SPREADSHEET_ID");
  const spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.create(SPREADSHEET_NAME);
  if (!spreadsheetId) properties.setProperty("SPREADSHEET_ID", spreadsheet.getId());
  const sheet = spreadsheet.getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(["Created", "Order ID", "Status", "Name", "Phone", "Address", "Payment", "Total", "Items", "Screenshot"]);
  return sheet;
}

function getScreenshotFolder() {
  const properties = PropertiesService.getScriptProperties();
  const folderId = properties.getProperty("SCREENSHOT_FOLDER_ID");
  if (folderId) return DriveApp.getFolderById(folderId);
  const folder = DriveApp.createFolder(SCREENSHOT_FOLDER_NAME);
  properties.setProperty("SCREENSHOT_FOLDER_ID", folder.getId());
  return folder;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
