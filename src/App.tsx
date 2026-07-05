/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ScanDemo from './components/ScanDemo';
import AdditiveExplorer from './components/AdditiveExplorer';
import SecurityPanel from './components/SecurityPanel';
import About from './components/About';
import Footer from './components/Footer';
import ApkVerification from './components/ApkVerification';

export default function App() {
  const [apkModalOpen, setApkModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth">
      {/* Primary Sticky Header */}
      <Header
        onScrollToSection={scrollToSection}
        onOpenApkModal={() => setApkModalOpen(true)}
      />

      <main>
        {/* Hero Section containing Device Scanner Mockup */}
        <Hero
          onOpenApkModal={() => setApkModalOpen(true)}
          onScrollToSection={scrollToSection}
        />

        {/* Interactive Lab Sandbox / Demo Scanner */}
        <ScanDemo />

        {/* Searchable / Filterable Additives Database Explorer */}
        <AdditiveExplorer />

        {/* APK Packaging & Security Standards Showcase */}
        <SecurityPanel
          onOpenApkModal={() => setApkModalOpen(true)}
        />

        {/* About Section */}
        <About />
      </main>

      {/* Comprehensive Clinical Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenApkModal={() => setApkModalOpen(true)}
      />

      {/* APK Security Center and Downloader Modal Overlay */}
      <ApkVerification
        isOpen={apkModalOpen}
        onClose={() => setApkModalOpen(false)}
      />
    </div>
  );
}

