# NutriLens AI - Cloudflare Pages Deployment & Troubleshooting Guide

This guide explains how to deploy your NutriLens AI React/Vite application to **Cloudflare Pages** and resolves common MIME type errors (such as `application/octet-stream` or `text/html`).

---

## 🚨 Fixing the MIME Type Error
If you see this error on your deployed site (e.g., `https://nutrilenshome.pages.dev/`):
> *“Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'application/octet-stream'”*

### Why this happens:
You have uploaded or deployed the **root folder of the repository** directly instead of building the project and deploying the compiled static build. When you do this, Cloudflare serves the unbuilt `index.html` file which attempts to load `src/main.tsx` directly in the browser. Since `.tsx` is not standard JavaScript, Cloudflare Pages serves it as `application/octet-stream`, which modern browsers block for security.

### How to fix it:
Follow either the **Git Integration (Recommended)** or **Direct Upload** method below to deploy the compiled static files correctly.

---

## 🛠️ Method 1: Git Integration (Recommended)
This is the easiest way to deploy. Connect your GitHub repository to Cloudflare Pages, and Cloudflare will automatically build and deploy your app every time you push code.

1. Log in to the **Cloudflare Dashboard** and navigate to **Workers & Pages**.
2. Click **Create** -> **Pages** -> **Connect to Git**.
3. Select your repository and click **Begin setup**.
4. In the **Build settings** section, configure the following fields exactly:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and deploy**.

Cloudflare will run the Vite bundler, compile everything to production-ready Javascript, and host the contents of the `dist` folder. This resolves the MIME type issue entirely!

---

## 📁 Method 2: Direct Upload (Manual)
If you prefer to build the project locally and upload files manually:

1. Run the build command in your terminal:
   ```bash
   npm run build
   ```
2. This creates a directory named `dist` containing all compiled static files (`index.html`, assets, JS, CSS).
3. In the Cloudflare Pages dashboard, select **Upload assets** under the **Direct Upload** tab.
4. **CRITICAL:** Upload ONLY the contents of the `dist` folder. **Do not** upload the root project folder, `src`, or `node_modules`.

---

## 🌐 Customizing Web & APK Download URLs in Cloudflare Pages
You can change the web and APK links easily without modifying the source code by utilizing **Environment Variables** in Cloudflare.

### 1. Add Environment Variables in Cloudflare Pages
1. Go to your **Pages project** in the Cloudflare Dashboard.
2. Navigate to **Settings** -> **Environment variables**.
3. Under **Production** (and optionally **Preview**), add the following variables:
   - `VITE_WEB_URL` : `https://your-custom-web-url.com`
   - `VITE_APK_DOWNLOAD_URL` : `https://your-direct-apk-download-link.com`
4. Click **Save**.
5. **Redeploy** your project for these environment variables to take effect during the build.

### 2. Changing the Fallbacks in Code
If you prefer not to use Cloudflare environment variables, you can modify the default fallback URLs directly in `/src/config.ts`:

```typescript
// /src/config.ts
export const APP_CONFIG = {
  // Web application live mirror URL
  WEB_URL: env.VITE_WEB_URL || 'YOUR_WEB_URL_HERE',

  // Android APK direct download link
  APK_DOWNLOAD_URL: env.VITE_APK_DOWNLOAD_URL || 'YOUR_APK_DOWNLOAD_URL_HERE'
};
```
