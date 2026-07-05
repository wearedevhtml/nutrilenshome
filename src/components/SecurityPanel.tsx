import React from 'react';
import { ShieldCheck, Smartphone, Lock, EyeOff, CheckCircle2, Download } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface SecurityPanelProps {
  onOpenApkModal: () => void;
}

export default function SecurityPanel({ onOpenApkModal }: SecurityPanelProps) {
  const securityFeatures = [
    {
      icon: <Lock className="h-5 w-5 text-emerald-600" />,
      title: "Full Sandboxed Execution",
      description: "NutriLens AI runs in a localized android container. It only requests camera permissions for physical scanner OCR, with zero background processes."
    },
    {
      icon: <EyeOff className="h-5 w-5 text-emerald-600" />,
      title: "Strict Zero-Telemetry Policy",
      description: "We collect absolutely no personal data, search queries, geolocation metrics, or barcode/ingredient scan telemetry. Your physical scanning is private to you."
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
      title: "Verified Play Protect Signature",
      description: "Built using ZettaCreations certified keystores. Our APK complies fully with Google security standards and is verified safe from spyware."
    }
  ];

  return (
    <section id="security" className="py-20 md:py-28 bg-slate-50/50 border-t border-emerald-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Features list */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
                Sovereignty & Security
              </span>
              <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Certified Android Packaging Standards
              </h2>
              <p className="mt-4 font-sans text-base text-slate-500 leading-relaxed max-w-2xl">
                At ZettaCreations, we believe health transparency should not compromise digital privacy. NutriLens AI is built with fully independent offline parsing, ensuring that no commercial cloud receives logs of what you eat.
              </p>
            </div>

            <div className="space-y-4">
              {securityFeatures.map((feat, i) => (
                <div key={i} className="flex space-x-4 rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-black uppercase tracking-wider text-slate-800">{feat.title}</h4>
                    <p className="font-sans text-xs text-slate-500 mt-1 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual specifications widget */}
          <div className="lg:col-span-5">
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100/50 space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <Smartphone className="h-6 w-6 text-emerald-500" />
                <div>
                  <h3 className="font-sans text-xs font-black uppercase tracking-wider text-slate-800">Package Verification Sheet</h3>
                  <p className="font-mono text-[9px] text-slate-400">Stable release v2.0.0</p>
                </div>
              </div>

              {/* Grid of specs */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-500">Target Framework</span>
                  <span className="font-mono font-bold text-slate-800">Android SDK 34 (API 14)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-500">Build Signature</span>
                  <span className="font-mono font-bold text-slate-800">SHA-256 Verified RSA</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-500">Package Namespace</span>
                  <span className="font-mono font-bold text-emerald-600">com.zettacreations.nutrilens</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-500">Binary Size</span>
                  <span className="font-mono font-bold text-slate-800">24.81 MB</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-500">Ad Integrations</span>
                  <span className="font-sans font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-100">
                    0% NONE (100% Ad-Free)
                  </span>
                </div>
              </div>

              {/* Direct Downloader CTA inside widget */}
              <button
                onClick={onOpenApkModal}
                className="w-full inline-flex items-center justify-center space-x-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 py-3 font-sans text-xs font-bold text-white shadow-md shadow-emerald-100 transition-all cursor-pointer"
                id="security-panel-download-btn"
              >
                <Download className="h-4 w-4" />
                <span>Verify & Download APK Package</span>
              </button>

              <div className="rounded-lg bg-emerald-50/20 border border-emerald-100 p-3 flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="font-sans text-[10px] text-slate-600 leading-normal">
                  <span className="font-bold text-emerald-700">Web Mirroring:</span> Prefer browser-grade sandboxing instead of physical installation? Access the fully synchronized web version instantly at <a href={APP_CONFIG.WEB_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-emerald-700">nutrilensapp.pages.dev</a>.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
