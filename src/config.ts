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

function formatUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const APP_CONFIG = {
  // Web application live mirror URL
  WEB_URL: formatUrl(env.VITE_WEB_URL || 'nutrilensapp.pages.dev'),

  // Android APK direct download link
  APK_DOWNLOAD_URL: formatUrl(env.VITE_APK_DOWNLOAD_URL || 'https://drive.usercontent.google.com/download?id=1b2Jl5OVHDvZ2ZjRqD952TTYr_061AI8X&export=download')
};
