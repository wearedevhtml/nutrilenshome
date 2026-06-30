import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  Camera, 
  Database, 
  Activity, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  Settings, 
  Sparkles, 
  Smartphone, 
  ArrowRight, 
  ExternalLink, 
  ChevronRight, 
  Info, 
  Sliders, 
  X, 
  AlertTriangle,
  Heart,
  HelpCircle,
  Check,
  Download,
  BookOpen,
  Filter,
  Search,
  Maximize2,
  ShieldCheck,
  Eye,
  Layers,
  Sparkle,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CloverLogo } from './components/CloverLogo';
import { ZettacreationsLogo } from './components/ZettacreationsLogo';
import { QRCodeSVG } from 'qrcode.react';

// Static spec data for the Scientific E-Numbers Index
interface AdditiveSpec {
  code: string;
  name: string;
  category: 'color' | 'sweetener' | 'thickener' | 'preservative';
  risk: 'low' | 'moderate' | 'high';
  impact: string;
  restrictions: string;
}

const E_NUMBERS_DATABASE: AdditiveSpec[] = [
  {
    code: 'E102',
    name: 'Tartrazine (Yellow 5)',
    category: 'color',
    risk: 'high',
    impact: 'Associated with hyperactivity in children (ADHD), severe allergic reactions, and asthma triggers.',
    restrictions: 'Requires voluntary warning labels in the European Union; restricted in Norway and Austria.'
  },
  {
    code: 'E129',
    name: 'Allura Red AC (Red 40)',
    category: 'color',
    risk: 'high',
    impact: 'Derived from coal tar. Linked to behavioral disruptions in children and potential DNA damage under elevated dosage.',
    restrictions: 'Banned in Denmark, Belgium, France, Germany, Sweden, and Switzerland.'
  },
  {
    code: 'E110',
    name: 'Sunset Yellow FCF',
    category: 'color',
    risk: 'high',
    impact: 'Synthetic azo dye. May trigger urticaria, congestion, and stomach sensitivities.',
    restrictions: '欧盟 (EU) mandates warnings. Banned in Norway and Finland.'
  },
  {
    code: 'E133',
    name: 'Brilliant Blue FCF',
    category: 'color',
    risk: 'moderate',
    impact: 'Synthetic dye derived from coal tar. Potential neuro-behavioral effects and cellular toxicity reported.',
    restrictions: 'Restricted across the EU; historically banned in several European nations.'
  },
  {
    code: 'E951',
    name: 'Aspartame',
    category: 'sweetener',
    risk: 'high',
    impact: 'Intense artificial sweetener. Formulates formaldehyde during metabolism. May disrupt gut microflora and alter hunger signaling.',
    restrictions: 'Classified as "possibly carcinogenic to humans" (Group 2B) by the WHO / IARC in 2023.'
  },
  {
    code: 'E955',
    name: 'Sucralose',
    category: 'sweetener',
    risk: 'moderate',
    impact: 'Chlorinated artificial sweetener. Shown to degrade intestinal barrier integrity and cause insulin insensitivity in baseline trials.',
    restrictions: 'Permitted globally but under extensive pediatric and gastroenterological review.'
  },
  {
    code: 'E950',
    name: 'Acesulfame Potassium',
    category: 'sweetener',
    risk: 'moderate',
    impact: 'Synthetic calorie-free sweetener. Contains methylene chloride (a known chemical solvent) as a production byproduct.',
    restrictions: 'Widely used in diet beverages, frequently paired with Aspartame to mask bitter trace elements.'
  },
  {
    code: 'E407',
    name: 'Carrageenan',
    category: 'thickener',
    risk: 'high',
    impact: 'Extracted from red seaweed. Degraded carrageenan causes profound ulceration, intestinal lesions, and systemic colon inflammation.',
    restrictions: 'Banned in organic baby foods and restricted in infant formulas in the EU.'
  },
  {
    code: 'E415',
    name: 'Xanthan Gum',
    category: 'thickener',
    risk: 'low',
    impact: 'Bacterial fermentation product. Generally safe, but highly concentrated intake can disrupt bowel regulation and cause gas.',
    restrictions: 'Approved worldwide; commonly used in gluten-free products to replicate structural elasticity.'
  },
  {
    code: 'E211',
    name: 'Sodium Benzoate',
    category: 'preservative',
    risk: 'moderate',
    impact: 'Inhibits cellular mitochondria function in yeast/mold. When paired with ascorbic acid (Vit C), it synthesizes benzene (carcinogen).',
    restrictions: 'Strictly limited concentration caps in food formulations worldwide.'
  },
  {
    code: 'E320',
    name: 'Butylated Hydroxyanisole (BHA)',
    category: 'preservative',
    risk: 'high',
    impact: 'Synthetic antioxidant used to prevent rancidity. Highly suspected endocrine disruptor and potential human carcinogen.',
    restrictions: 'Banned from infant formulas; heavily regulated in the state of California (Prop 65).'
  }
];

// Specimen mock reports for the clinical demo playground
interface SpecimenReport {
  id: string;
  name: string;
  type: string;
  grade: 'A' | 'C' | 'F';
  summary: string;
  score: number;
  additives: { code: string; name: string; risk: 'low' | 'moderate' | 'high'; desc: string }[];
  macros: { fat: number; sugar: number; sodium: number; protein: number; fiber: number };
}

const SPECIMENS: SpecimenReport[] = [
  {
    id: 'specimen-a',
    name: 'Industrial Fizzy Cola',
    type: 'Carbonated Soft Drink',
    grade: 'F',
    summary: 'Ultra-processed formulation utilizing sulfur-ammonia caramel colorants and harsh phosphoric acid. Zero nutritional value offset by heavy chemical load.',
    score: 15,
    additives: [
      { code: 'E150d', name: 'Caramel Color IV', risk: 'high', desc: 'Contains 4-MEI, a byproduct classified as a potential carcinogen by state toxicology registries.' },
      { code: 'E338', name: 'Phosphoric Acid', risk: 'moderate', desc: 'Strong mineral acid that leeches calcium from bones and erodes tooth enamel.' },
      { code: 'E951', name: 'Aspartame', risk: 'high', desc: 'Artificial sweetener linked to metabolic disruption and microbiome degradation.' }
    ],
    macros: { fat: 0, sugar: 42, sodium: 35, protein: 0, fiber: 0 }
  },
  {
    id: 'specimen-b',
    name: 'Standard Custard Cookies',
    type: 'Supermarket Biscuits',
    grade: 'C',
    summary: 'Contains hydrogenated palm lipids and refined sugars. Artificial yellow colors present requiring ADHD behavioral caution labels.',
    score: 48,
    additives: [
      { code: 'E102', name: 'Tartrazine', risk: 'high', desc: 'Azo dye restricted internationally due to hypersensitivity and pediatric hyperactivity.' },
      { code: 'E500', name: 'Sodium Carbonate', risk: 'low', desc: 'Basic raising agent. Fully non-toxic organic mineral compound.' }
    ],
    macros: { fat: 18, sugar: 28, sodium: 340, protein: 4.5, fiber: 1.2 }
  },
  {
    id: 'specimen-c',
    name: 'Cold-Pressed Almond Butter',
    type: 'Organic Seed Spread',
    grade: 'A',
    summary: '100% clean-label food matrix. Formulated entirely from roasted single-ingredient almonds and sea salt. Zero synthetic preservation compounds.',
    score: 98,
    additives: [],
    macros: { fat: 52, sugar: 4.2, sodium: 120, protein: 21, fiber: 11.5 }
  }
];

