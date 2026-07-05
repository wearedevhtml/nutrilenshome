import React, { useState, useEffect } from 'react';
import { ADDITIVES } from '../data/additives';
import { Additive } from '../types';
import { Search, RotateCcw, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Activity, HelpCircle } from 'lucide-react';

const PRESETS = [
  {
    name: 'Toxic Sweet Soda Formula',
    description: 'Typical sugar-free diet soda containing multiple intensive sweetening agents.',
    ingredients: 'Carbonated water, Citric Acid, Aspartame, Acesulfame Potassium, Sodium Benzoate, Natural Cola Flavor, Caramel Color E150d.'
  },
  {
    name: 'Processed Quick Instant Ramen',
    description: 'High sodium spice noodle bowl with chemical stabilizers and color preservation.',
    ingredients: 'Enriched Flour, Palm Oil, MSG (Monosodium Glutamate), Carrageenan Thickener, Allura Red (Colorant), Potassium Sorbate, Disodium Inosinate.'
  },
  {
    name: 'Commercial Almond Dairy-Free',
    description: 'Packaged plant milk using industrial thickeners to stabilize fat emulsion.',
    ingredients: 'Water, Raw Almonds, Carrageenan, Sunflower Lecithin, Xanthan Gum, Gellan Gum, Organic Sea Salt.'
  },
  {
    name: 'Organic Whole Food Bar',
    description: 'Whole foods recipe without any chemical stabilizers or synthetic additives.',
    ingredients: 'Organic Rolled Oats, Raw Honey, Peanut Butter, Chia Seeds, Crushed Almonds, Natural Vanilla Seed Extract.'
  }
];

