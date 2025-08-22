# JTM Shop - Order Search System

This system provides a static HTML interface to search and view orders from your Google Sheets data.

## Files Created

1. **`order-search.html`** - Basic version with sample data
2. **`order-search-enhanced.html`** - Enhanced version that can load real data from Google Sheets

## Features

### Search Functionality
- **Batch Filter**: Filter orders by JTM batch (JTM#18, JTM#19, etc.)
- **Name Search**: Free text search by customer name
- **Real-time Search**: Results update as you type (after 2 characters)

### Order Display
- **Order Details**: Customer name, batch, phone number, timestamp
- **Order Summary**: Total amount, free stickers count
- **Item Details**: Product images, names, and quantities
- **Payment Slip Links**: Direct links to uploaded payment slips

### Statistics
- Total number of orders
- Total revenue
- Number of filtered results

## Setup Instructions

### Option 1: Use Sample Data (Immediate)
1. Open `order-search.html` in your browser
2. The page will load with sample data immediately
3. Test the search functionality

### Option 2: Connect to Real Google Sheets Data

#### Step 1: Publish Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/19RzNl-aSOvQ0DRSAo4pjm3YcF4FdEqPl37rOtmu8CIY/edit?gid=0#gid=0
2. Go to **File** > **Share** > **Publish to web**
3. Choose **Entire Document** and **CSV** format
4. Click **Publish**
5. Copy the published URL

#### Step 2: Update the Code
1. Open `order-search-enhanced.html`
2. Find this line in the JavaScript section:
   ```javascript
   const SHEETS_URL = "https://docs.google.com/spreadsheets/d/19RzNl-aSOvQ0DRSAo4pjm3YcF4FdEqPl37rOtmu8CIY/edit?gid=0#gid=0";
   ```
3. Replace it with your published CSV URL

#### Step 3: Handle CORS Issues
Due to browser security restrictions, you may need to:

**Option A: Use a CORS Proxy**
The enhanced version includes multiple CORS proxies that will be tried automatically.

**Option B: Set up a Local Server**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then access the file at `http://localhost:8000/order-search-enhanced.html`

**Option C: Use a Browser Extension**
Install a CORS browser extension to bypass CORS restrictions for development.

## Data Structure

The system expects your Google Sheet to have these columns:
- Column A: Timestamp
- Column B: Contact Name
- Column C: Batch
- Column D: Batch Other
- Column E: Phone Number
- Column F: Total Baht
- Column G: Free Stickers
- Column H: Payment Slip URL
- Columns I onwards: Product quantities (one column per product)

## Product Images

The system uses these image files for products:
- `standard.png` - Standard shirts
- `oversize.png` - Oversize shirts
- `kids.jpg` - Kids shirts
- `bags.jpg` - Bags
- `crossbody.jpg` - Cross body bags
- `hats.jpg` - Hats
- `bucket.jpg` - Bucket hats
- `sticker1.jpg` - Sticker type 1
- `sticker2.jpg` - Sticker type 2

Make sure these images are in the same directory as the HTML file.

## Usage

1. **Load Data**: Click "📊 โหลดข้อมูลจาก Google Sheets" to fetch the latest data
2. **Search by Batch**: Select a specific batch from the dropdown
3. **Search by Name**: Type a customer name to filter results
4. **Clear Search**: Click "🗑️ ล้างการค้นหา" to reset filters
5. **View Details**: Each order shows all items with quantities and images
6. **Check Payment**: Click the payment slip link to view uploaded receipts

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser console:
1. Try using a local server (see Setup Option B)
2. Check that your Google Sheet is properly published
3. Try a different CORS proxy

### No Data Loading
1. Verify the Google Sheets URL is correct
2. Check that the sheet is published as CSV
3. Open browser developer tools to see error messages
4. The system will fall back to sample data if loading fails

### Images Not Showing
1. Ensure all image files are in the same directory
2. Check file names match exactly (case-sensitive)
3. Images will fall back to `standard.png` if not found

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

- The system only reads data from your Google Sheet
- No data is sent back to any server
- Payment slip URLs are displayed as links but not embedded
- All processing happens in the browser

## Customization

You can customize:
- **Product Catalog**: Update the `PRODUCT_CATALOG` array to match your products
- **Styling**: Modify the CSS in the `<style>` section
- **Search Logic**: Adjust the filtering functions
- **Display Format**: Change how orders and items are displayed

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheet structure matches the expected format
3. Test with the sample data first to ensure the interface works
4. Try different browsers if you encounter compatibility issues
