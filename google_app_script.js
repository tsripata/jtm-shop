/** CONFIG */
const SPREADSHEET_ID = "19RzNl-aSOvQ0DRSAo4pjm3YcF4FdEqPl37rOtmu8CIY";
const SHEET_NAME = "Orders";
const DRIVE_FOLDER_ID = "1DZ1LhZC3IkC6UpHGKahkJ2nfZFV0uKa0";
const LOG_SHEET_NAME = "logs";

/** CORS: allow only your GitHub Pages origin (no path!) */
const ALLOWED_ORIGIN = "https://tsripata.github.io";

/**
 * แคตตาล็อกฝั่งเซิร์ฟเวอร์ ต้องเรียงตรงกับหน้าเว็บ (index-based)
 * หากเปลี่ยนฝั่ง client ต้องอัปเดตที่นี่ให้ตรงกัน
 */
const ITEM_CATALOG = [
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ Deep Navy S", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ Deep Navy M", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ Deep Navy L", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ Deep Navy XL", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ Deep Navy 2XL", price: 300 },

  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ White S", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ White M", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ White L", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ White XL", price: 300 },
  { name: "เสื้อยุงลายทรง Standard ปักโลโก้ - ผู้ใหญ่ White 2XL", price: 300 },

  { name: "เสื้อยุงลายทรง Oversize ปักโลโก้ - ผู้ใหญ่ Female 45'' Deep Navy", price: 350 },
  { name: "เสื้อยุงลายทรง Oversize ปักโลโก้ - ผู้ใหญ่ Male 50'' Deep Navy", price: 350 },
  { name: "เสื้อยุงลายทรง Oversize ปักโลโก้ - ผู้ใหญ่ Female 45'' White", price: 350 },
  { name: "เสื้อยุงลายทรง Oversize ปักโลโก้ - ผู้ใหญ่ Male 50'' White", price: 350 },

  { name: "เสื้อยุงลายปักโลโก้ สำหรับเด็ก XS", price: 200 },
  { name: "เสื้อยุงลายปักโลโก้ สำหรับเด็ก S", price: 200 },
  { name: "เสื้อยุงลายปักโลโก้ สำหรับเด็ก M", price: 200 },
  { name: "เสื้อยุงลายปักโลโก้ สำหรับเด็ก L", price: 200 },
  { name: "เสื้อยุงลายปักโลโก้ สำหรับเด็ก XL", price: 200 },

  { name: "กระเป๋าผ้าทรงเสื้อกล้าม พับเก็บได้ ลายเป็นแบบสุ่มแต่สวยทุกใบ", price: 220 },
  { name: "กระเป๋า Cross Body สีฟ้า", price: 250 },
  { name: "กระเป๋า Cross Body สีเหลือง", price: 250 },
  { name: "กระเป๋า Cross Body สีดำ", price: 250 },

  { name: "หมวกแก๊บผ้าร่ม เด็กใส่ได้ ผู้ใหญ่ใส่ดี - หมวกแก๊ป 3 สี", price: 320 },
  { name: "หมวกแก๊บผ้าร่ม เด็กใส่ได้ ผู้ใหญ่ใส่ดี - หมวกแก๊ปสีเทา - เหลือง", price: 320 },
  { name: "หมวกแก๊บผ้าร่ม เด็กใส่ได้ ผู้ใหญ่ใส่ดี - หมวกแก๊ปสีฟ้า - เขียว", price: 320 },
  { name: "หมวก Bucket ผ้าร่ม", price: 350 },

  { name: "สติกเกอร์ติดท้ายรถ แบบ 1", price: 50 },
  { name: "สติกเกอร์ติดท้ายรถ แบบ 2", price: 50 },
];

function getLogSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(LOG_SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(LOG_SHEET_NAME);
    sh.appendRow(["Timestamp", "Message"]);
  }
  return sh;
}

function sheetLog() {
  try {
    var parts = Array.prototype.slice.call(arguments).map(function(v){
      if (v === null || v === undefined) return String(v);
      if (typeof v === "string") return v;
      try { return JSON.stringify(v); } catch (e) { return String(v); }
    });
    var msg = parts.join(" ");
    var sh2 = getLogSheet_();
    sh2.appendRow([new Date(), msg]);
    Logger.log(msg)
  } catch (e) {
    // Fallback to Logger to avoid recursive issues
    Logger.log("Logging to sheet failed: " + e);
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  return sh;
}

function ensureHeaders_() {
  const sh = getSheet_();
  const headers = [
    "Timestamp",
    "ContactName",
    "Batch",
    "BatchOther",
    "TotalBaht",
    "FreeStickers",
    "PaymentSlipURL",
  ].concat(ITEM_CATALOG.map(item => item.name)); // 1 column per item
  const existing = sh.getRange(1,1,1,Math.max(headers.length, sh.getLastColumn()||1)).getValues()[0];

  let changed = false;
  for (let i = 0; i < headers.length; i++) {
    if (existing[i] !== headers[i]) { changed = true; break; }
  }
  if (changed || existing.length < headers.length) {
    sh.clear();
    sh.getRange(1,1,1,headers.length).setValues([headers]);
  }
}

/** ---- CORS helpers ---- */
function corsText_(text, status) {
  // Build a text response and attach CORS headers using the older, compatible method
  const out = ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.TEXT);

  // For older Google Apps Script versions, we need to use a different approach
  // The headers will be set by the web app deployment settings
  return out;
}

/** Handle CORS preflight if the browser sends OPTIONS */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

