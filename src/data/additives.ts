import { Additive } from '../types';

export const ADDITIVES: Additive[] = [
  {
    id: "sodium-benzoate",
    name: "Sodium Benzoate",
    eNumber: "E211",
    category: "preservative",
    risk: "danger",
    description: "A widely used chemical preservative found in acidic beverages, salad dressings, and processed sauces.",
    clinicalInsight: "When combined with Vitamin C (Ascorbic Acid) in liquid solutions, E211 can react to form Benzene, a known class-1 human carcinogen. Pediatric studies have also linked it to hyperactive behavior in children.",
    alternatives: ["Citric Acid", "Ascorbic Acid (Vitamin C)", "Rosemary Extract", "Pasteurization"]
  },
  {
    id: "potassium-sorbate",
    name: "Potassium Sorbate",
    eNumber: "E202",
    category: "preservative",
    risk: "safe",
    description: "The potassium salt of sorbic acid, highly effective at preventing mold and yeast growth in dairy products and baked goods.",
    clinicalInsight: "Generally recognized as safe (GRAS) with excellent toxicology ratings. It is fully metabolized by the human body as a fatty acid. Rarely causes contact dermatitis in sensitive individuals.",
    alternatives: ["None needed (highly safe stabilizer)"]
  },
  {
    id: "butylated-hydroxyanisole",
    name: "Butylated Hydroxyanisole (BHA)",
    eNumber: "E320",
    category: "preservative",
    risk: "danger",
    description: "A synthetic antioxidant used to prevent rancidity and oxidation in fats, vegetable oils, and snack food packaging.",
    clinicalInsight: "Classified by the WHO International Agency for Research on Cancer (IARC) as 'possibly carcinogenic to humans' (Group 2B). It is suspected of being an endocrine disruptor that interferes with hormone synthesis.",
    alternatives: ["Tocopherols (Vitamin E)", "Rosemary Extract", "Nitrogen flushing of packaging"]
  },
  {
    id: "tartrazine",
    name: "Tartrazine (Yellow 5)",
    eNumber: "E102",
    category: "colorant",
    risk: "danger",
    description: "A synthetic lemon yellow azo dye widely utilized in confections, soft drinks, and packaged snacks.",
    clinicalInsight: "Associated with severe allergic reactions, particularly in individuals with aspirin sensitivity. Linked with ADHD-like hyperactive behavior in children. Banned or heavily restricted in Norway and Austria.",
    alternatives: ["Beta-Carotene", "Turmeric Extract", "Annatto", "Safflower Extract"]
  },
  {
    id: "allura-red",
    name: "Allura Red AC (Red 40)",
    eNumber: "E129",
    category: "colorant",
    risk: "caution",
    description: "A synthetic dark red coal-tar dye used in sweets, beverages, dairy products, and cosmetics.",
    clinicalInsight: "May contain trace amounts of p-Cresidine, a known animal carcinogen. Linked in some clinical trials to hyperactive behavior in sensitive children and localized gut inflammation.",
    alternatives: ["Beetroot Juice", "Elderberry Extract", "Lycopene", "Anthocyanins (from red cabbage)"]
  },
  {
    id: "titanium-dioxide",
    name: "Titanium Dioxide",
    eNumber: "E171",
    category: "colorant",
    risk: "danger",
    description: "An inorganic chemical used to impart a brilliant white color or opacity to candies, gum, and white sauces.",
    clinicalInsight: "Formally declared 'no longer safe for use as a food additive' by the European Food Safety Authority (EFSA) in 2021. Research indicates nanoparticle ingestion can cause DNA damage and systemic genotoxicity.",
    alternatives: ["Calcium Carbonate", "Rice Starch"]
  },
  {
    id: "carrageenan",
    name: "Carrageenan",
    eNumber: "E407",
    category: "stabilizer",
    risk: "danger",
    description: "A natural hydrocolloid extracted from red seaweeds, used as a thickener, gelling agent, and emulsifier in dairy and plant-based milks.",
    clinicalInsight: "Multiple gastroenterology studies have shown that degraded carrageenan (poligeenan) and standard food-grade carrageenan can trigger robust gut inflammation, ulcerations, and IBS-like epithelial damage.",
    alternatives: ["Guar Gum", "Locust Bean Gum", "Gellan Gum", "Pectin"]
  },
  {
    id: "xanthan-gum",
    name: "Xanthan Gum",
    eNumber: "E415",
    category: "stabilizer",
    risk: "safe",
    description: "A popular polysaccharide produced through the fermentation of glucose by the bacterium Xanthomonas campestris.",
    clinicalInsight: "Highly safe and non-toxic for most individuals. Acts as a highly effective soluble fiber. In rare, high-dose cases, it may cause minor bloating or digestive gas.",
    alternatives: ["None needed (highly safe natural stabilizer)"]
  },
  {
    id: "polysorbate-80",
    name: "Polysorbate 80",
    eNumber: "E433",
    category: "stabilizer",
    risk: "caution",
    description: "A synthetic non-ionic surfactant and emulsifier used to stabilize ice creams, whipped toppings, and liquid supplements.",
    clinicalInsight: "Studies published in Nature indicate E433 can degrade the intestinal mucosal barrier, promoting low-grade chronic bowel inflammation, metabolic syndrome, and altering gut microbiota composition.",
    alternatives: ["Sunflower Lecithin", "Egg Yolk Lecithin", "Gum Arabic"]
  },
  {
    id: "aspartame",
    name: "Aspartame",
    eNumber: "E951",
    category: "sweetener",
    risk: "danger",
    description: "An artificial non-saccharide sweetener used in 'diet' beverages, sugar-free gums, and weight-loss foods.",
    clinicalInsight: "IARC classified Aspartame as 'possibly carcinogenic to humans' (Group 2B) in 2023. It metabolizes into aspartic acid, phenylalanine, and trace toxic methanol in the liver.",
    alternatives: ["Stevia Leaf Extract", "Monk Fruit Extract", "Erythritol", "Allulose"]
  },
  {
    id: "sucralose",
    name: "Sucralose",
    eNumber: "E955",
    category: "sweetener",
    risk: "caution",
    description: "A synthetic organochlorine sweetener produced by chlorinating sucrose. Highly stable under heat.",
    clinicalInsight: "Recent clinical studies suggest Sucralose can damage gut microbiome biodiversity, reduce insulin sensitivity over time, and release toxic chlorinated compounds if heated during cooking.",
    alternatives: ["Stevia", "Monk Fruit", "Erythritol"]
  },
  {
    id: "monosodium-glutamate",
    name: "Monosodium Glutamate (MSG)",
    eNumber: "E621",
    category: "flavor_enhancer",
    risk: "caution",
    description: "The sodium salt of glutamic acid, designed to elicit a highly savory 'umami' flavor profile in savory snacks and instant foods.",
    clinicalInsight: "Safe for the general population at moderate levels. However, highly sensitive individuals can experience 'MSG Symptom Complex' featuring transient headaches, facial flushing, and mild numbness.",
    alternatives: ["Yeast Extract", "Shiitake Mushroom Powder", "Hydrolyzed Vegetable Protein", "Sea Salt"]
  },
  {
    id: "disodium-inosinate",
    name: "Disodium Inosinate",
    eNumber: "E631",
    category: "flavor_enhancer",
    risk: "safe",
    description: "A food additive often paired with MSG to synergistically multiply savory taste profiles in snack chips and dried soups.",
    clinicalInsight: "An organic compound derived from meat, fish, or starch. Safe with no toxicological concerns, although individuals suffering from gout or kidney stones should minimize intake due to purine metabolization.",
    alternatives: ["Brewer's Yeast", "Natural spices", "Garlic and Onion extracts"]
  }
];
