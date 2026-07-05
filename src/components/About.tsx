import React from 'react';
import { StudioLogo } from './Logos';
import { User, Shield, Terminal, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-b border-slate-200/60 relative overflow-hidden">
      {/* Decorative subtle background grid or patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
            About the Creators
          </span>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight text-slate-900 uppercase sm:text-4xl">
            Engineering Trust & Transparency
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 font-sans">
            NutriLens AI is built with precision, aiming to empower individuals with clinical toxicological knowledge and complete data sovereignty.
          </p>
        </div>

        {/* Elegant Developer & Studio Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/50 p-6 sm:p-10 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 duration-350">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Left Column: ZettaCreations Branding & Studio Logo */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 border-b md:border-b-0 md:border-r border-slate-200/80 pb-6 md:pb-0 md:pr-8 md:w-56">
              <div className="relative group mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 opacity-20 group-hover:opacity-40 transition duration-350 blur"></div>
                <div className="relative bg-slate-900 p-4 rounded-full shadow-md">
                  <StudioLogo size={48} />
                </div>
              </div>
              
              <h3 className="font-sans text-lg font-black uppercase tracking-tight text-slate-900">
                ZettaCreations
              </h3>
              <p className="font-mono text-[10px] text-emerald-600 uppercase font-bold tracking-widest mt-1">
                Software Lab
              </p>
              
              <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
                Dedicated to building high-performance, security-focused medical-grade algorithms and offline utility systems.
              </p>
            </div>

            {/* Right Column: Key Developer Profile & Credentials */}
            <div className="flex-1 space-y-6">
              <div>
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5 justify-center md:justify-start">
                  <Terminal className="h-3 w-3 text-emerald-600" />
                  <span>Project Leadership</span>
                </h4>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-center sm:text-left">
                  <div className="bg-emerald-50 h-12 w-12 rounded-xl flex items-center justify-center shrink-0 mx-auto sm:mx-0 border border-emerald-100">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xl font-extrabold text-slate-800 tracking-tight">
                      Daksh Jawale
                    </h5>
                    <p className="text-xs font-semibold text-emerald-600 font-mono tracking-wider uppercase mt-0.5">
                      Main Developer — ZettaCreations
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  NutriLens AI is a manifestation of modern healthcare awareness, providing high-fidelity chemical analytics <strong className="text-emerald-600 font-extrabold">instantly via barcode scanning</strong>. Led by <strong className="text-slate-800">Daksh Jawale</strong>, the development paradigm centers on private, swift, and highly localized chemical evaluation schemas to safeguard consumer health decisions worldwide.
                </p>
              </div>

              {/* Trust Indicators / Credentials Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/80 flex items-center gap-2.5">
                  <Shield className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="block font-sans text-[10px] font-bold text-slate-800 uppercase tracking-tight leading-none">Security First</span>
                    <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-0.5 block">Sandboxed & Private</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/80 flex items-center gap-2.5">
                  <Terminal className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="block font-sans text-[10px] font-bold text-slate-800 uppercase tracking-tight leading-none">Pure TS/ESM</span>
                    <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-0.5 block">Optimized Build</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
