# Docifyo — Solar Proposal Generator

A web application for generating solar proposals. Built with vanilla HTML/CSS/JS, hosted on Vercel, powered by Google Apps Script + Google Sheets backend.

## Architecture

```
User Browser  →  Vercel (yourcompany.com)  →  /api/proxy  →  Google Apps Script
                                                               ↓
                                                         Google Sheets (data)
                                                         Google Drive (PDFs)
                                                         Google Docs (templates)
```

## Project Structure

```
docifyo-app/
  api/
    proxy.js          ← Vercel serverless function (proxies to Apps Script)
  public/
    index.html        ← The entire frontend app
  vercel.json         ← Vercel routing config
  package.json        ← Node version config
```

## Deployment

1. Push this repo to GitHub
2. Connect to Vercel → Import project
3. Add custom domain in Vercel dashboard
4. Done — app is live at your domain

## Backend (Google Apps Script)

- Master Sheet ID: `10bxbcUVUN9g6XbzjhNHvKQ_qquR0JlI3TeSpVDAAMks`
- All customer data is isolated per company
- Script URL is proxied through `/api/proxy` — never exposed to users

## Adding a new customer

1. Copy customer sheet template → get Sheet ID
2. Create their Doc template → get Doc ID  
3. Create Drive folder → get Folder ID
4. Add row to MASTER Sheet → COMPANIES_CONFIG tab
5. Add users to MASTER_USERS tab
6. Give them login credentials
