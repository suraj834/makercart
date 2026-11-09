# Google Drive order setup

This lets the GitHub Pages website save orders in Google Sheets and payment screenshots in Google Drive without Node.js hosting.

## One-time setup

1. Open [script.google.com](https://script.google.com) while signed in to the store Google account.
2. Create a new project named `Maker Cart Orders`.
3. Copy all of `google-apps-script/Code.gs` into the Apps Script editor and save it.
4. Click **Deploy → New deployment**.
5. Select **Web app** as the deployment type.
6. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
7. Click **Deploy**, approve the Google permissions, and copy the **Web app URL**.
8. Open `js/main.js` and set `GOOGLE_ORDER_ENDPOINT` to that URL.
9. Commit and push the change to GitHub. The first submitted order automatically creates the `Maker Cart Orders` spreadsheet and `Maker Cart Payment Screenshots` Drive folder.

Keep the spreadsheet and Drive folder private. Use the spreadsheet Status column to manage orders.
