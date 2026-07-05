import React, { useState, useEffect } from 'react';
import { Download, ShieldCheck, X, FileText, CheckCircle2, ShieldAlert, Key, HelpCircle } from 'lucide-react';
import { NutriLensLogo, StudioLogo } from './Logos';
import { APP_CONFIG } from '../config';

interface ApkVerificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApkVerification({ isOpen, onClose }: ApkVerificationProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const downloadInProgressRef = React.useRef(false);
  const intervalRef = React.useRef<any>(null);
  const fileTriggeredRef = React.useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setDownloadState('idle');
      setProgress(0);
      downloadInProgressRef.current = false;
      fileTriggeredRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen]);

  const handleDownloadTrigger = () => {
    if (downloadInProgressRef.current) return;
    downloadInProgressRef.current = true;
    fileTriggeredRef.current = false;

    setDownloadState('downloading');
    setProgress(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        clearInterval(interval);
        intervalRef.current = null;
        setProgress(100);
        setDownloadState('completed');
        downloadInProgressRef.current = false;

        // Trigger actual APK file download exactly once
        if (!fileTriggeredRef.current) {
          fileTriggeredRef.current = true;
          try {
            const a = document.createElement('a');
            a.href = APP_CONFIG.APK_DOWNLOAD_URL;
            a.download = 'nutrilens.apk';
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } catch (e) {
            console.error(e);
          }
        }
      } else {
        setProgress(Math.min(currentProgress, 99));
      }
    }, 150);

    intervalRef.current = interval;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4">
          <div className="flex items-center space-x-2.5">
            <NutriLensLogo size={32} />
            <div>
              <h3 className="font-sans text-base font-black uppercase tracking-wider text-slate-800">NutriLens APK Security Center</h3>
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold flex items-center space-x-1">
                <span>by</span>
                <StudioLogo size={12} className="inline-block" />
                <span>ZettaCreations Android Delivery Group</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all cursor-pointer"
            id="close-apk-modal-btn"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* File summary and download status card */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/30 p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Metadata details */}
              <div className="md:col-span-7 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="rounded-xs bg-emerald-100 px-2 py-0.5 font-mono text-[8px] font-bold tracking-wider text-emerald-800 uppercase border border-emerald-200/50">
                    LATEST BUILD
                  </span>
                  <span className="font-sans text-xs text-slate-500 font-semibold">v2.0.0 (Production Stable)</span>
                </div>
                
                <h4 className="font-sans text-sm font-bold text-slate-850">nutrilens-ai-prod-2.0.0-zettacreations.apk</h4>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px] text-slate-500">
                  <p>File Size: <span className="font-bold text-slate-700">24.8 MB</span></p>
                  <p>Target SDK: <span className="font-bold text-slate-700">Android 14 (API 34)</span></p>
                  <p>Signature: <span className="font-bold text-slate-700">Zetta_Prod_RSA</span></p>
                  <p>Downloads: <span className="font-bold text-slate-700">12.5k+ verified</span></p>
                </div>
              </div>

              {/* Download Action Widget */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-3 border-t md:border-t-0 md:border-l border-slate-200/60">
                {downloadState === 'idle' && (
                  <button
                    onClick={handleDownloadTrigger}
                    className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-emerald-600 px-4 py-3 font-sans text-xs font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer"
                    id="modal-download-start-btn"
                  >
                    <Download className="h-4.5 w-4.5" />
                    <span>Start Secure Download</span>
                  </button>
                )}

                {downloadState === 'downloading' && (
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider">Downloading...</span>
                      <span className="text-slate-500">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-150" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                {downloadState === 'completed' && (
                  <div className="w-full text-center space-y-2 animate-in zoom-in-95 duration-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mx-auto">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-bold text-slate-800">APK Package Delivered</p>
                      <p className="font-sans text-[10px] text-slate-400 mt-0.5">Check your browser downloads</p>
                    </div>
                    <button
                      onClick={handleDownloadTrigger}
                      className="text-emerald-600 hover:text-emerald-700 font-sans text-[11px] font-bold hover:underline cursor-pointer"
                      id="modal-download-retry-btn"
                    >
                      Download again
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>



          {/* Installation Guidelines */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-black uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <HelpCircle className="h-4 w-4 text-emerald-500" />
              <span>Surgical Installation Guidelines</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 p-3.5 bg-white space-y-1">
                <p className="font-mono text-xs font-bold text-emerald-600">01</p>
                <h5 className="font-sans text-xs font-bold text-slate-800">Deliver APK</h5>
                <p className="font-sans text-[10px] text-slate-500 leading-normal">
                  Click 'Start Secure Download' above. Save the package file to your phone's Storage folder.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3.5 bg-white space-y-1">
                <p className="font-mono text-xs font-bold text-emerald-600">02</p>
                <h5 className="font-sans text-xs font-bold text-slate-800">Enable Source</h5>
                <p className="font-sans text-[10px] text-slate-500 leading-normal">
                  Go to Settings → Apps & Settings. Toggle 'Allow Unknown Sources' for your Files or Browser App.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3.5 bg-white space-y-1">
                <p className="font-mono text-xs font-bold text-emerald-600">03</p>
                <h5 className="font-sans text-xs font-bold text-slate-800">Install & Lens</h5>
                <p className="font-sans text-[10px] text-slate-500 leading-normal">
                  Tap the downloaded APK file in your notification rail or Files app, approve installer, and launch!
                </p>
              </div>
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div className="rounded-lg bg-amber-50/20 border border-amber-100 p-3.5 flex items-start space-x-2.5 text-[10.5px] leading-relaxed text-slate-600">
            <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="font-sans">
              <span className="font-bold text-amber-800">Installation Safety Assurance:</span> NutriLens AI respects client sovereignty. Our APK bundles do not include telemetry scripts or unsolicited trackers. It is an optimized offline-capable clinical scanner.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-4">
          <p className="font-sans text-[10px] text-slate-400">© 2026 ZettaCreations. All rights reserved.</p>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 hover:bg-slate-800 px-4 py-1.5 font-sans text-xs font-semibold text-white transition-colors cursor-pointer"
            id="modal-close-bottom-btn"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
