# Rosita's Google Business Profile Dashboard

A React dashboard to view and manage your Google Business Profile information.

## Setup

### 1. Google Cloud Console Configuration

Before running the app, you need to configure your Google Cloud project:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Enable the following APIs:
   - **Google Business Profile API** (formerly Google My Business API)
   - **Business Profile Performance API** (optional, for analytics)

4. Go to **APIs & Services → Credentials**
5. Edit your OAuth 2.0 Client ID
6. Add `http://localhost:5173/callback` to **Authorized redirect URIs**
7. Add `http://localhost:5173` to **Authorized JavaScript origins**

### 2. Configure Client Secret

Open `src/config.js` and add your Client Secret:

```javascript
clientSecret: 'YOUR_CLIENT_SECRET_HERE',
```

**Important:** Keep your client secret secure and never commit it to public repositories.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

- **OAuth Authentication** - Secure sign-in with Google
- **Business Information** - View name, address, phone, website, hours
- **Customer Reviews** - See all reviews with ratings and responses
- **Statistics Dashboard** - Overview of ratings and review counts
- **Multiple Locations** - Support for businesses with multiple locations

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- Google Business Profile API

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
Make sure `http://localhost:5173/callback` is added to your OAuth redirect URIs in Google Cloud Console.

### "Error 403: Access denied"
- Ensure the Google Business Profile API is enabled
- Verify your Google account has access to a business profile
- Check that you've granted all requested permissions during sign-in

### "No Business Profile Found"
- Your Google account must be an owner or manager of a Google Business Profile
- The business profile must be verified with Google
# rositas_dashboard
