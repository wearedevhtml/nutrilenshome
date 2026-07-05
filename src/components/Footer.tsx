import React from 'react';
import { Activity, ExternalLink, ShieldCheck } from 'lucide-react';
import { NutriLensLogo, StudioLogo } from './Logos';
import { APP_CONFIG } from '../config';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenApkModal: () => void;
}

export default function Footer({ onScrollToSection, onOpenApkModal }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900">
      
      {/* Upper footer area */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <NutriLensLogo size={36} />
              <div>
                <span className="font-sans text-xl font-black tracking-tight text-white uppercase">
                  NutriLens <span className="text-emerald-500">AI</span>
                </span>
                <p className="font-mono text-[9px] leading-none text-slate-500 uppercase tracking-widest font-bold flex items-center space-x-1 mt-0.5">
                  <span>by</span>
                  <StudioLogo size={14} className="inline-block" />
                  <span>ZettaCreations</span>
                </p>
              </div>
            </div>
            
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              NutriLens AI is a professional-grade food ingredients scanner and toxicology evaluation suite designed around medical transparency and health-conscious food security. Scan products <strong className="text-emerald-400 font-extrabold">by barcode</strong> to instantly map hidden additives and chemical profiles with our offline private chemical mapping index.
            </p>

            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>ZettaCreations Software Delivery Keystore Verified</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-200">
              Site Index
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('overview')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                  id="footer-link-overview"
                >
                  Overview & Device Mockup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('demo')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                  id="footer-link-demo"
                >
                  Interactive Sandbox Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('additives')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                  id="footer-link-additives"
                >
                  Additive Database Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('security')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                  id="footer-link-security"
                >
                  APK Integrity Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                  id="footer-link-about"
                >
                  About the Creators
                </button>
              </li>
            </ul>
          </div>

          {/* Platforms mirror */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <StudioLogo size={20} className="rounded-sm" />
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-200">
                Channels & Platforms
              </h4>
            </div>
            
            <div className="flex flex-col space-y-2.5">
              <button
                onClick={onOpenApkModal}
                className="w-full inline-flex items-center justify-between rounded-lg bg-emerald-950/40 border border-emerald-900/60 px-4 py-2.5 font-sans text-xs font-semibold text-emerald-400 hover:bg-emerald-950/80 transition-all cursor-pointer"
                id="footer-download-apk-btn"
              >
                <span>Download Android APK</span>
                <span className="font-mono text-[9px] opacity-80">v2.0.0 ↓</span>
              </button>

              <a
                href={APP_CONFIG.WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between rounded-lg bg-slate-900 border border-slate-800 px-4 py-2.5 font-sans text-xs font-semibold text-slate-200 hover:bg-slate-850 transition-all cursor-pointer"
                id="footer-web-app-link"
              >
                <span>Launch Web Application</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            
            <p className="font-sans text-[10px] text-slate-500">
              Official web version mirror hosted at <a href={APP_CONFIG.WEB_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-350">NutriLens Web App Portal</a>.
            </p>
          </div>

        </div>

        {/* Clinical / Legal Disclaimer Section */}
        <div className="mt-12 border-t border-slate-900 pt-8">
          <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-4 font-sans text-[10px] leading-relaxed text-slate-500">
            <span className="font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Clinical Toxicology Disclosure & Safety Disclaimer
            </span>
            NutriLens AI is a chemical ingredient mapping tool created for general educational awareness and dietary wellness transparency. The database maps stabilizers, preservatives, and food compounds against publications from health authorities (EFSA, WHO, FDA, and peer-reviewed journals). This application does not diagnose, treat, prevent, or cure any clinical condition or allergy. Chemical sensitivities and toxicological allergies are highly individual. NutriLens AI should not be substituted for medical diagnostics, professional dietitian advice, or direct consultation with healthcare practitioners.
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px] text-slate-600 border-t border-slate-900/40 pt-8">
          <p>© 2026 NutriLens AI. Built in compliance with medical and data sovereignty standards.</p>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1.5">
              <StudioLogo size={16} />
              <span className="font-semibold text-slate-400">ZettaCreations Software</span>
            </div>
            <span>|</span>
            <span className="hover:text-slate-450 cursor-pointer">Terms of Service</span>
            <span>|</span>
            <span className="hover:text-slate-450 cursor-pointer">Privacy Sovereignty</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