/** Handle GET requests (for testing) */
function doGet(e) {
  return ContentService.createTextOutput("JTM Shop API is running. Use POST to submit orders.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * DEBUG FUNCTION: Standalone function that simulates doPost behavior
 * This function can be run manually in the Apps Script editor for testing
 * It hardcodes all the parameters that would normally come from the request
 */
function debugDoPost() {
  try {
    // Simulate the request parameter object that doPost would receive
    const mockE = {
      parameter: {
        contactName: "Test User",
        batch: "JTM#25",
        batchOther: "",
        catalogLength: "30",
        clientTotal: "350",
        qty_0: "1",
        qty_1: "0",
        qty_2: "0",
        qty_3: "0",
        qty_4: "0",
        qty_5: "0",
        qty_6: "0",
        qty_7: "0",
        qty_8: "0",
        qty_9: "0",
        qty_10: "0",
        qty_11: "0",
        qty_12: "0",
        qty_13: "0",
        qty_14: "0",
        qty_15: "0",
        qty_16: "0",
        qty_17: "0",
        qty_18: "0",
        qty_19: "0",
        qty_20: "0",
        qty_21: "0",
        qty_22: "0",
        qty_23: "0",
        qty_24: "0",
        qty_25: "0",
        qty_26: "0",
        qty_27: "0",
        qty_28: "0",
        qty_29: "0"
      },
      files: {
        paymentSlip: Utilities.newBlob("Mock payment slip content", "image/jpeg", "mock_payment_slip.jpg") // Simulating a simple file for testing
      }
    };
    
    // Call doPost with our mock parameters
    const result = doPost(mockE);
    
    // Log the result for debugging
    sheetLog("Debug doPost result: " + result.getContent());
    
    return "Debug completed successfully. Check logs for details.";
    
  } catch (error) {
    sheetLog("Debug function failed: " + error.toString());
    return "Debug failed: " + error.toString();
  }
}

function doPost(e) {
  try {
    // DEBUG: Log the entire request object
    sheetLog("!! doPost DEBUG START !!");
    sheetLog("Request object e: " + JSON.stringify(e));
    sheetLog("e.parameter: " + JSON.stringify(e.parameter));
    sheetLog("e.files: " + JSON.stringify(e.files));
    sheetLog("e.postData: " + JSON.stringify(e.postData));
    
    ensureHeaders_();

    const params = e.parameter || {};
    const files  = e.files || {};

    const contactName = (params.contactName || "").trim();
    const batch       = (params.batch || "").trim();
    const batchOther  = (params.batchOther || "").trim();
    
    // DEBUG: Log parsed parameters
    sheetLog("Parsed contactName: " + contactName);
    sheetLog("Parsed batch: " + batch);
    sheetLog("Parsed batchOther: " + batchOther);

    // Parse quantities by index
    const qtys = ITEM_CATALOG.map((_, i) => Number(params[`qty_${i}`] || 0));
    sheetLog("Parsed quantities: " + JSON.stringify(qtys));
    
    // Server-side validation: 0..10
    if (qtys.some(q => isNaN(q) || q < 0 || q > 10)) {
      sheetLog("Validation failed: Invalid quantities");
      return corsText_("Invalid quantities", 400);
    }

    // Compute total and freebies
    const totalBaht = qtys.reduce((sum, q, i) => sum + q * ITEM_CATALOG[i].price, 0);
    const freebies  = Math.floor(totalBaht / 1000);
    sheetLog("Total Baht: " + totalBaht + ", Freebies: " + freebies);

    if (!contactName || !batch) {
      return corsText_("ข้อมูลไม่ครบ (ชื่อผู้ติดต่อ/รุ่น)", 400);
    }
    if (batch === "อื่นๆ" && !batchOther) {
      return corsText_("โปรดระบุรุ่น (เมื่อเลือก 'อื่นๆ')", 400);
    }

    // Handle file upload
    let slipUrl = "";
    sheetLog("Files object: " + JSON.stringify(files));
    sheetLog("paymentSlip exists: " + (files && files.paymentSlip ? "YES" : "NO"));
    
    if (files && files.paymentSlip) {
      sheetLog("Processing file upload...");
      const blob   = files.paymentSlip; // Blob
      sheetLog("Blob type: " + typeof blob);
      sheetLog("Blob content: " + blob.toString());
      
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      sheetLog("Got folder: " + folder.getName());
      
      const file   = folder.createFile(blob);
      sheetLog("File created: " + file.getName());
      
      file.setDescription(`Payment slip for ${contactName} - ${new Date().toISOString()}`);
      slipUrl = file.getUrl();
      sheetLog("File URL: " + slipUrl);
    } else {
      sheetLog("No payment slip file found");
      return corsText_("ไม่พบไฟล์สลิปโอนเงิน", 400);
    }

    // Prepare row data
    const row = [
      new Date(),
      contactName,
      batch,
      batchOther,
      totalBaht,
      freebies,
      slipUrl,
      ...qtys
    ];
    sheetLog("Prepared row data: " + JSON.stringify(row));

    const sh = getSheet_();
    sh.appendRow(row);
    sheetLog("Row appended to sheet successfully");

    // Response
    const msg = `บันทึกสำเร็จ ยอดรวม ${totalBaht} บาท ได้สติกเกอร์ฟรี ${freebies} แผ่น`;
    sheetLog("Response message: " + msg);
    sheetLog("!! doPost DEBUG END !!");
    return corsText_(msg, 200);

  } catch (err) {
    sheetLog("ERROR in doPost: " + err.toString());
    sheetLog("Error stack: " + err.stack);
    return corsText_("Server error: " + err, 500);
  }
}