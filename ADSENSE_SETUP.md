# AdSense Setup Instructions

To enable ads in your application, follow these steps:

1. **Get your AdSense Client ID**:
   - Go to your Google AdSense account.
   - Copy your Publisher ID (e.g., `ca-pub-1234567890123456`).

2. **Update `index.html`**:
   - Open `index.html` in the root directory.
   - Find the script tag for AdSense (lines 10-12).
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual Client ID.

3. **Update `src/components/AdSense.jsx`** (Optional but recommended):
   - You can set a default `client` prop in this file if you want to reuse it without passing the ID every time.
   - You can also customize the `slot` ID for different ad units.

4. **Verify**:
   - Run the app locally.
   - Note that ads might not show up immediately on localhost or until your domain is approved by AdSense.
 