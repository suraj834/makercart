# MakerCart

MakerCart is a simple, static ecommerce starter site for development boards, sensors and electronics project supplies. It uses plain HTML, CSS and JavaScript, so there are no packages to install and no build step.

## Preview on your computer

Open `index.html` in a web browser. You can also open `shop.html`, `about.html`, `contact.html` and `cart.html` directly. Open a product from the shop to see its details.

## Edit the catalogue

Product names, descriptions, prices, categories, specifications and image paths are kept together in `js/products.js`. The current products and prices are examples; replace them with your actual catalogue before taking orders. Put replacement product images in the `images/` folder and update each product's `image` and `imageAlt` values.

## Set up ordering and UPI

Open `js/main.js` and update the `WHATSAPP_NUMBER` setting with your business number, including the country code and digits only. Replace `UPI_ID` with your real UPI ID. In `cart.html`, replace `images/upi-qr-placeholder.svg` with a scannable QR image for that same account.

Checkout prepares an order message and opens WhatsApp. The customer still needs to press **Send** in WhatsApp. Payment is arranged directly with the store; the sample UPI ID and QR image are not real payment details.

## Pages

- `index.html` — home page and featured products
- `shop.html` — product catalogue with search and category filters
- `product.html?id=1` — product details selected by URL ID
- `cart.html` — saved cart, quantity controls, order form and UPI section
- `about.html` — store story
- `contact.html` — WhatsApp contact and FAQs

Shared styles are in `css/style.css`, and local placeholder illustrations are in `images/`.

## Publish as a static site

This folder can be uploaded to a GitHub repository and published with GitHub Pages or another static-site host. Keep `index.html` at the top level so the host can use it as the home page.