export default function App() {
  // Navigation active anchors
  const [activeSpecimen, setActiveSpecimen] = useState<string>('specimen-a');
  const [eNumFilter, setENumFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showMedianModal, setShowMedianModal] = useState<boolean>(false);
  const [qrTab, setQrTab] = useState<'apk' | 'web'>('apk');

  // Hero section interactions state
  const [activeHeroTooltip, setActiveHeroTooltip] = useState<'colors' | 'sweeteners' | 'disruptors' | null>(null);
  const [heroScanning, setHeroScanning] = useState<boolean>(false);

  // Servings calculator mock interactivity
  const [servingWeight, setServingWeight] = useState<number>(30);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);

  // Trigger a scan simulation when active specimen changes
  useEffect(() => {
    setIsScanning(true);
    setScanStep(0);
    const interval = setInterval(() => {
      setScanStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 280);

    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 1150);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [activeSpecimen]);

  const selectedSpecimen = SPECIMENS.find(s => s.id === activeSpecimen) || SPECIMENS[0];

  // Copy-to-clipboard feedback helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Filter E-numbers based on category and search query
  const filteredENumbers = E_NUMBERS_DATABASE.filter(item => {
    const matchesCategory = eNumFilter === 'all' || item.category === eNumFilter;
    const matchesSearch = item.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.impact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col scroll-smooth">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 bg-stone-50/85 backdrop-blur-md border-b border-stone-200 px-3 sm:px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center shrink-0">
              <CloverLogo size={44} showBackground={true} />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3.5 shrink-0">
              {/* Brand Title Row */}
              <div className="flex items-baseline gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap">
                <span className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-stone-950 leading-none">
                  BioLens
                </span>
                <span className="font-sans text-[11px] sm:text-xs md:text-lg text-[#026854] tracking-tight flex items-center gap-0.5 sm:gap-1 leading-none whitespace-nowrap">
                  <span className="font-light text-stone-500">by</span>
                  <span className="font-bold">ZettaCreations</span>
                </span>
              </div>
              
              {/* Premium Scanner Badge */}
              <div className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 bg-[#eefdf5] border border-emerald-100 rounded-full text-[#026854] font-sans font-bold text-[8px] sm:text-[9px] md:text-xs uppercase tracking-wider w-fit shrink-0 whitespace-nowrap">
                <Leaf className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-emerald-600 fill-emerald-100/20 shrink-0" />
                <span className="whitespace-nowrap">BIOLENS PREMIUM FOOD SCANNER</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 shrink-0">
            <a href="#overview" className="text-xs font-semibold text-stone-600 hover:text-stone-900 uppercase tracking-wider transition-colors">Overview</a>
            <a href="#toxicology" className="text-xs font-semibold text-stone-600 hover:text-stone-900 uppercase tracking-wider transition-colors">Specimen Demo</a>
            <a href="#e-numbers" className="text-xs font-semibold text-stone-600 hover:text-stone-900 uppercase tracking-wider transition-colors">E-Numbers Index</a>
            <a href="#median-guide" className="text-xs font-semibold text-stone-600 hover:text-stone-900 uppercase tracking-wider transition-colors">Median.co Wrap</a>
          </nav>

          {/* Core Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="https://biolens.pages.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-stone-800 border border-stone-300 rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2.5 bg-stone-100/40 hover:bg-stone-100 font-semibold transition-all"
              id="header-cta-pages"
            >
              <span className="hidden sm:inline">Go to biolens.pages.dev</span>
              <span className="inline sm:hidden">Live Site</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500" />
            </a>
            <a 
              href="/api/download-apk" 
              download="biolens-ai-app-release.apk"
              className="hidden sm:flex items-center gap-1.5 text-xs text-stone-50 bg-stone-900 hover:bg-emerald-800 rounded-xl px-4 py-2.5 font-semibold transition-all shadow-sm cursor-pointer"
              id="header-cta-download"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Premium Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/60 via-stone-50 to-stone-50 pt-16 pb-20 px-4 border-b border-stone-200">
        {/* Ambient background blur circles */}
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-emerald-100/30 filter blur-3xl -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-5 right-1/4 w-80 h-80 rounded-full bg-amber-100/20 filter blur-3xl -z-10 animate-pulse" style={{ animationDuration: '12s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Animated Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.05
                  }
                }
              }}
              className="lg:col-span-7 text-left space-y-6 relative"
            >
              {/* Horizontal sweeping laser over the text during hero scan */}
              {heroScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-laser-sweep pointer-events-none z-20"></div>
              )}

              <motion.button 
                onClick={() => {
                  if (heroScanning) return;
                  setHeroScanning(true);
                  setTimeout(() => setHeroScanning(false), 2400);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                  heroScanning 
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-[0_0_12px_#10b981]' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-100/80 hover:bg-emerald-100'
                }`}
              >
                <Sparkle className={`w-3.5 h-3.5 fill-current ${heroScanning ? 'animate-spin' : 'animate-spin-slow'}`} />
                <span>{heroScanning ? '⚡ SCANNING HERO TEXT...' : '🔬 TAP TO SCAN HERO TEXT'}</span>
              </motion.button>

              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85, damping: 13 } }
                }}
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.08] min-h-[120px]"
              >
                {heroScanning ? (
                  <>
                    Scan Active: <span className="text-rose-600 font-mono">Isolating Toxic Strings...</span><br />
                    <span className="text-emerald-500 animate-pulse">Analyzing Compounds...</span>
                  </>
                ) : (
                  <>
                    Look Beyond the Fine Print.<br />
                    <span className="text-emerald-850">Unmask Food Additives Instantly.</span>
                  </>
                )}
              </motion.h1>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans relative z-10"
              >
                BioLens AI is a professional-grade food barcode scanner, chemical toxicology analyzer, and clean-label companion. Decipher ingredients labels instantly using advanced vision models and trace hidden{' '}
                
                {/* Synthetic Colors Term */}
                <span className="relative inline-block">
                  <button
                    onClick={() => setActiveHeroTooltip(activeHeroTooltip === 'colors' ? null : 'colors')}
                    className={`font-bold transition-all px-1.5 py-0.5 rounded cursor-pointer ${
                      heroScanning 
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-400/40 animate-pulse' 
                        : activeHeroTooltip === 'colors'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-b-2 border-dotted border-stone-400'
                    }`}
                  >
                    synthetic colors
                  </button>
                  <AnimatePresence>
                    {activeHeroTooltip === 'colors' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white text-stone-900 rounded-xl p-4 shadow-xl border border-stone-200 z-50 text-xs text-left"
                      >
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-100">
                          <span className="font-bold text-stone-900 font-display flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                            Synthetic Azo Dyes
                          </span>
                          <span className="font-mono text-[9px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                            Risk: HIGH
                          </span>
                        </div>
                        <p className="text-stone-600 leading-relaxed mb-3">
                          Includes Tartrazine (E102) and Allura Red (E129). Clinical studies link these coal-tar derivatives to childhood hyperactivity, attention deficits, and severe allergic reactions. Restricted or banned in several European nations.
                        </p>
                        <button
                          onClick={() => {
                            setActiveSpecimen('specimen-b');
                            setActiveHeroTooltip(null);
                            const el = document.getElementById('toxicology');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-center font-mono text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                        >
                          <span>🔬 Scan Demo Specimen (E102)</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
                
                {', '}
                
                {/* Artificial Sweeteners Term */}
                <span className="relative inline-block">
                  <button
                    onClick={() => setActiveHeroTooltip(activeHeroTooltip === 'sweeteners' ? null : 'sweeteners')}
                    className={`font-bold transition-all px-1.5 py-0.5 rounded cursor-pointer ${
                      heroScanning 
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-400/40 animate-pulse' 
                        : activeHeroTooltip === 'sweeteners'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-b-2 border-dotted border-stone-400'
                    }`}
                  >
                    artificial sweeteners
                  </button>
                  <AnimatePresence>
                    {activeHeroTooltip === 'sweeteners' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white text-stone-900 rounded-xl p-4 shadow-xl border border-stone-200 z-50 text-xs text-left"
                      >
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-100">
                          <span className="font-bold text-stone-900 font-display flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Non-Nutritive Sweeteners
                          </span>
                          <span className="font-mono text-[9px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            Risk: MODERATE
                          </span>
                        </div>
                        <p className="text-stone-600 leading-relaxed mb-3">
                          Includes Aspartame (E951) and Sucralose (E955). Designed to replicate sweetness with zero calories, but research indicates they alter gut microbiomes, spike insulin sensitivity, and disrupt natural metabolic homeostasis.
                        </p>
                        <button
                          onClick={() => {
                            setActiveSpecimen('specimen-a');
                            setActiveHeroTooltip(null);
                            const el = document.getElementById('toxicology');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-center font-mono text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                        >
                          <span>🔬 Scan Demo Specimen (E951)</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>

                {' and '}

                {/* Intestinal Disruptors Term */}
                <span className="relative inline-block">
                  <button
                    onClick={() => setActiveHeroTooltip(activeHeroTooltip === 'disruptors' ? null : 'disruptors')}
                    className={`font-bold transition-all px-1.5 py-0.5 rounded cursor-pointer ${
                      heroScanning 
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-400/40 animate-pulse' 
                        : activeHeroTooltip === 'disruptors'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-b-2 border-dotted border-stone-400'
                    }`}
                  >
                    intestinal disruptors
                  </button>
                  <AnimatePresence>
                    {activeHeroTooltip === 'disruptors' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white text-stone-900 rounded-xl p-4 shadow-xl border border-stone-200 z-50 text-xs text-left"
                      >
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-100">
                          <span className="font-bold text-stone-900 font-display flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                            Emulsifiers & Thickeners
                          </span>
                          <span className="font-mono text-[9px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                            Risk: HIGH
                          </span>
                        </div>
                        <p className="text-stone-600 leading-relaxed mb-3">
                          Includes Carrageenan (E407) and Polysorbate 80. These common food stabilizers act like detergents inside the gastrointestinal tract, wearing down the delicate mucosal barrier and driving systemic gut wall inflammation.
                        </p>
                        <button
                          onClick={() => {
                            setActiveSpecimen('specimen-d');
                            setActiveHeroTooltip(null);
                            const el = document.getElementById('toxicology');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-center font-mono text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                        >
                          <span>🔬 Scan Demo Specimen (E407)</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
                .
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.96 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 90, damping: 14 } }
                }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <a 
                  href="/api/download-apk" 
                  download="biolens-ai-app-release.apk"
                  className="bg-stone-900 hover:bg-stone-850 text-stone-50 font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                  id="hero-cta-download-btn"
                >
                  <Download className="w-4.5 h-4.5" />
                  <span>Download Android APK</span>
                </a>
                <a 
                  href="https://biolens.pages.dev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-emerald-800 hover:bg-emerald-700 text-stone-50 font-bold text-sm px-6.5 py-3.5 rounded-xl shadow-lg shadow-emerald-900/10 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                  id="hero-cta-launch"
                >
                  <span>Open Web Version</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Quick Stats bar */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-stone-200/60 font-mono text-left"
              >
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-semibold">Database Scope</span>
                  <span className="text-lg font-bold text-stone-900 font-display">OFF Registry</span>
                  <p className="text-[10px] text-emerald-800 mt-0.5">3.2M+ products</p>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-semibold">Toxin Isolation</span>
                  <span className="text-lg font-bold text-stone-900 font-display">E-Number API</span>
                  <p className="text-[10px] text-emerald-800 mt-0.5">Hidden synthetic colors</p>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-semibold">Analytical Speed</span>
                  <span className="text-lg font-bold text-stone-900 font-display">~1.8 Seconds</span>
                  <p className="text-[10px] text-emerald-800 mt-0.5">Optical scanner parser</p>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-semibold">Platform Storage</span>
                  <span className="text-lg font-bold text-stone-900 font-display">100% Offline</span>
                  <p className="text-[10px] text-emerald-800 mt-0.5">Client-side sandbox</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: High-Fidelity Companion Interactive Panel (Brought strictly FRONT) */}
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
              className="lg:col-span-5 w-full flex flex-col justify-center items-center"
            >
              <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 relative overflow-hidden w-full max-w-md">
                {/* Background ambient lighting */}
                <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-emerald-800/15 filter blur-3xl pointer-events-none"></div>
                <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-lime-800/10 filter blur-2xl pointer-events-none"></div>

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-stone-800 border border-stone-750 px-2.5 py-1 rounded-md">
                        GET THE COMPANION
                      </span>
                      <div className="flex items-center gap-1.5 bg-stone-800 text-stone-100 px-2 py-0.5 rounded-md text-[8px] font-mono font-bold tracking-tight uppercase border border-stone-700">
                        <ZettacreationsLogo size={12} showBackground={false} />
                        <span>by zettacreations</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">v1.0.4 Live</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                      Ready to Analyze Food Compounds?
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                      Download our official Android client directly to experience the full clinical food toxicology companion on the go. Enjoy offline scanned logs, high-speed camera OCR, barcode scanning and zero telemetry.
                    </p>
                  </div>

                  {/* High contrast Interactive QR section with Segmented Tabs */}
                  <div className="bg-stone-950/80 p-4.5 rounded-2xl border border-stone-800/80 flex flex-col items-center space-y-4">
                    {/* Interactive Tab Switcher */}
                    <div className="w-full flex bg-stone-900 rounded-lg p-0.5 border border-stone-800">
                      <button
                        onClick={() => setQrTab('apk')}
                        className={`flex-1 text-[11px] font-bold py-1.5 px-2 rounded-md transition-all cursor-pointer ${
                          qrTab === 'apk'
                            ? 'bg-emerald-850 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        APK Link
                      </button>
                      <button
                        onClick={() => setQrTab('web')}
                        className={`flex-1 text-[11px] font-bold py-1.5 px-2 rounded-md transition-all cursor-pointer ${
                          qrTab === 'web'
                            ? 'bg-emerald-850 text-white shadow-sm'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        Web App
                      </button>
                    </div>

                    {/* QR Code and logo with absolute overlay */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-lg relative flex items-center justify-center border-4 border-stone-800 animate-float-slow">
                      <QRCodeSVG
                        value={qrTab === 'apk' ? `${typeof window !== 'undefined' ? window.location.origin : 'https://ais-dev-naigl53ylxz5rtcf5uk4kv-270647366792.asia-southeast1.run.app'}/api/download-apk` : 'https://biolens.pages.dev'}
                        size={150}
                        level="H"
                        includeMargin={false}
                        fgColor="#1c1917" // stone-900
                        bgColor="#ffffff"
                      />
                      <div className="absolute bg-white p-1 rounded-lg shadow-md border border-stone-100 flex items-center justify-center">
                        <ZettacreationsLogo size={24} showBackground={true} />
                      </div>
                    </div>

                    {/* Label and Host URL */}
                    <div className="text-center space-y-1">
                      <span className="text-[11px] font-bold text-white tracking-tight block">
                        {qrTab === 'apk' ? 'Scan to Download APK' : 'Scan to Launch Web App'}
                      </span>
                      <span className="text-[9px] text-stone-400 font-mono block break-all leading-normal px-2">
                        {qrTab === 'apk' 
                          ? `${typeof window !== 'undefined' ? window.location.host : 'biolens.pages.dev'}/api/download-apk`
                          : 'biolens.pages.dev'}
                      </span>
                    </div>
                  </div>

                  {/* Trust indicator checklist */}
                  <div className="pt-3 border-t border-stone-800 grid grid-cols-3 gap-1.5 text-[10px] text-stone-400 font-mono">
                    <div className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>No login required</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>No cookies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>E-ledger</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CORE FUNCTIONAL MODULES SHOWCASE */}
      <section id="overview" className="py-20 px-4 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-md px-2.5 py-1 uppercase tracking-wider">
              Scientific Foundation
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mt-4 mb-5">
              Rigorous Toxicology & Nutritional Architecture
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Standard food calculators only aggregate general calories or protein levels. BioLens scans deep into the raw chemical string, isolating food stabilizers, thickeners, and azo dyes that affect long-term cellular wellness.
            </p>
          </div>

          {/* Bento-grid presentation of the five modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Dual-Scan Architecture */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center justify-center mb-5">
                  <Scan className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900 mb-3">
                  01. Dual-Scan Architecture
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Seamless barcode query mapped to the Open Food Facts international registry. Backed by a customized clinical-tech regional database fallback representing standard domestic snack items.
                </p>
              </div>
              <div className="bg-stone-100/50 rounded-lg p-3 border border-stone-200/60 font-mono text-[10px] text-stone-600">
                <span className="font-bold text-stone-800 block mb-1">OCR VISION EXTRACTION</span>
                "REFINED WHEAT FLOUR, TARTRAZINE E102, ASPARTAME E951..."
              </div>
            </div>

            {/* Box 2: Rigorous Chemical Analyzer */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center mb-5">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900 mb-3">
                  02. Toxicology & Chemical Analyzer
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Analyzes food matrices to flag coal-tar azo dyes, chemical synthetic esters, polyols, and gut-disrupting emulsifiers that cause mucosal lining erosion.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md">Tartrazine [High]</span>
                <span className="text-[9px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md">Carrageenan [High]</span>
                <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">BHT [Mod]</span>
              </div>
            </div>

            {/* Box 3: Radar Chart & Scaler */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 border border-purple-200/80 flex items-center justify-center mb-5">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900 mb-3">
                  03. Serving Size Scaling & Radar
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Recalculates all nutritional matrices in real-time between per serving and per 100g metrics, plotted beautifully on a custom responsive vector radar web chart.
                </p>
              </div>
              <div className="bg-stone-100/50 border border-stone-200 rounded-xl p-3 flex items-center justify-between text-xs font-mono text-stone-600">
                <span>Serving Size:</span>
                <span className="font-bold text-stone-800 bg-white border px-2 py-0.5 rounded">30g / Standard</span>
              </div>
            </div>

            {/* Box 4: Context-Aware Advice */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 border border-blue-200/80 flex items-center justify-center mb-5">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900 mb-3">
                  04. Diagnostic Advice Engine
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Surfaces customized local recommendations based on historic logs patterns—such as warnings on artificial color saturation or clean-label habits praise.
                </p>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 text-[10px] font-mono text-blue-900 p-3 rounded-lg leading-relaxed">
                <strong>⚡ Dynamic Warning:</strong> Excessive synthetic sweetener occurrences alter gut flora.
              </div>
            </div>

            {/* Box 5: Local Sandbox Persistence */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-850 border border-stone-300/80 flex items-center justify-center mb-5">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900 mb-3">
                  05. Local History Sandbox
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Stores and caches your clinical scan grades natively on your hardware’s DOM Storage. Zero logins, zero tracking cookies, and 100% strict scientific privacy.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                No Cloud Sync Required
              </div>
            </div>

            {/* Box 6: Clinical Aesthetics */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl border border-emerald-900 p-6 text-stone-100 flex flex-col justify-between shadow-xl shadow-emerald-950/15">
              <div>
                <div className="w-11 h-11 rounded-lg bg-emerald-700/60 flex items-center justify-center mb-5">
                  <Sparkles className="w-5.5 h-5.5 text-stone-200" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-100 mb-2">
                  Slate Meadow Aesthetic
                </h3>
                <p className="text-stone-200/95 text-xs sm:text-sm leading-relaxed">
                  Engineered specifically using Inter and JetBrains Mono fonts. Deep charcoal elements combined with soothing clinical stone backdrops convey reliability.
                </p>
              </div>
              <a 
                href="https://biolens.pages.dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-bold font-mono text-emerald-300 hover:text-stone-100 flex items-center gap-1 mt-4 group"
              >
                VISIT BIOLENS.PAGES.DEV
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CLINICAL SPECIMEN DEMO PLAYGROUND */}
      <section id="toxicology" className="py-20 px-4 bg-stone-100/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-100 rounded-md px-2.5 py-1 uppercase tracking-wider">
              Diagnostic Specimens
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight mt-4 mb-4">
              Explore Simulated Toxicology Profiles
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Compare different food matrices. Select a specimen sample below to observe how the BioLens toxicology grader extracts additives and plots nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector column */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-2">SELECT SPECIMEN</span>
              {SPECIMENS.map((s) => {
                const isActive = activeSpecimen === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSpecimen(s.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isActive 
                        ? 'bg-white border-emerald-800 shadow-md ring-1 ring-emerald-850/10' 
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                    }`}
                    id={`btn-specimen-${s.id}`}
                  >
                    <div>
                      <span className="font-display font-bold text-stone-900 block text-sm">{s.name}</span>
                      <span className="text-[10px] font-mono text-stone-500 block uppercase mt-0.5">{s.type}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center border ${
                        s.grade === 'A' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        s.grade === 'C' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {s.grade}
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="bg-stone-200/50 rounded-xl p-4 border border-stone-300/30">
                <div className="flex gap-2.5 items-start text-xs text-stone-600 leading-relaxed">
                  <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-800 block mb-0.5">Under the Hood Lookup</span>
                    BioLens parses standard nutrition matrices and uses the Gemini API to search for international food restrictions.
                  </div>
                </div>
              </div>
            </div>

            {/* Right details column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 relative overflow-hidden min-h-[460px]">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50/20 rounded-full filter blur-2xl pointer-events-none"></div>

                {/* Simulated live scanning overlay */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-stone-900/98 backdrop-blur-xs z-30 flex flex-col items-center justify-center text-center p-6"
                    >
                      {/* Scanning sweeping laser */}
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-laser-sweep pointer-events-none"></div>
                      
                      {/* Circular Viewfinder */}
                      <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                        {/* High-tech rotating HUD elements */}
                        <div className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-2 border border-dotted border-lime-400/30 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
                        
                        {/* Scanner corner brackets */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

                        {/* Central pulsing Clover icon */}
                        <div className="scale-75 animate-pulse">
                          <CloverLogo size={90} showBackground={false} />
                        </div>
                      </div>

                      <div className="space-y-3 max-w-sm">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block animate-pulse">
                          🔬 BioLens Optical Scanner ACTIVE
                        </span>
                        
                        <h4 className="font-display font-bold text-lg text-white">
                          Scanning: {selectedSpecimen.name}
                        </h4>

                        {/* Animated micro progress bar */}
                        <div className="w-48 bg-stone-800 h-1.5 rounded-full overflow-hidden mx-auto mt-2 border border-stone-750">
                          <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.1, ease: "linear" }}
                            className="bg-emerald-500 h-full"
                          />
                        </div>

                        {/* Dynamic loading steps */}
                        <p className="text-[10px] font-mono text-stone-400 h-12 flex flex-col justify-center gap-1 select-none leading-relaxed">
                          <span className={scanStep >= 0 ? "text-emerald-400 font-semibold" : ""}>
                            {scanStep >= 0 ? "✓ [0.1s] Positioning laser matrices" : "○ [0.1s] Positioning laser matrices"}
                          </span>
                          <span className={scanStep >= 1 ? "text-emerald-400 font-semibold" : ""}>
                            {scanStep >= 1 ? "✓ [0.4s] OCR text extractor locked" : "○ [0.4s] OCR text extractor locked"}
                          </span>
                          <span className={scanStep >= 2 ? "text-emerald-400 font-semibold" : ""}>
                            {scanStep >= 2 ? "✓ [0.8s] Isolating compound additives" : "○ [0.8s] Isolating compound additives"}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200/80 pb-6 mb-6 gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-stone-500 block uppercase tracking-widest">CURRENT ANALYSIS</span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-stone-900 tracking-tight mt-1">{selectedSpecimen.name}</h3>
                    <div className="flex items-center flex-wrap gap-2.5 mt-1.5">
                      <span className="text-xs text-stone-500 font-mono uppercase tracking-wider">{selectedSpecimen.type}</span>
                      <button
                        onClick={() => {
                          setIsScanning(true);
                          setScanStep(0);
                          const interval = setInterval(() => {
                            setScanStep((prev) => (prev < 3 ? prev + 1 : prev));
                          }, 280);
                          setTimeout(() => {
                            setIsScanning(false);
                            clearInterval(interval);
                          }, 1150);
                        }}
                        className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100/70 rounded px-2 py-0.5 flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
                      >
                        <Scan className="w-2.5 h-2.5 animate-pulse" />
                        Trigger Re-Scan
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-stone-500 block uppercase font-bold">Safety Index</span>
                      <span className="text-lg font-bold text-stone-900 font-mono">{selectedSpecimen.score} / 100</span>
                    </div>
                    <div className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono ${
                      selectedSpecimen.grade === 'A' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      selectedSpecimen.grade === 'C' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      'bg-rose-50 text-rose-800 border-rose-200'
                    }`}>
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 font-semibold leading-none">Grade</span>
                      <span className="text-2xl font-black mt-0.5">{selectedSpecimen.grade}</span>
                    </div>
                  </div>
                </div>

                {/* Body split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left: Summary and Additive analysis */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-1.5">TOXICOLOGY AUDIT</span>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{selectedSpecimen.summary}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-3">FLAGGED ADDITIVES ({selectedSpecimen.additives.length})</span>
                      {selectedSpecimen.additives.length === 0 ? (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-4 flex items-center gap-2.5 text-xs font-medium">
                          <CheckCircle className="w-4 h-4 text-emerald-700" />
                          No hazardous chemical additions or colors detected.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedSpecimen.additives.map((add, i) => (
                            <div key={i} className="border border-stone-200 rounded-xl p-3 bg-stone-50">
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="font-mono text-xs font-bold text-stone-900 bg-white border border-stone-200 px-1.5 py-0.5 rounded">
                                  {add.code}
                                </span>
                                <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  add.risk === 'high' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                                  add.risk === 'moderate' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                                  'bg-stone-100 text-stone-700'
                                }`}>
                                  {add.risk} risk
                                </span>
                              </div>
                              <span className="font-display font-semibold text-xs text-stone-850 block">{add.name}</span>
                              <p className="text-[11px] text-stone-600 leading-normal mt-1">{add.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Custom serving-size slider & radar visualization */}
                  <div className="space-y-6">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-[10px] font-mono font-bold text-stone-600 uppercase tracking-wider">SERVING SCALER</span>
                        <div className="flex items-center gap-1 text-xs font-mono font-bold text-stone-900">
                          <span className="bg-white border border-stone-200 px-1.5 py-0.5 rounded">{servingWeight}g</span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="5"
                        value={servingWeight}
                        onChange={(e) => setServingWeight(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                        id="demo-range-scaler"
                      />

                      {/* Display scaled parameter ratios */}
                      <div className="grid grid-cols-2 gap-3 mt-4 font-mono text-[10px]">
                        <div className="bg-white border rounded-lg p-2 text-left">
                          <span className="text-stone-500 block uppercase">Sugar</span>
                          <span className="text-xs font-bold text-stone-850">
                            {((selectedSpecimen.macros.sugar * servingWeight) / 100).toFixed(1)}g
                          </span>
                        </div>
                        <div className="bg-white border rounded-lg p-2 text-left">
                          <span className="text-stone-500 block uppercase">Sodium</span>
                          <span className="text-xs font-bold text-stone-850">
                            {((selectedSpecimen.macros.sodium * servingWeight) / 100).toFixed(0)}mg
                          </span>
                        </div>
                        <div className="bg-white border rounded-lg p-2 text-left">
                          <span className="text-stone-500 block uppercase">Saturated Fat</span>
                          <span className="text-xs font-bold text-stone-850">
                            {((selectedSpecimen.macros.fat * servingWeight) / 100).toFixed(1)}g
                          </span>
                        </div>
                        <div className="bg-white border rounded-lg p-2 text-left">
                          <span className="text-stone-500 block uppercase">Fiber</span>
                          <span className="text-xs font-bold text-stone-850">
                            {((selectedSpecimen.macros.fiber * servingWeight) / 100).toFixed(1)}g
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-stone-200/80 rounded-xl p-4 flex flex-col items-center">
                      <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider block mb-2 text-center">
                        FORMULATION BALANCED RADAR CHART
                      </span>
                      
                      {/* Radar renderer */}
                      <div className="w-full max-w-[180px] h-[180px]">
                        {/* Values are scaled per 100g */}
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          {/* Circle rings */}
                          {[40, 80, 120].map((rIndex, key) => (
                            <circle
                              key={key}
                              cx="100"
                              cy="100"
                              r={rIndex / 1.5}
                              fill="none"
                              stroke="#e7e5e4"
                              strokeWidth="0.75"
                              strokeDasharray="2,2"
                            />
                          ))}

                          {/* Axis spoke lines */}
                          {[0, 72, 144, 216, 288].map((angle, key) => {
                            const radians = (angle * Math.PI) / 180;
                            const x = 100 + (120 / 1.5) * Math.cos(radians);
                            const y = 100 + (120 / 1.5) * Math.sin(radians);
                            return (
                              <line
                                key={key}
                                x1="100"
                                y1="100"
                                x2={x}
                                y2={y}
                                stroke="#e7e5e4"
                                strokeWidth="0.75"
                              />
                            );
                          })}

                          {/* Render dynamic polygon representing macros */}
                          {(() => {
                            const scaleMacro = (val: number, max: number) => {
                              const percent = Math.min(val / max, 1);
                              return (percent * 120) / 1.5;
                            };

                            // Fat (Max 60), Sugar (Max 60), Sodium (Max 1200), Protein (Max 30), Fiber (Max 20)
                            const rFat = scaleMacro(selectedSpecimen.macros.fat, 60);
                            const rSugar = scaleMacro(selectedSpecimen.macros.sugar, 60);
                            const rSodium = scaleMacro(selectedSpecimen.macros.sodium, 1200);
                            const rProtein = scaleMacro(selectedSpecimen.macros.protein, 30);
                            const rFiber = scaleMacro(selectedSpecimen.macros.fiber, 20);

                            const pt1 = { x: 100 + rFat * Math.cos(0), y: 100 + rFat * Math.sin(0) };
                            const pt2 = { x: 100 + rSugar * Math.cos((72 * Math.PI) / 180), y: 100 + rSugar * Math.sin((72 * Math.PI) / 180) };
                            const pt3 = { x: 100 + rSodium * Math.cos((144 * Math.PI) / 180), y: 100 + rSodium * Math.sin((144 * Math.PI) / 180) };
                            const pt4 = { x: 100 + rProtein * Math.cos((216 * Math.PI) / 180), y: 100 + rProtein * Math.sin((216 * Math.PI) / 180) };
                            const pt5 = { x: 100 + rFiber * Math.cos((288 * Math.PI) / 180), y: 100 + rFiber * Math.sin((288 * Math.PI) / 180) };

                            const pathStr = `${pt1.x},${pt1.y} ${pt2.x},${pt2.y} ${pt3.x},${pt3.y} ${pt4.x},${pt4.y} ${pt5.x},${pt5.y}`;

                            return (
                              <motion.polygon
                                animate={{ points: pathStr }}
                                transition={{ type: "spring", stiffness: 85, damping: 14 }}
                                fill={selectedSpecimen.grade === 'A' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.1)'}
                                stroke={selectedSpecimen.grade === 'A' ? '#059669' : '#dc2626'}
                                strokeWidth="1.5"
                              />
                            );
                          })()}

                          {/* Simple Label nodes */}
                          <text x="175" y="103" className="text-[7px] font-mono fill-stone-500 font-bold uppercase">Fat</text>
                          <text x="112" y="180" className="text-[7px] font-mono fill-stone-500 font-bold uppercase">Sugar</text>
                          <text x="20" y="145" className="text-[7px] font-mono fill-stone-500 font-bold uppercase">Sodium</text>
                          <text x="20" y="58" className="text-[7px] font-mono fill-stone-500 font-bold uppercase">Prot</text>
                          <text x="112" y="24" className="text-[7px] font-mono fill-stone-500 font-bold uppercase">Fib</text>
                        </svg>
                      </div>

                      <p className="text-[9px] font-mono text-stone-500 mt-2 text-center leading-relaxed">
                        Poly-geometry represents nutrient density balance per 100g base parameter.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SCIENTIFIC E-NUMBERS REFERENCE DATABASE */}
      <section id="e-numbers" className="py-20 px-4 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl text-left">
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-md px-2.5 py-1 uppercase tracking-wider">
                Additive Ledger
              </span>
              <h2 className="font-display font-bold text-3xl text-stone-900 tracking-tight mt-4 mb-4">
                Clinical Index of Industrial Additives
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Filter and examine standard food chemicals, E-numbers, and their scientifically proven systemic behavioral and metabolic impacts.
              </p>
            </div>

            {/* Live filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Additives' },
                { id: 'color', label: 'Synthetic Colors' },
                { id: 'sweetener', label: 'Sweeteners' },
                { id: 'thickener', label: 'Thickeners' },
                { id: 'preservative', label: 'Preservatives' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setENumFilter(tab.id)}
                  className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-semibold ${
                    eNumFilter === tab.id 
                      ? 'bg-stone-900 border-stone-900 text-stone-50 shadow-sm' 
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
                  }`}
                  id={`btn-enum-filter-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside ledger */}
          <div className="max-w-md mb-8">
            <div className="relative">
              <Search className="w-4.5 h-4.5 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by E-Number or chemical name (e.g. Tartrazine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-800"
                id="input-enum-search"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* E-Number list cards */}
          {filteredENumbers.length === 0 ? (
            <div className="border border-dashed border-stone-200 rounded-2xl py-12 text-center text-stone-500">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-stone-300" />
              <span className="font-semibold block text-sm">No chemical compound matches current query.</span>
              <p className="text-xs font-mono mt-1">Try filtering for "all" or search standard abbreviations like "E102".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredENumbers.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-stone-50 border border-stone-200/85 hover:border-stone-300/90 rounded-2xl p-5 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-sm font-bold text-stone-900 bg-white border border-stone-200 px-2 py-0.5 rounded-lg">
                      {item.code}
                    </span>

                    <div className="flex gap-1.5 items-center">
                      <span className="text-[9px] font-mono bg-stone-100 text-stone-600 border px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                        {item.category}
                      </span>
                      <span className={`text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.risk === 'high' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                        item.risk === 'moderate' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-emerald-50 text-emerald-800 border border-emerald-100'
                      }`}>
                        {item.risk} RISK
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-sm text-stone-900 mb-2">{item.name}</h3>
                  
                  <div className="space-y-3 pt-2.5 border-t border-stone-200/60">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-stone-500 block uppercase tracking-wider">Clinical Observations</span>
                      <p className="text-xs text-stone-600 leading-relaxed mt-0.5">{item.impact}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-stone-500 block uppercase tracking-wider">Global Warnings & bans</span>
                      <p className="text-xs text-stone-500 font-medium italic mt-0.5 leading-relaxed">{item.restrictions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. MEDIAN.CO WRAPPING GUIDE */}
      <section id="median-guide" className="py-20 px-4 bg-stone-900 text-stone-100 border-b border-stone-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-stone-800 text-stone-300 border border-stone-700 rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Smartphone className="w-3.5 h-3.5 text-stone-400" />
              Median.co Hybrid Wrap
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Compile BioLens AI into Native Apps
            </h2>
            <p className="text-stone-400 text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
              When packaging the deployed BioLens AI URL or zip file via <a href="https://median.co" target="_blank" rel="noopener" className="text-emerald-400 underline font-semibold hover:text-emerald-300">Median.co</a> to compile fully native Android or iOS application wrappers, configure these custom parameters:
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="bg-stone-850 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-xl p-3 font-mono font-bold text-sm shrink-0">
                CONFIG 1
              </div>
              <div className="space-y-3 flex-1 text-left">
                <h4 className="font-display font-bold text-lg text-white">Hardware Camera Permissions Setup</h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  The barcode scanner and label ingredients optical character recognition rely on standard WebRTC browser camera APIs. For the wrapper webview to utilize camera capturing, you must activate the native Camera Access option.
                </p>
                <div className="bg-stone-900 rounded-lg p-3 border border-stone-800 font-mono text-[11px] text-stone-400 relative">
                  <button 
                    onClick={() => handleCopy('NSCameraUsageDescription', 'Camera Permission Key')}
                    className="absolute top-2 right-2 text-[9px] bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded"
                  >
                    {copiedText === 'Camera Permission Key' ? 'Copied' : 'Copy Key'}
                  </button>
                  <span className="text-emerald-400 block font-semibold mb-1">// iOS Info.plist Entry Required</span>
                  &lt;key&gt;NSCameraUsageDescription&lt;/key&gt;<br />
                  &lt;string&gt;BioLens AI requires active camera feed access to snap and OCR analyze food packaging ingredients.&lt;/string&gt;
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-stone-850 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-amber-950 text-amber-400 border border-amber-800 rounded-xl p-3 font-mono font-bold text-sm shrink-0">
                CONFIG 2
              </div>
              <div className="space-y-3 flex-1 text-left">
                <h4 className="font-display font-bold text-lg text-white">Native StatusBar Color Matching</h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  To preserve the premium clinical Slate Meadow identity, program the native device status bar to seamlessly transition to our soft off-white canvas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                  <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                    <span className="text-stone-400 block">STATUSBAR DESIGN</span>
                    <span className="text-emerald-400 font-bold">Light Canvas Mode</span>
                  </div>
                  <div className="bg-stone-900 rounded-lg p-3 border border-stone-800">
                    <span className="text-stone-400 block">HEX MATCHING COLOR</span>
                    <span className="text-emerald-400 font-bold">#faf9f6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-stone-850 border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-purple-950 text-purple-400 border border-purple-800 rounded-xl p-3 font-mono font-bold text-sm shrink-0">
                CONFIG 3
              </div>
              <div className="space-y-3 flex-1 text-left">
                <h4 className="font-display font-bold text-lg text-white">DOM Storage Persistence Integration</h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  BioLens AI utilizes native browser <code className="font-mono bg-stone-800 px-1 py-0.5 rounded text-emerald-300">localStorage</code> for diagnostic scans and E-numbers history tracking. Ensure that the Median.co webview configuration allows DOM Storage persistence.
                </p>
                <div className="bg-stone-900 rounded-lg p-3 border border-stone-800 font-mono text-[11px] text-stone-400">
                  <span className="text-purple-400 block font-semibold mb-1">// Android WebView Settings</span>
                  webView.getSettings().setDomStorageEnabled(true);<br />
                  webView.getSettings().setDatabaseEnabled(true);
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. APP DOWNLOAD & INTERACTION PORTAL */}
      <section id="download-app" className="py-20 px-4 bg-gradient-to-b from-stone-100 to-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-stone-800">
            {/* Background design elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-emerald-800/10 filter blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-8 space-y-6 text-left">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-stone-800 border border-stone-750 px-2.5 py-1 rounded-md">
                  GET THE COMPANION
                </span>
                
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                  Ready to Analyze Food Compounds?
                </h3>
                
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Download our official Android client directly to experience the full clinical food toxicology companion on the go. Enjoy offline scanned logs, high-speed camera OCR, barcode scanning and zero telemetry.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a 
                    href="/api/download-apk" 
                    download="biolens-ai-app-release.apk"
                    className="bg-emerald-850 hover:bg-emerald-700 text-stone-50 font-bold text-xs sm:text-sm px-6 py-4 rounded-xl shadow-md shadow-emerald-950/10 transition-all flex items-center gap-2"
                    id="portal-cta-apk"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Android APK</span>
                  </a>

                  <a 
                    href="https://biolens.pages.dev" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 font-bold text-xs sm:text-sm px-5 py-4 rounded-xl transition-all flex items-center gap-2"
                    id="portal-cta-pages"
                  >
                    <span>Open Web Version</span>
                    <ExternalLink className="w-4 h-4 text-stone-400" />
                  </a>
                </div>

                <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    No login required
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    No analytics cookies
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Factual clinical E-ledger
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col justify-center items-center w-full">
                <div className="bg-stone-950/70 p-5 rounded-3xl border border-stone-800 shadow-xl flex flex-col items-center w-full max-w-[280px] mx-auto text-center space-y-4">
                  <div className="w-full flex bg-stone-900 rounded-lg p-0.5 border border-stone-800">
                    <button
                      onClick={() => setQrTab('apk')}
                      className={`flex-1 text-[11px] font-bold py-1.5 px-2 rounded-md transition-all cursor-pointer ${
                        qrTab === 'apk'
                          ? 'bg-emerald-850 text-white shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      APK Link
                    </button>
                    <button
                      onClick={() => setQrTab('web')}
                      className={`flex-1 text-[11px] font-bold py-1.5 px-2 rounded-md transition-all cursor-pointer ${
                        qrTab === 'web'
                          ? 'bg-emerald-850 text-white shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Web App
                    </button>
                  </div>

                  {/* QR Code Container with high contrast and brand overlay */}
                  <div className="bg-white p-3.5 rounded-2xl shadow-inner relative flex items-center justify-center border-4 border-stone-800">
                    <QRCodeSVG
                      value={qrTab === 'apk' ? `${typeof window !== 'undefined' ? window.location.origin : 'https://biolens.pages.dev'}/api/download-apk` : (typeof window !== 'undefined' ? window.location.href : 'https://biolens.pages.dev')}
                      size={144}
                      level="H"
                      includeMargin={false}
                      fgColor="#1c1917" // stone-900
                      bgColor="#ffffff"
                    />
                    <div className="absolute bg-white p-1 rounded-lg shadow-md border border-stone-100 flex items-center justify-center">
                      <CloverLogo size={24} showBackground={false} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-white tracking-tight block">
                      {qrTab === 'apk' ? 'Scan to Download APK' : 'Scan to Launch Web App'}
                    </span>
                    <span className="text-[9px] text-stone-400 font-mono block break-all leading-normal px-2">
                      {qrTab === 'apk' 
                        ? `${typeof window !== 'undefined' ? window.location.host : 'biolens.pages.dev'}/api/download-apk`
                        : `${typeof window !== 'undefined' ? window.location.host : 'biolens.pages.dev'}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CLINICAL FAQ */}
      <section className="py-20 px-4 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-3">
              Answers for Clinical Health Enquirers
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-5 text-left">
              <h4 className="font-display font-semibold text-stone-900 text-sm sm:text-base mb-2">How does BioLens AI evaluate food products?</h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                BioLens processes ingredients strings via advanced language models and direct barcode queries. It analyzes molecular listings to isolate artificial additives, high-risk synthetic esters, and coal-tar dyes, mapping them against clinical restrictions and toxicology findings.
              </p>
            </div>

            <div className="border-b border-stone-200 pb-5 text-left">
              <h4 className="font-display font-semibold text-stone-900 text-sm sm:text-base mb-2">Is the scan data synchronized with remote servers?</h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Absolutely not. All scanned history lists and grading reports persist completely on your device’s sandbox using local web application properties (localStorage). Your cellular health habits are completely confidential.
              </p>
            </div>

            <div className="border-b border-stone-200 pb-5 text-left">
              <h4 className="font-display font-semibold text-stone-900 text-sm sm:text-base mb-2">Why are E-numbers and colors graded with warning symbols?</h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Certain additives, such as Tartrazine (E102) or Allura Red (E129), are coal-tar azo compounds that have been clinically correlated with childhood hyper-activity, respiratory stress, or digestive lining wear. BioLens uses standard global toxicology warning guidelines for clinical transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-16 px-4 mt-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* About ZettaCreations & Main Developer Block */}
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xs flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative shrink-0 flex items-center justify-center">
              <ZettacreationsLogo size={80} showBackground={true} className="shadow-md rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 rounded-full text-stone-700 font-mono text-[9px] uppercase tracking-wider font-bold">
                Engineering & Craftsmanship
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Made by <span className="text-[#026854] font-extrabold">ZettaCreations</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-md">
                Creating high-fidelity, high-performance health and toxicology portals to bring complete clarity to your everyday food wellness.
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-xs">
                <span className="text-stone-500">Main Developer:</span>
                <span className="font-semibold text-stone-900 bg-emerald-50 text-[#026854] px-2.5 py-0.5 rounded-md border border-emerald-100/60 font-sans">
                  Daksh Jawale
                </span>
              </div>
            </div>
          </div>

          <hr className="border-stone-200" />

          {/* Standard Footer Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <CloverLogo size={32} showBackground={false} />
              </div>
              <div>
                <span className="font-display font-bold text-sm tracking-tight text-stone-900 flex items-center gap-3">
                  BioLens AI
                  <span className="inline-flex items-center gap-1.5 bg-stone-900 text-stone-100 text-[9px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-tight">
                    <ZettacreationsLogo size={12} showBackground={false} />
                    <span>by zettacreations</span>
                  </span>
                </span>
                <p className="text-[9px] text-stone-500 font-mono mt-1">© 2026 Clinical Food Integrity Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold">
              <a href="https://world.openfoodfacts.org/" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors">Open Food Facts Database</a>
              <a href="https://biolens.pages.dev" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors">biolens.pages.dev</a>
              <a href="#overview" className="hover:text-stone-900 transition-colors">Integrity Charter</a>
            </div>
          </div>
        </div>
      </footer>

      {/* App Store / Median.co Modal */}
      <AnimatePresence>
        {showMedianModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 relative border border-stone-200 shadow-2xl"
            >
              <button 
                onClick={() => setShowMedianModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-lg transition-colors"
                id="btn-close-modal"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="bg-emerald-800 p-2 rounded-xl text-stone-50">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-stone-900 leading-none">Compile Native Application</h4>
                    <p className="text-[10px] font-mono text-stone-500 mt-1 uppercase tracking-wider">Median.co Setup Instructions</p>
                  </div>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  BioLens AI is built with responsive standard web capabilities that package directly into Android and iOS application wrappers. When initializing on Median.co:
                </p>

                <div className="space-y-3 pt-2">
                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex gap-3 text-left">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-bold text-xs text-stone-900 block">Camera Authorization</span>
                      <p className="text-[11px] text-stone-500 leading-normal mt-0.5">Toggle camera capabilities "On" in your wrapper dashboard to grant native WebRTC media permissions.</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex gap-3 text-left">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-bold text-xs text-stone-900 block">Soft Off-White Theme</span>
                      <p className="text-[11px] text-stone-500 leading-normal mt-0.5">Set Status Bar Background Color to <code className="font-mono bg-stone-200 px-1 rounded font-bold text-stone-800">#faf9f6</code> with dark theme icons.</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex gap-3 text-left">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-bold text-xs text-stone-900 block">Local Cache Enabled</span>
                      <p className="text-[11px] text-stone-500 leading-normal mt-0.5">Maintain persistent scan grades and history by setting DOM storage settings "Enabled" in browser engines.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <a
                    href="https://biolens.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-stone-50 font-bold text-xs py-3 rounded-xl text-center shadow-sm"
                  >
                    Open Live Web App
                  </a>
                  <button
                    onClick={() => setShowMedianModal(false)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs py-3 rounded-xl border border-stone-200 transition-colors"
                  >
                    Close Portal Guide
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
