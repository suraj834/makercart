/*
 * MakerCart site behaviour.
 * Beginner tip: update the two settings below with your business details before launch.
 */
(() => {
  "use strict";

  // Use digits only, including country code (for example, 91 followed by the mobile number).
  const WHATSAPP_NUMBER = "919140766574";
  // Replace with your real UPI ID. The QR image in cart.html must also be replaced.
  const UPI_ID = "surajpandey67@icici";
  const GOOGLE_ORDER_ENDPOINT = "https://script.google.com/macros/s/AKfycbymVYDKdLHZrqzjmdQBu7_zVFCF6QuYMSvft0SYJE0d0Ve6vVPFLE3LEsk3T4AgPQaT/exec";
  const CART_KEY = "makercart-cart-v1";
  const products = Array.isArray(window.MAKER_CART_PRODUCTS) ? window.MAKER_CART_PRODUCTS : [];
  let toastTimer;

  const money = (amount) => new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(amount);

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[character]));
  }

  function readCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
      return Object.fromEntries(Object.entries(saved).filter(([id, quantity]) =>
        products.some((product) => product.id === id) && Number.isInteger(quantity) && quantity > 0
      ));
    } catch (error) {
      return {};
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      showToast("Your browser could not save the cart. Keep this tab open while ordering.");
    }
    updateCartBadge();
  }

  function cartEntries() {
    const cart = readCart();
    return Object.entries(cart).map(([id, quantity]) => ({
      product: products.find((product) => product.id === id), quantity
    })).filter((entry) => entry.product);
  }

  function cartQuantity() {
    return cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);
  }

  function updateCartBadge() {
    const badge = document.querySelector("[data-cart-count]");
    if (badge) {
      const count = cartQuantity();
      badge.textContent = String(count);
      const link = badge.closest(".header-cart");
      if (link) link.setAttribute("aria-label", `Shopping cart, ${count} ${count === 1 ? "item" : "items"}`);
    }
  }

  function renderHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    const page = document.body.dataset.page;
    const navItems = [
      ["home", "index.html", "Home"],
      ["shop", "shop.html", "Shop"],
      ["about", "about.html", "Our story"],
      ["contact", "contact.html", "Contact"]
    ];
    const nav = navItems.map(([key, href, label]) =>
      `<a href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`
    ).join("");

    mount.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="MakerCart home"><span class="brand-mark" aria-hidden="true">✳</span><span class="brand-word">Maker<span>Cart</span></span></a>
          <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">${nav}</nav>
          <div class="header-actions">
            <a class="header-cart" href="cart.html" aria-label="Shopping cart, 0 items"><span aria-hidden="true">Bag</span><span class="cart-count" data-cart-count>0</span></a>
            <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation"><span></span><span></span><span></span></button>
          </div>
        </div>
      </header>`;
    updateCartBadge();
  }

  function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="wrap">
          <div class="footer-main">
            <div class="footer-brand">
              <a class="brand" href="index.html" aria-label="MakerCart home"><span class="brand-mark" aria-hidden="true">✳</span><span class="brand-word">Maker<span>Cart</span></span></a>
              <p>Good parts for curious minds. Find a starting point, ask a question and keep your next idea moving.</p>
            </div>
            <div><p class="footer-heading">Explore</p><nav class="footer-links" aria-label="Footer shop links"><a href="shop.html">Shop all parts</a><a href="about.html">Our story</a><a href="contact.html">Get in touch</a></nav></div>
          <div><p class="footer-heading">Need a hand?</p><nav class="footer-links" aria-label="Footer help links"><a href="contact.html">Product questions</a><a href="shipping.html">Shipping & returns</a><a href="cart.html">Your cart</a></nav></div>
          </div>
          <div class="footer-bottom"><p>© ${new Date().getFullYear()} MakerCart. Keep making.</p><p>Delivery and payment details are confirmed directly before an order is accepted.</p></div>
        </div>
      </footer>
      <a class="whatsapp-float" href="#" data-wa-link data-wa-message="Hi MakerCart! I have a question about your products." aria-label="Chat with MakerCart on WhatsApp" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3.2A12.4 12.4 0 0 0 5.4 22l-1.6 5.8 6-1.6A12.4 12.4 0 1 0 16 3.2Zm0 22.6c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.5.9.9-3.4-.2-.4A10.2 10.2 0 1 1 16 25.8Zm5.6-7.6c-.3-.2-1.8-.9-2-.9s-.5-.2-.7.2c-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>
        <span>Chat to order</span>
      </a>
      <div class="toast" id="site-toast" role="status" aria-live="polite"></div>`;
  }

  function showToast(message) {
    const toast = document.getElementById("site-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function createProductCard(product) {
    return `
      <article class="product-card">
        <a class="product-card-media" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)}">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt)}" loading="lazy">
          <span class="product-tag">${escapeHTML(product.tag)}</span>
        </a>
        <div class="product-card-body">
          <p class="product-category">${escapeHTML(product.categoryLabel)}</p>
          <h3 class="product-card-title"><a href="product.html?id=${encodeURIComponent(product.id)}">${escapeHTML(product.shortName || product.name)}</a></h3>
          <p class="product-card-desc">${escapeHTML(product.summary)}</p>
          <div class="product-card-bottom"><strong class="product-price">${money(product.price)}</strong><button class="quick-add" type="button" data-add-to-cart="${escapeHTML(product.id)}" aria-label="Add ${escapeHTML(product.name)} to cart"><span aria-hidden="true">＋</span> Add to cart</button></div>
        </div>
      </article>`;
  }

  function renderHome() {
    const target = document.getElementById("featured-products");
    if (target) target.innerHTML = products.slice(0, 3).map(createProductCard).join("");
  }

  function renderShop() {
    const grid = document.getElementById("shop-products");
    if (!grid) return;
    const search = document.getElementById("product-search");
    const filter = document.getElementById("category-filter");
    const count = document.getElementById("product-count");
    const noProducts = document.getElementById("no-products");
    const update = () => {
      const phrase = search.value.trim().toLocaleLowerCase();
      const category = filter.value;
      const filtered = products.filter((product) => {
        const matchesCategory = category === "all" || product.category === category;
        const haystack = `${product.name} ${product.categoryLabel} ${product.summary} ${product.description}`.toLocaleLowerCase();
        return matchesCategory && (!phrase || haystack.includes(phrase));
      });
      grid.innerHTML = filtered.map(createProductCard).join("");
      count.textContent = `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`;
      noProducts.classList.toggle("hidden", filtered.length !== 0);
      grid.classList.toggle("hidden", filtered.length === 0);
    };
    search.addEventListener("input", update);
    filter.addEventListener("change", update);
    document.getElementById("clear-filters").addEventListener("click", () => {
      search.value = "";
      filter.value = "all";
      search.focus();
      update();
    });
    update();
  }

  function setMeta(selector, value) {
    const meta = document.querySelector(selector);
    if (meta) meta.setAttribute("content", value);
  }

  function renderProduct() {
    const mount = document.getElementById("product-detail");
    if (!mount) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const product = products.find((item) => item.id === id);
    const related = document.getElementById("related-products");
    const crumb = document.getElementById("product-breadcrumb-name");
    if (!product) {
      document.title = "Product not found | MakerCart";
      setMeta('meta[name="description"]', "This MakerCart item could not be found. Browse our shop for development boards, sensors and electronics kits.");
      setMeta('meta[property="og:title"]', "Product not found | MakerCart");
      mount.innerHTML = `<div class="not-found"><p class="eyebrow">THAT PART ISN'T HERE</p><h1>We couldn't find that product.</h1><p class="section-intro">It may have moved. Browse the shop to find another building block.</p><a class="button button-primary" href="shop.html">Visit the shop <span aria-hidden="true">→</span></a></div>`;
      if (related) related.innerHTML = products.slice(0, 3).map(createProductCard).join("");
      return;
    }

    if (crumb) crumb.textContent = product.shortName || product.name;
    document.title = `${product.name} | MakerCart`;
    const description = `${product.summary} See specifications and compatibility notes from MakerCart.`;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', `${product.name} | MakerCart`);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', product.image);
    setMeta('meta[property="og:url"]', window.location.href);
    mount.innerHTML = `
      <div class="product-detail-layout">
        <div class="product-detail-gallery"><div class="product-detail-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt)}"></div>${product.gallery && product.gallery.length > 1 ? `<div class="product-gallery-thumbs">${product.gallery.map((image, index) => `<button type="button" class="product-gallery-thumb${index === 0 ? ' is-active' : ''}" data-gallery-image="${escapeHTML(image)}" aria-label="View product image ${index + 1}"><img src="${escapeHTML(image)}" alt=""></button>`).join('')}</div>` : ''}</div>
        <div class="product-detail-info">
          <p class="product-category">${escapeHTML(product.categoryLabel)}</p>
          <h1>${escapeHTML(product.name)}</h1>
          <p class="product-detail-price">${money(product.price)}</p>
          <p class="product-detail-description">${escapeHTML(product.description)}</p>
          <p class="detail-tag">${escapeHTML(product.tag)}</p>
          <div class="detail-specs"><h2>What to know</h2><ul class="check-list">${product.specs.map((spec) => `<li>${escapeHTML(spec)}</li>`).join("")}</ul></div>
          <div class="detail-actions"><label class="sr-only" for="product-quantity">Quantity</label><input class="detail-quantity" id="product-quantity" type="number" value="1" min="1" max="99" inputmode="numeric"><button class="button button-primary" type="button" data-add-to-cart="${escapeHTML(product.id)}">Add to cart <span aria-hidden="true">＋</span></button></div>
          <p class="detail-note">Need a compatibility check? <a class="text-link" href="contact.html">Ask us before ordering <span aria-hidden="true">→</span></a></p>
        </div>
      </div>`;
    if (related) {
      const suggestions = products.filter((item) => item.id !== product.id).slice(0, 3);
      related.innerHTML = suggestions.map(createProductCard).join("");
    }
    mount.querySelectorAll('[data-gallery-image]').forEach((button) => button.addEventListener('click', () => {
      const image = mount.querySelector('.product-detail-image img');
      if (image) image.src = button.dataset.galleryImage;
      mount.querySelectorAll('.product-gallery-thumb').forEach((thumb) => thumb.classList.remove('is-active'));
      button.classList.add('is-active');
    }));
  }

  function cartItemMarkup(product, quantity) {
    return `
      <article class="cart-item">
        <a class="cart-item-image" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${escapeHTML(product.name)}"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt)}"></a>
        <div class="cart-item-info"><h3><a href="product.html?id=${encodeURIComponent(product.id)}">${escapeHTML(product.shortName || product.name)}</a></h3><p>${escapeHTML(product.categoryLabel)}</p><p class="cart-item-price">${money(product.price)} each</p></div>
        <div class="cart-item-controls"><label class="sr-only" for="quantity-${escapeHTML(product.id)}">Quantity of ${escapeHTML(product.name)}</label><input class="cart-quantity" id="quantity-${escapeHTML(product.id)}" type="number" min="1" max="99" value="${quantity}" inputmode="numeric" data-cart-quantity="${escapeHTML(product.id)}"><button class="remove-item" type="button" data-remove-from-cart="${escapeHTML(product.id)}">Remove</button></div>
      </article>`;
  }

  function renderCart() {
    const list = document.getElementById("cart-items");
    if (!list) return;
    const entries = cartEntries();
    const empty = document.getElementById("cart-empty");
    const panel = document.getElementById("order-panel");
    const subtotal = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
    const quantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    list.innerHTML = entries.map(({ product, quantity: amount }) => cartItemMarkup(product, amount)).join("");
    empty.classList.toggle("hidden", entries.length !== 0);
    panel.classList.toggle("hidden", entries.length === 0);
    document.getElementById("cart-item-count").textContent = String(quantity);
    document.getElementById("cart-subtotal").textContent = money(subtotal);
    document.getElementById("cart-total").textContent = money(subtotal);
    const upiText = document.getElementById("upi-id-text");
    if (upiText) upiText.textContent = UPI_ID;
    const largeUpi = document.getElementById("upi-id-large-text");
    if (largeUpi) largeUpi.textContent = UPI_ID;
  }

  function addToCart(id, amount = 1) {
    if (!products.some((product) => product.id === id)) return;
    const cart = readCart();
    cart[id] = Math.min(99, (cart[id] || 0) + amount);
    saveCart(cart);
    if (document.body.dataset.page === "cart") renderCart();
    const product = products.find((item) => item.id === id);
    showToast(`${product.shortName || product.name} added to your cart.`);
  }

  function openWhatsApp(message) {
    const number = WHATSAPP_NUMBER.replace(/\D/g, "");
    if (!/^\d{8,15}$/.test(number)) {
      showToast("Add your WhatsApp number in js/main.js to activate this button.");
      return false;
    }
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    return true;
  }

  async function submitOrderToGoogle(payload) {
    if (!GOOGLE_ORDER_ENDPOINT) return { ok: false, missingEndpoint: true };
    try {
      await fetch(GOOGLE_ORDER_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  function handleCheckout(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const entries = cartEntries();
    if (!entries.length) {
      showToast("Your cart is empty. Add a product before checkout.");
      return;
    }
    const paymentStep = document.getElementById("payment-step");
    if (!form.dataset.paymentReady) {
      form.dataset.paymentReady = "true";
      paymentStep.classList.remove("hidden");
      document.getElementById("checkout-submit").classList.add("hidden");
      document.getElementById("checkout-note").textContent = "Choose a payment option below. You can send the order on WhatsApp after payment or choose cash on delivery.";
      paymentStep.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const address = form.elements.address.value.trim();
    const payment = form.elements.payment.value;
    const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
    const itemLines = entries.map(({ product, quantity }) => `• ${product.name} × ${quantity} — ${money(product.price * quantity)}`);
    const message = [
      "Hello MakerCart! I'd like to place an order:",
      "",
      ...itemLines,
      "",
      `Total (delivery to be confirmed): ${money(total)}`,
      `Preferred payment: ${payment}`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Delivery address: ${address}`
    ].join("\n");
    if (openWhatsApp(message)) {
      document.getElementById("checkout-note").textContent = "WhatsApp opened with your order. Press Send there to place it; the cart stays saved until you clear it.";
    } else {
      document.getElementById("checkout-note").textContent = "Add the store's WhatsApp number in js/main.js, then reload this page to send your order.";
    }
  }

  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("primary-navigation");
    if (!toggle || !nav) return;
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      nav.classList.remove("is-open");
    };
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }

  function setupWhatsApp() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("[data-wa-link]");
      if (!link) return;
      event.preventDefault();
      openWhatsApp(link.dataset.waMessage || "Hi MakerCart!");
    });
  }

  function setupCartActions() {
    document.addEventListener("click", (event) => {
      const addButton = event.target.closest("[data-add-to-cart]");
      if (addButton) {
        const quantityInput = document.getElementById("product-quantity");
        const requested = quantityInput ? Number.parseInt(quantityInput.value, 10) : 1;
        addToCart(addButton.dataset.addToCart, Number.isInteger(requested) ? Math.max(1, Math.min(requested, 99)) : 1);
        return;
      }
      const removeButton = event.target.closest("[data-remove-from-cart]");
      if (removeButton) {
        const cart = readCart();
        delete cart[removeButton.dataset.removeFromCart];
        saveCart(cart);
        renderCart();
        showToast("Item removed from your cart.");
      }
    });

    document.addEventListener("change", (event) => {
      const input = event.target.closest("[data-cart-quantity]");
      if (!input) return;
      const quantity = Number.parseInt(input.value, 10);
      const cart = readCart();
      if (!Number.isInteger(quantity) || quantity < 1) {
        input.value = String(cart[input.dataset.cartQuantity] || 1);
        return;
      }
      cart[input.dataset.cartQuantity] = Math.min(99, quantity);
      saveCart(cart);
      renderCart();
    });

    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) checkoutForm.addEventListener("submit", handleCheckout);
    const paymentComplete = document.getElementById("payment-complete");
    const paymentProof = document.getElementById("payment-proof");
    const paymentClose = document.getElementById("payment-close");
    const proofPreview = document.getElementById("proof-preview");
    const uploadName = document.getElementById("upload-name");
    if (paymentProof) paymentProof.addEventListener("change", () => {
      const file = paymentProof.files[0];
      if (!file) return;
      uploadName.textContent = file.name;
      proofPreview.src = URL.createObjectURL(file);
      proofPreview.classList.remove("hidden");
    });
    if (paymentClose) paymentClose.addEventListener("click", () => document.getElementById("payment-step").classList.add("hidden"));
    if (paymentComplete) paymentComplete.addEventListener("click", async () => {
      const file = paymentProof && paymentProof.files[0];
      if (!file) { uploadName.textContent = "Please upload your payment screenshot first."; return; }
      const form = document.getElementById("checkout-form");
      const entries = cartEntries();
      const screenshot = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
      const result = await submitOrderToGoogle({
        name: form.elements.name.value.trim(), phone: form.elements.phone.value.trim(),
        address: form.elements.address.value.trim(), payment: form.elements.payment.value,
        total: money(total), items: entries.map(({ product, quantity }) => ({ name: product.name, quantity, price: product.price })),
        screenshot: { name: file.name, type: file.type, data: screenshot }
      });
      if (result.missingEndpoint) {
        uploadName.textContent = "Google Drive is not connected yet. Add the Apps Script URL in js/main.js.";
        return;
      }
      if (!result.ok) { uploadName.textContent = "The order could not be saved. Please try again."; return; }
      document.getElementById("payment-step").classList.add("hidden");
      document.getElementById("payment-success").classList.remove("hidden");
    });
    const copyButton = document.getElementById("copy-upi");
    if (copyButton) copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(UPI_ID);
        showToast("UPI ID copied.");
      } catch (error) {
        const temporary = document.createElement("textarea");
        temporary.value = UPI_ID;
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        try { document.execCommand("copy"); showToast("UPI ID copied."); }
        catch (copyError) { showToast(`UPI ID: ${UPI_ID}`); }
        temporary.remove();
      }
    });
  }

  renderHeader();
  renderFooter();
  setupMenu();
  setupWhatsApp();
  setupCartActions();
  renderHome();
  renderShop();
  renderProduct();
  renderCart();
})();
