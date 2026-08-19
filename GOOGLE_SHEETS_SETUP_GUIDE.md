# 📊 Google Sheets Patient Form Integration Guide

Follow these **3 quick steps** to automatically save all patient appointment & contact form submissions directly into a Google Sheet for the clinic staff.

---

## 🚀 Step 1: Create Google Sheet & Add Headers

1. Open [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name the spreadsheet: **Dr. Sai Sekhar Clinic Inquiries**.
3. In **Row 1**, add the following column headers:

| A (Col 1) | B (Col 2) | C (Col 3) | D (Col 4) | E (Col 5) | F (Col 6) |
|---|---|---|---|---|---|
| **Timestamp** | **Patient Full Name** | **Mobile Number** | **Email** | **Message / Symptoms** | **Rating** |

---

## ⚡ Step 2: Add Google Apps Script Code

1. In your Google Sheet, click **Extensions** → **Apps Script** (top menu).
2. Delete any existing code in `Code.gs` and paste the following snippet:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.fullname || '',
      data.mobile || '',
      data.email || '',
      data.message || '',
      data.rating || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": true, "message": "Saved successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon) at the top.

---

## 🌐 Step 3: Deploy as Web App & Get Webhook URL

1. In Apps Script, click **Deploy** → **New deployment** (top right blue button).
2. Click the ⚙️ gear icon next to **Select type** and choose **Web app**.
3. Set the deployment fields:
   - **Description**: `Clinic Form Webhook`
   - **Execute as**: `Me (your google account)`
   - **Who has access**: `Anyone` *(Crucial: set to "Anyone" so Next.js can send submissions)*
4. Click **Deploy**.
5. Copy the **Web App URL** generated (starts with `https://script.google.com/macros/s/.../exec`).

---

## ⚙️ Step 4: Add URL to Vercel / Environment Variables

Add your Web App URL to your deployment environment (or `.env.local` locally):

```env
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec"
```

In **Vercel Dashboard**:
1. Go to your project settings → **Environment Variables**.
2. Key: `GOOGLE_SHEETS_WEBHOOK_URL`
3. Value: `https://script.google.com/macros/s/.../exec`
4. Save and redeploy!

---

🎉 **All done!** Now whenever a patient submits the form on the website, a new row will instantly appear in your Google Sheet!