export default function ScanDemo() {
  const [ingredientsText, setIngredientsText] = useState(PRESETS[0].ingredients);
  const [detectedAdditives, setDetectedAdditives] = useState<Additive[]>([]);
  const [score, setScore] = useState(100);
  const [selectedAdditive, setSelectedAdditive] = useState<Additive | null>(null);

  // Parse ingredients and calculate score
  useEffect(() => {
    const textLower = ingredientsText.toLowerCase();
    const found: Additive[] = [];

    ADDITIVES.forEach(add => {
      const nameMatch = textLower.includes(add.name.toLowerCase());
      const eMatch = textLower.includes(add.eNumber.toLowerCase());
      // Check for partial common terms if applicable (e.g. "yellow 5" for tartrazine, "red 40" for allura red)
      let aliasMatch = false;
      if (add.id === 'tartrazine' && (textLower.includes('yellow 5') || textLower.includes('yellow5'))) aliasMatch = true;
      if (add.id === 'allura-red' && (textLower.includes('red 40') || textLower.includes('red40'))) aliasMatch = true;
      if (add.id === 'monosodium-glutamate' && textLower.includes('msg')) aliasMatch = true;

      if (nameMatch || eMatch || aliasMatch) {
        found.push(add);
      }
    });

    setDetectedAdditives(found);

    // Calculate score dynamically
    let calculatedScore = 100;
    found.forEach(add => {
      if (add.risk === 'danger') {
        calculatedScore -= 28;
      } else if (add.risk === 'caution') {
        calculatedScore -= 14;
      } else {
        calculatedScore -= 4; // safe but present additives
      }
    });

    // Clamp score
    const finalScore = Math.max(0, Math.min(100, calculatedScore));
    setScore(finalScore);

    // Default select first detected additive for explanation, or null
    if (found.length > 0) {
      setSelectedAdditive(found[0]);
    } else {
      setSelectedAdditive(null);
    }
  }, [ingredientsText]);

  const loadPreset = (presetText: string) => {
    setIngredientsText(presetText);
  };

  const resetSandbox = () => {
    setIngredientsText('');
  };

  return (
    <section id="demo" className="border-t border-emerald-100 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center pb-12 md:pb-16">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
            Laboratory Sandbox
          </span>
          <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Interactive Ingredient Analyzer
          </h2>
          <p className="mt-4 font-sans text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Test NutriLens AI’s clinical evaluation algorithms. Paste raw ingredient lists or select one of the common grocery formulations below to analyze stabilizers, chemical preservatives, and toxicology ratings instantly.
          </p>
        </div>

        {/* The Sandbox Dashboard Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Input Section (Left panel) */}
            <div className="p-6 sm:p-8 lg:col-span-6 flex flex-col space-y-6">
              <div>
                <h3 className="font-sans text-sm font-black uppercase tracking-wider text-slate-800 flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  <span>1. Ingredient Matrix Input</span>
                </h3>
                <p className="font-sans text-xs text-slate-400 mt-1">
                  Type chemical compounds or select a pre-populated consumer product preset below.
                </p>
              </div>

              {/* Preset Selector Grid */}
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset.ingredients)}
                    className={`text-left rounded-lg p-3 border transition-all duration-150 cursor-pointer ${
                      ingredientsText === preset.ingredients
                        ? 'border-emerald-500 bg-emerald-50/30'
                        : 'border-slate-200/60 hover:border-slate-300 bg-slate-50/20'
                    }`}
                    id={`preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <p className="font-sans text-[11px] font-bold text-slate-800 truncate uppercase tracking-wider">{preset.name}</p>
                    <p className="font-sans text-[9px] text-slate-400 line-clamp-1 mt-0.5">{preset.description}</p>
                  </button>
                ))}
              </div>

              {/* Input Text Area */}
              <div className="relative flex-1 min-h-[160px] flex flex-col">
                <textarea
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  placeholder="Paste product ingredient labels here... (e.g. Water, Citric Acid, Aspartame, Carrageenan, Tartrazine)"
                  className="w-full flex-1 rounded-xl border border-slate-200 bg-slate-50/30 p-4 font-mono text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500/50 resize-y"
                  id="sandbox-textarea"
                />
                
                {ingredientsText && (
                  <button
                    onClick={resetSandbox}
                    className="absolute bottom-3 right-3 rounded-md bg-white border border-slate-200 p-1.5 text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-2xs transition-colors cursor-pointer"
                    title="Clear Sandbox"
                    id="sandbox-clear-btn"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Instructions and help */}
              <div className="rounded-lg bg-emerald-50/30 border border-emerald-100 p-3 flex items-start space-x-2.5">
                <HelpCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="font-sans text-[10px] leading-relaxed text-slate-600">
                  <span className="font-bold text-emerald-700">Dynamic OCR Simulator:</span> The parsing engine runs completely in-browser. Try adding chemical stabilizers like <span className="underline font-mono">Carrageenan</span> or synthetic sweeteners like <span className="underline font-mono">Aspartame</span> to watch the Toxicology Score adapt.
                </p>
              </div>
            </div>

            {/* Output Section (Right panel) */}
            <div className="p-6 sm:p-8 lg:col-span-6 bg-slate-50/30 flex flex-col space-y-6">
              
              {/* Score Display Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans text-lg font-bold text-slate-900 flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>2. Evaluated Health Index</span>
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-1">
                    Clinical rating formulated based on additive severity levels.
                  </p>
                </div>

                {/* Score badge with custom background color */}
                <div className={`rounded-xl px-4 py-2 text-center border ${
                  score > 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                  score > 50 ? 'bg-amber-50 border-amber-200 text-amber-700' :
                  'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <p className="font-sans text-2xl font-black">{score}</p>
                  <p className="font-mono text-[8px] uppercase tracking-wider opacity-80">Health Rating</p>
                </div>
              </div>

              {/* Score Indicator Slider */}
              <div className="space-y-1">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      score > 80 ? 'bg-emerald-500' :
                      score > 50 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-slate-400">
                  <span>Critical Risk (0)</span>
                  <span>Moderate (50)</span>
                  <span>Clinical Grade (100)</span>
                </div>
              </div>

              {/* Scanning details / identified list */}
              <div className="flex-1 space-y-3">
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Identified Chemical Compounds ({detectedAdditives.length})
                </p>

                {detectedAdditives.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white py-10 px-4 text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                    <h4 className="font-sans text-sm font-bold text-slate-800 mt-2">Prisitinely Safe Formulation</h4>
                    <p className="font-sans text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      No high-risk chemical stabilizers, food-dyes, or toxic preservatives were flagged in this ingredient matrix.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {detectedAdditives.map((add) => (
                      <button
                        key={add.id}
                        onClick={() => setSelectedAdditive(add)}
                        className={`text-left rounded-xl p-3 border transition-all flex items-start space-x-2.5 cursor-pointer ${
                          selectedAdditive?.id === add.id
                            ? 'border-emerald-500 bg-white shadow-md ring-1 ring-emerald-500/10'
                            : 'border-slate-100 hover:border-slate-300 bg-white hover:shadow-xs'
                        }`}
                        id={`detected-additive-${add.id}`}
                      >
                        <span className={`inline-flex shrink-0 h-5 px-1.5 items-center justify-center rounded-md font-mono text-[9px] font-bold ${
                          add.risk === 'danger' ? 'bg-red-50 text-red-600 border border-red-200/50' :
                          add.risk === 'caution' ? 'bg-amber-50 text-amber-600 border border-amber-200/50' :
                          'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                        }`}>
                          {add.eNumber}
                        </span>
                        <div className="min-w-0">
                          <p className="font-sans text-xs font-bold text-slate-800 truncate">{add.name}</p>
                          <p className="font-sans text-[10px] text-slate-400 capitalize mt-0.5">{add.category.replace('_', ' ')}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic explanations / selected item toxicology review */}
              {selectedAdditive && (
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Toxicology Review Matrix
                    </span>
                    <span className={`inline-flex items-center space-x-1 rounded-full px-2 py-0.5 font-mono text-[8px] font-bold tracking-wider uppercase ${
                      selectedAdditive.risk === 'danger' ? 'bg-red-50 text-red-700 border border-red-200' :
                      selectedAdditive.risk === 'caution' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                      <span>{selectedAdditive.risk} Severity</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-bold text-slate-900">{selectedAdditive.name} ({selectedAdditive.eNumber})</h4>
                    <p className="font-sans text-xs text-slate-500 mt-0.5">{selectedAdditive.description}</p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-100">
                    <h5 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Clinical Insight</h5>
                    <p className="font-sans text-xs leading-normal text-slate-600">{selectedAdditive.clinicalInsight}</p>
                  </div>

                  <div>
                    <h5 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Recommended Clinical Alternatives</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAdditive.alternatives.map((alt, i) => (
                        <span key={i} className="rounded-md bg-emerald-50/50 border border-emerald-100 px-2 py-0.5 font-sans text-[10px] font-semibold text-emerald-800">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
