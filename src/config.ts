/**
 * NutriLens AI Configuration
 * 
 * You can configure these URLs in two ways:
 * 1. Directly modify the hardcoded fallback values in this file.
 * 2. Set environment variables on your hosting provider (e.g., Cloudflare Pages Dashboard):
 *    - VITE_WEB_URL: The URL to the live web application (e.g., https://nutrilens.pages.dev)
 *    - VITE_APK_DOWNLOAD_URL: The URL to download the Android APK file (e.g., https://your-domain.com/app.apk)
 */

const env = (import.meta as any).env || {};

export const APP_CONFIG = {
  // Web application live mirror URL
  WEB_URL: env.VITE_WEB_URL || 'nutrilenshome.page.dev',

  // Android APK direct download link
  APK_DOWNLOAD_URL: env.VITE_APK_DOWNLOAD_URL || 'https://drive.usercontent.google.com/u/0/uc?id=1iOdYYVPv4G5i-Y17P7HHnemKj-zyidTZ&export=download'
};
