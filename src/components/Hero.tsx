import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ExternalLink, ShieldCheck, Activity, ScanLine, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRODUCT_SAMPLES } from '../data/samples';
import { ADDITIVES } from '../data/additives';
import { NutriLensLogo } from './Logos';
import { APP_CONFIG } from '../config';

interface HeroProps {
  onOpenApkModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onOpenApkModal, onScrollToSection }: HeroProps) {
  const [selectedSampleId, setSelectedSampleId] = useState('neon-soda');
  const [isScanning, setIsScanning] = useState(false);

  const activeSample = PRODUCT_SAMPLES.find(s => s.id === selectedSampleId) || PRODUCT_SAMPLES[0];
  
  const sampleAdditives = activeSample.additivesDetected.map(id => 
    ADDITIVES.find(a => a.id === id)
  ).filter(Boolean);

  const handleSampleChange = (id: string) => {
    if (id === selectedSampleId) return;
    setIsScanning(true);
    setSelectedSampleId(id);
    setTimeout(() => {
      setIsScanning(false);
    }, 850);
  };

  return (
    <section id="overview" className="relative overflow-hidden bg-slate-50/50 pb-20 pt-12 md:pb-28 md:pt-20">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-8 -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero text contents */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left z-10">
            
            {/* Tagline */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-widest">
                Professional Grade Toxicology
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full uppercase tracking-widest border border-amber-400 shadow-sm animate-pulse">
                <ScanLine className="w-3.5 h-3.5" />
                Barcode Scanning Enabled
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-sans text-5xl font-black text-slate-900 leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                Scan your <br /><span className="text-emerald-500">Nutrition.</span>
              </h1>
              <p className="mx-auto max-w-lg lg:mx-0 font-sans text-base text-slate-500 sm:text-lg leading-relaxed">
                NutriLens AI (by ZettaCreations) is a professional-grade food ingredients scanner and toxicology evaluation suite. Reveal hidden additives, synthetic stabilizers, and non-nutritive compounds instantly <strong className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-extrabold shadow-2xs">by scanning the product barcode</strong>.
              </p>
            </div>

            {/* Action Buttons styled geometrically */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 w-full">
              <button
                onClick={onOpenApkModal}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center py-4 px-6 rounded-lg shadow-xl shadow-emerald-200 transition-all cursor-pointer"
                id="hero-apk-download-btn"
              >
                <div className="text-left flex-1">
                  <div className="text-[9px] uppercase font-bold opacity-80 leading-none tracking-widest">Download Native</div>
                  <div className="text-lg font-extrabold leading-tight">Android APK</div>
                </div>
                <Download className="w-6 h-6 ml-4 opacity-70" />
              </button>

              <a
                href={APP_CONFIG.WEB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-800 flex items-center justify-center py-4 px-6 rounded-lg transition-all group cursor-pointer"
                id="hero-web-app-btn"
              >
                <div className="text-left flex-1">
                  <div className="text-[9px] uppercase font-bold text-slate-400 group-hover:text-emerald-500 leading-none tracking-widest">Access Cloud</div>
                  <div className="text-lg font-extrabold leading-tight">Web Version</div>
                </div>
                <ExternalLink className="w-5 h-5 ml-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </a>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-3 gap-6 pt-4 text-left border-t border-slate-200/50">
              <div>
                <div className="text-emerald-500 font-extrabold text-2xl">01</div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Scan</div>
                <p className="text-[10px] text-slate-500 font-medium uppercase leading-tight">Real-time OCR processing</p>
              </div>
              <div>
                <div className="text-emerald-500 font-extrabold text-2xl">02</div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Analyze</div>
                <p className="text-[10px] text-slate-500 font-medium uppercase leading-tight">Chemical profile indexing</p>
              </div>
              <div>
                <div className="text-emerald-500 font-extrabold text-2xl">03</div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Verify</div>
                <p className="text-[10px] text-slate-500 font-medium uppercase leading-tight">Toxicology risk scoring</p>
              </div>
            </div>

            {/* Co-Branding footer */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Verified Secure build</span>
              <span className="text-slate-200">|</span>
              <span>100% ad-free</span>
            </div>
          </div>

          {/* Interactive Mobile Scan Mockup (Clinical Vibe, Inter, Emerald Accents) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Interactive controller tabs */}
            <div className="mb-6 flex flex-wrap justify-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 p-1">
              {PRODUCT_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleChange(sample.id)}
                  className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold transition-all cursor-pointer ${
                    selectedSampleId === sample.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  id={`hero-tab-${sample.id}`}
                >
                  {sample.brand.includes('Eco') || sample.brand.includes('Therap') ? 'Organic' : 'Processed'}
                </button>
              ))}
            </div>

            {/* The Smartphone Frame */}
            <div className="relative mx-auto w-[310px] h-[610px] rounded-[38px] border-[8px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden">
              {/* Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center">
                <div className="h-1 w-10 bg-slate-800 rounded-full" />
              </div>

              {/* Internal Screen Container (High-contrast light layout) */}
              <div className="w-full h-full bg-slate-50 flex flex-col relative pt-6 text-slate-900 font-sans select-none overflow-y-auto scrollbar-none">
                
                {/* Simulated App Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-white">
                  <div className="flex items-center space-x-1.5">
                    <NutriLensLogo size={18} />
                    <span className="font-sans text-xs font-bold tracking-tight text-slate-900">NutriLens Analyzer</span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[8px] font-semibold text-slate-500">v2.0</span>
                </div>

                {/* Simulated Viewfinder */}
                <div className="relative h-[150px] w-full bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
                  
                  {/* Ingredient label graphic background */}
                  <div className="absolute inset-2 border border-dashed border-emerald-500/40 rounded-lg flex flex-col items-center justify-center bg-slate-950/70 p-3 text-center">
                    <p className="font-mono text-[8px] leading-tight text-emerald-400 overflow-hidden text-ellipsis line-clamp-4">
                      {activeSample.ingredientsRaw}
                    </p>
                  </div>

                  {/* Scanning Overlay (Scanning bar) */}
                  <AnimatePresence>
                    {(isScanning || !isScanning) && (
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-lg shadow-emerald-400/50 z-20"
                        initial={{ top: '10%' }}
                        animate={{ top: '90%' }}
                        transition={{
                          repeat: Infinity,
                          repeatType: 'reverse',
                          duration: 2.2,
                          ease: 'easeInOut'
                        }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Scanning Glow Cover */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-500/10 z-10 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="rounded-full bg-emerald-600/90 px-3 py-1 font-mono text-[9px] text-white font-bold tracking-widest uppercase animate-pulse">
                        Analyzing OCR...
                      </div>
                    </div>
                  )}

                  {/* Corners */}
                  <div className="absolute top-3 left-3 h-3.5 w-3.5 border-t-2 border-l-2 border-emerald-500" />
                  <div className="absolute top-3 right-3 h-3.5 w-3.5 border-t-2 border-r-2 border-emerald-500" />
                  <div className="absolute bottom-3 left-3 h-3.5 w-3.5 border-b-2 border-l-2 border-emerald-500" />
                  <div className="absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-emerald-500" />
                </div>

                {/* Simulated Scanner Results Area */}
                <div className="flex-1 p-3 flex flex-col space-y-3 bg-slate-50">
                  
                  {/* Product Header */}
                  <div className="rounded-xl bg-white border border-slate-100 p-2.5 shadow-xs flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="font-mono text-[8px] font-semibold text-emerald-600 uppercase tracking-wide truncate">{activeSample.brand}</p>
                      <h3 className="font-sans text-xs font-bold text-slate-800 truncate">{activeSample.name}</h3>
                    </div>

                    {/* Circular Score Gauge */}
                    <div className="flex flex-col items-center justify-center shrink-0 ml-2">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-sans text-xs font-bold ${
                        activeSample.score > 75 ? 'border-emerald-500 text-emerald-600 bg-emerald-50/30' :
                        activeSample.score > 40 ? 'border-amber-400 text-amber-600 bg-amber-50/20' :
                        'border-red-500 text-red-600 bg-red-50/30'
                      }`}>
                        {activeSample.score}
                      </div>
                      <span className="font-mono text-[7px] text-slate-400 mt-0.5">Score</span>
                    </div>
                  </div>

                  {/* Detected Additives List */}
                  <div className="space-y-1.5 flex-1 overflow-y-auto">
                    <p className="font-mono text-[8px] uppercase tracking-wider text-slate-400 font-semibold">Chemical Profiling</p>
                    
                    {sampleAdditives.length === 0 ? (
                      <div className="rounded-lg border border-slate-100 bg-white p-3 text-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
                        <p className="font-sans text-[10px] font-semibold text-slate-700 mt-1">No additives flagged</p>
                      </div>
                    ) : (
                      sampleAdditives.map((add, i) => (
                        <div key={add!.id} className="rounded-lg bg-white border border-slate-100 p-2 flex items-start space-x-2">
                          <span className={`inline-flex h-4 px-1.5 items-center justify-center rounded-md font-mono text-[8px] font-bold ${
                            add!.risk === 'danger' ? 'bg-red-50 text-red-600 border border-red-200' :
                            add!.risk === 'caution' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                            'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          }`}>
                            {add!.eNumber}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-sans text-[10px] font-bold text-slate-800 leading-tight">{add!.name}</h4>
                            <p className="font-sans text-[8px] text-slate-400 leading-tight truncate mt-0.5">{add!.description}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Summary Callout */}
                  <div className={`rounded-xl p-2.5 border text-[9px] leading-tight ${
                    activeSample.score > 75 ? 'bg-emerald-50/30 border-emerald-100 text-slate-700' :
                    activeSample.score > 40 ? 'bg-amber-50/20 border-amber-100 text-slate-700' :
                    'bg-red-50/30 border-red-100 text-slate-700'
                  }`}>
                    <div className="flex items-center space-x-1 mb-1 font-sans font-bold">
                      <AlertCircle className={`h-3 w-3 ${
                        activeSample.score > 75 ? 'text-emerald-500' :
                        activeSample.score > 40 ? 'text-amber-500' :
                        'text-red-500'
                      }`} />
                      <span>Clinical Toxicology Summary</span>
                    </div>
                    <p className="font-sans text-slate-600 text-[8.5px] leading-normal">{activeSample.summary}</p>
                  </div>

                </div>
              </div>

              {/* Smartphone Home Bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-24 bg-slate-800 rounded-full z-30" />
            </div>

            {/* Quick Note below the phone */}
            <p className="mt-4 font-sans text-xs text-slate-400 text-center flex items-center justify-center space-x-1">
              <span>Interactive Simulator: Click the buttons above to test different scans.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
