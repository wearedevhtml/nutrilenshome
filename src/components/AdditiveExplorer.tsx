import React, { useState, useMemo } from 'react';
import { ADDITIVES } from '../data/additives';
import { Additive } from '../types';
import { Search, Filter, ShieldAlert, Check, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';

export default function AdditiveExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('sodium-benzoate'); // Default expand Sodium Benzoate

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'preservative', label: 'Preservatives' },
    { value: 'colorant', label: 'Food Colorants' },
    { value: 'stabilizer', label: 'Stabilizers & Thickeners' },
    { value: 'sweetener', label: 'Synthetic Sweeteners' },
    { value: 'flavor_enhancer', label: 'Flavor Enhancers' }
  ];

  const risks = [
    { value: 'all', label: 'All Risk Ratings' },
    { value: 'safe', label: 'Safe (Bio-Friendly)' },
    { value: 'caution', label: 'Caution (Moderate)' },
    { value: 'danger', label: 'Danger (High-Risk)' }
  ];

  // Filter additives based on user input
  const filteredAdditives = useMemo(() => {
    return ADDITIVES.filter(add => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        add.name.toLowerCase().includes(query) || 
        add.eNumber.toLowerCase().includes(query) ||
        add.description.toLowerCase().includes(query);
      
      const matchesCategory = selectedCategory === 'all' || add.category === selectedCategory;
      const matchesRisk = selectedRisk === 'all' || add.risk === selectedRisk;

      return matchesSearch && matchesCategory && matchesRisk;
    });
  }, [searchQuery, selectedCategory, selectedRisk]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="additives" className="py-20 md:py-28 bg-white border-t border-emerald-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center pb-12 md:pb-16">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest mb-4">
            Medical Ingredient Mapping
          </span>
          <h2 className="font-sans text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            National Food Additive Database
          </h2>
          <p className="mt-4 font-sans text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Empower your consumer decisions with scientific toxicology tracking. Browse, search, and verify clinical profiles of emulsifying agents, synthetic preservatives, and colors.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row gap-4 items-center">
          
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Chemical Name, E-number, or Category... (e.g., E211, Carrageenan)"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 font-sans text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/50"
              id="database-search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="relative w-full md:w-56">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-sans text-sm text-slate-700 focus:border-emerald-500 focus:outline-hidden"
              id="category-select"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <Filter className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Risk Filter */}
          <div className="relative w-full md:w-56">
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-sans text-sm text-slate-700 focus:border-emerald-500 focus:outline-hidden"
              id="risk-select"
            >
              {risks.map((risk) => (
                <option key={risk.value} value={risk.value}>{risk.label}</option>
              ))}
            </select>
            <ShieldAlert className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

        </div>

        {/* Database List Layout */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-100/40 divide-y divide-slate-100 overflow-hidden">
          {filteredAdditives.length === 0 ? (
            <div className="py-16 text-center">
              <Info className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="font-sans text-base font-bold text-slate-800 mt-2">No Additives Found</h3>
              <p className="font-sans text-sm text-slate-400 mt-1">
                Try refining your search text or updating your filter selections.
              </p>
            </div>
          ) : (
            filteredAdditives.map((additive) => {
              const isExpanded = expandedId === additive.id;
              
              // Define risk colors
              const riskStyles = {
                danger: {
                  bg: 'bg-red-50 text-red-700 border-red-200/50',
                  badge: 'bg-red-500 text-white',
                  border: 'border-l-red-500 border-l-4'
                },
                caution: {
                  bg: 'bg-amber-50 text-amber-700 border-amber-200/50',
                  badge: 'bg-amber-500 text-white',
                  border: 'border-l-amber-500 border-l-4'
                },
                safe: {
                  bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
                  badge: 'bg-emerald-500 text-white',
                  border: 'border-l-emerald-500 border-l-4'
                }
              };

              const currentRisk = riskStyles[additive.risk];

              return (
                <div
                  key={additive.id}
                  className={`transition-all duration-200 hover:bg-slate-50/40 ${currentRisk.border} ${
                    isExpanded ? 'bg-slate-50/20' : ''
                  }`}
                  id={`database-item-${additive.id}`}
                >
                  {/* Clickable Header bar */}
                  <div
                    onClick={() => toggleExpand(additive.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      {/* E-Number Indicator */}
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold border ${currentRisk.bg}`}>
                        {additive.eNumber}
                      </div>
                      
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-sans text-sm font-black uppercase tracking-wider text-slate-800">{additive.name}</h3>
                          <span className="rounded-xs bg-slate-100 px-2 py-0.5 font-mono text-[8px] font-bold tracking-wider uppercase text-slate-500">
                            {additive.category.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-slate-500 mt-1 line-clamp-1">{additive.description}</p>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 flex items-center justify-between sm:space-x-4">
                      <span className={`inline-flex rounded-full px-3 py-1 font-mono text-[9px] font-bold tracking-wider uppercase ${currentRisk.bg} border`}>
                        {additive.risk}
                      </span>
                      
                      <button className="text-slate-400 hover:text-slate-600 ml-4 hidden sm:block">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail area */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/20 animate-in slide-in-from-top-1 duration-200">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                        
                        {/* Summary panel */}
                        <div className="lg:col-span-4 space-y-4">
                          <div>
                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Additive Overview</h4>
                            <p className="font-sans text-xs text-slate-600 leading-relaxed">{additive.description}</p>
                          </div>

                          <div>
                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Additive Category</h4>
                            <span className="inline-flex rounded-lg bg-emerald-50 px-3 py-1 font-sans text-xs font-semibold text-emerald-800 border border-emerald-100 capitalize">
                              {additive.category.replace('_', ' ')}
                            </span>
                          </div>
                        </div>

                        {/* Toxicology detailed clinical report */}
                        <div className="lg:col-span-8 space-y-4">
                          
                          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-xs">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertCircle className={`h-4.5 w-4.5 ${
                                additive.risk === 'danger' ? 'text-red-500' :
                                additive.risk === 'caution' ? 'text-amber-500' :
                                'text-emerald-500'
                              }`} />
                              <h4 className="font-sans text-sm font-bold text-slate-900">Clinical Toxicology & Lab Insights</h4>
                            </div>
                            <p className="font-sans text-xs leading-relaxed text-slate-600">{additive.clinicalInsight}</p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">NutriLens Clean-Label Substitutes</h4>
                            <div className="flex flex-wrap gap-2">
                              {additive.alternatives.map((alt, i) => (
                                <span key={i} className="rounded-xl bg-emerald-50 border border-emerald-100/50 px-3 py-1.5 font-sans text-xs font-bold text-emerald-800 shadow-3xs flex items-center space-x-1">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1" />
                                  <span>{alt}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
