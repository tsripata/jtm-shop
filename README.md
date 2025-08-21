# JTM Shop - E-commerce Order Management System

A web-based e-commerce order management system that integrates with Google Apps Script to handle orders, process payments, and manage inventory through Google Sheets and Google Drive.

## 🎯 Project Overview

This project consists of two main components:
1. **Frontend**: An HTML-based web interface for customers to browse products and place orders
2. **Backend**: A Google Apps Script that processes orders, stores data in Google Sheets, and manages payment slip uploads in Google Drive

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   HTML Frontend │───▶│  Google Apps     │───▶│  Google Sheets  │
│   (index.html)  │    │  Script Backend  │    │  (Orders Data)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Google Drive   │
                       │ (Payment Slips) │
                       └──────────────────┘
```

## 📁 Project Structure

```
jtm-shop/
├── index.html              # Main web interface
├── google_app_script.js    # Google Apps Script backend
└── README.md               # This file
```

## 🛍️ Features

- **Product Catalog**: JSON-based product management with names and prices
- **Order Form**: Customer information collection and product selection
- **Quantity Validation**: Limits product quantities to 0-10 per item
- **Automatic Calculations**: Total price calculation and free item bonuses
- **File Upload**: Payment slip image upload and storage
- **Data Storage**: Order data automatically saved to Google Sheets
- **CORS Support**: Secure cross-origin requests for web deployment

## 🚀 Setup Instructions

### 1. Frontend Setup

1. **Deploy the HTML file** to any web hosting service (GitHub Pages, Netlify, etc.)
2. **Update the catalog** in `index.html` by modifying the `CATALOG` array
3. **Update the web app URL** in the `WEB_APP_URL` constant

### 2. Google Apps Script Setup

1. **Go to [Google Apps Script](https://script.google.com/)**
2. **Create a new project**
3. **Copy the contents** of `google_app_script.js` into the script editor
4. **Configure the following constants**:
   - `SPREADSHEET_ID`: Your Google Sheets ID for storing orders
   - `DRIVE_FOLDER_ID`: Your Google Drive folder ID for storing payment slips
   - `ALLOWED_ORIGIN`: Your website's domain (for CORS security)

### 3. Google Sheets Setup

1. **Create a new Google Sheet**
2. **Copy the Sheet ID** from the URL
3. **Update the `SPREADSHEET_ID`** in the Apps Script
4. **The script will automatically create** the required columns:
   - Timestamp
   - ContactName
   - Batch
   - BatchOther
   - TotalBaht
   - FreeStickers
   - PaymentSlipURL
   - One column per product item

### 4. Google Drive Setup

1. **Create a folder** in Google Drive for payment slips
2. **Copy the folder ID** from the URL
3. **Update the `DRIVE_FOLDER_ID`** in the Apps Script

### 5. Deploy the Web App

1. **Click "Deploy" → "New deployment"**
2. **Choose "Web app"** as the type
3. **Set access to "Anyone"** (or restrict as needed)
4. **Copy the deployment URL** and update `WEB_APP_URL` in your HTML

## 📊 Catalog Management

### Adding/Modifying Products

The product catalog is defined in two places that must be kept in sync:

1. **Frontend** (`index.html`): Lines 108-140
2. **Backend** (`google_app_script.js`): Lines 18-50

**Important**: Both catalogs must have the same items in the same order for the system to work correctly.

### Catalog Structure

```javascript
const CATALOG = [
  { 
    name: "Product Name", 
    price: 350 
  },
  // ... more products
];
```

## 🔧 Configuration

### Frontend Configuration

- **`WEB_APP_URL`**: Your deployed Google Apps Script web app URL
- **`CATALOG`**: Product catalog array with names and prices

### Backend Configuration

- **`SPREADSHEET_ID`**: Google Sheets ID for order storage
- **`SHEET_NAME`**: Sheet name (default: "Orders")
- **`DRIVE_FOLDER_ID`**: Google Drive folder ID for payment slips
- **`ALLOWED_ORIGIN`**: Allowed CORS origin for security

## 📱 Usage

### For Customers

1. **Visit the website** and browse the product catalog
2. **Fill in contact information** (name and batch)
3. **Select quantities** for desired products (0-10 per item)
4. **Upload payment slip** image
5. **Submit order** - data is automatically processed and stored

### For Administrators

1. **Monitor orders** in the Google Sheet
2. **Access payment slips** in the configured Google Drive folder
3. **Update catalog** by modifying both frontend and backend files

## 🔒 Security Features

- **CORS Protection**: Only allows requests from specified origins
- **Input Validation**: Server-side validation of all inputs
- **File Type Restrictions**: Only accepts image files for payment slips
- **Quantity Limits**: Prevents excessive order quantities

## 🚨 Important Notes

1. **Catalog Synchronization**: Frontend and backend catalogs must match exactly
2. **CORS Configuration**: Update `ALLOWED_ORIGIN` when deploying to different domains
3. **Google Quotas**: Be aware of Google Apps Script execution time and storage limits
4. **File Storage**: Payment slip images are stored in Google Drive with descriptive names

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Check that `ALLOWED_ORIGIN` matches your website's domain
2. **Catalog Mismatch**: Ensure frontend and backend catalogs are identical
3. **Permission Errors**: Verify Google Sheets and Drive permissions
4. **Deployment Issues**: Check that the web app is deployed and accessible

### Debug Mode

The system includes error handling and validation messages to help identify issues during development and testing.

## 📈 Future Enhancements

- **Admin Dashboard**: Web interface for order management
- **Email Notifications**: Automatic order confirmations
- **Inventory Tracking**: Real-time stock management
- **Payment Integration**: Direct payment processing
- **Multi-language Support**: Internationalization features

## 🤝 Contributing

This project is designed to be easily customizable for different e-commerce needs. When modifying:

1. **Keep catalogs synchronized** between frontend and backend
2. **Test thoroughly** before deploying to production
3. **Update documentation** for any configuration changes
4. **Follow security best practices** for web applications

## 📄 License

This project is provided as-is for educational and commercial use. Please ensure compliance with Google's terms of service when using Google Apps Script, Sheets, and Drive.
