import React, { useState } from 'react';
import { Download, ExternalLink, Menu, X, ShieldCheck, Activity } from 'lucide-react';
import { NutriLensLogo, StudioLogo } from './Logos';
import { APP_CONFIG } from '../config';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenApkModal: () => void;
}

export default function Header({ onScrollToSection, onOpenApkModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Interactive Demo', id: 'demo' },
    { label: 'Additive Inspector', id: 'additives' },
    { label: 'APK Standards', id: 'security' },
    { label: 'About', id: 'about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-20 border-b border-emerald-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <NutriLensLogo size={36} />
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-sans text-xl font-black tracking-tight text-slate-800 uppercase">
                NutriLens <span className="text-emerald-600">AI</span>
              </span>
              <span className="rounded-xs bg-emerald-100 px-1.5 py-0.2 font-mono text-[8px] font-bold tracking-wider text-emerald-800 uppercase border border-emerald-200/50">
                PRO
              </span>
            </div>
            <p className="font-mono text-[9px] leading-none text-slate-400 font-bold tracking-wider uppercase flex items-center space-x-1 mt-0.5">
              <span>by</span>
              <StudioLogo size={14} className="inline-block" />
              <span>ZettaCreations</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              className="font-sans text-sm font-semibold text-slate-500 hover:text-emerald-600 border-b-2 border-transparent hover:border-emerald-500 pb-1 pt-1 transition-all duration-150 cursor-pointer"
              id={`nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Triggers */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={APP_CONFIG.WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 rounded-lg border-2 border-slate-200 bg-white px-4 py-2 font-sans text-xs font-bold text-slate-800 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer"
            id="nav-btn-web-launch"
          >
            <span>Launch Web App</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={onOpenApkModal}
            className="inline-flex items-center space-x-2 rounded-lg bg-emerald-600 px-4 py-2 font-sans text-xs font-bold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            id="nav-btn-apk-download"
          >
            <Download className="h-4 w-4" />
            <span>Download APK</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={onOpenApkModal}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs"
            title="Download APK"
            id="mobile-quick-download"
          >
            <Download className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200" id="mobile-menu-drawer">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left font-sans text-base font-medium py-2 px-3 rounded-lg text-slate-700 hover:bg-emerald-50/50 hover:text-emerald-700 transition-colors cursor-pointer"
                id={`mobile-nav-item-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={APP_CONFIG.WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 rounded-lg border border-slate-200 bg-white py-2.5 font-sans text-xs font-semibold text-slate-700 shadow-xs"
                id="mobile-btn-web"
              >
                <span>Web Version</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApkModal();
                }}
                className="inline-flex items-center justify-center space-x-1.5 rounded-lg bg-emerald-600 py-2.5 font-sans text-xs font-semibold text-white shadow-xs hover:bg-emerald-700"
                id="mobile-btn-apk"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download APK</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
