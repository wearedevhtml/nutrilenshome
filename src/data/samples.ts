import { ProductSample } from '../types';

export const PRODUCT_SAMPLES: ProductSample[] = [
  {
    id: "neon-soda",
    name: "Volt Rush Extreme Soda",
    brand: "GigaCorp Beverages",
    category: "Soft Drink / Carbonated Beverage",
    ingredientsRaw: "Carbonated Water, High Fructose Corn Syrup, Citric Acid, Sodium Benzoate (Preservative), Aspartame (Sweetener), Tartrazine (Yellow 5, Colorant), Caffeine, Natural Citrus Flavors.",
    additivesDetected: ["sodium-benzoate", "aspartame", "tartrazine"],
    score: 12,
    summary: "Extremely low health rating. This carbonated drink combines a high-risk artificial colorant (Tartrazine), synthetic sweetener (Aspartame), and a toxic chemical preservative (Sodium Benzoate). Combining Sodium Benzoate and acidic ingredients (like Citric Acid) creates a high risk of forming trace amounts of carcinogenic Benzene under UV exposure."
  },
  {
    id: "instant-ramen",
    name: "Lava Spice Instant Noodles",
    brand: "NoodleCrafters Ltd.",
    category: "Instant Prepared Meals",
    ingredientsRaw: "Wheat Flour, Palm Oil, Starch, Salt, Monosodium Glutamate, Disodium Inosinate, Carrageenan, Allura Red AC (Colorant), Sodium Carbonate, Dehydrated Chives, Soy Sauce Powder.",
    additivesDetected: ["monosodium-glutamate", "disodium-inosinate", "carrageenan", "allura-red"],
    score: 34,
    summary: "Poor toxicological score. It uses Carrageenan (E407) which is linked to gastrointestinal epithelial inflammation and barrier dysfunction. It also contains synthetic dye Allura Red AC (E129), coupled with intensive flavor enhancing agents MSG (E621) and Disodium Inosinate (E631) which can trigger metabolic responses in sensitive individuals."
  },
  {
    id: "creamy-almond-milk",
    name: "Vanilla Almond Blend",
    brand: "EcoSilk Grocers",
    category: "Plant-Based Dairy Alternative",
    ingredientsRaw: "Almondmilk (Filtered Water, Almonds), Cane Sugar, Carrageenan, Sunflower Lecithin, Potassium Sorbate, Natural Vanilla Flavor, Sea Salt, Vitamin A Palmitate, Vitamin D2.",
    additivesDetected: ["carrageenan", "potassium-sorbate"],
    score: 55,
    summary: "Moderate health rating. While mostly natural almond and vanilla components, the formula utilizes Carrageenan as an emulsifier to prevent lipid separation. Carrageenan is known to trigger low-grade bowel inflammation. Potassium Sorbate is present as a mild preservative and has a highly safe profile."
  },
  {
    id: "organic-protein-bar",
    name: "Pure Seed Greens Bar",
    brand: "Therapeutic Botanicals",
    category: "Nutrition & Protein Bars",
    ingredientsRaw: "Organic Pumpkin Seeds, Organic Dates, Pea Protein Isolate, Organic Spirulina, Xanthan Gum, Organic Vanilla Extract, Sea Salt.",
    additivesDetected: ["xanthan-gum"],
    score: 92,
    summary: "Exceptional clinical-grade profile. This nutrition bar is free of artificial colors, preservatives, and high-risk stabilizers. It contains only Xanthan Gum (E415) as a natural thickener and binder, which has an excellent safety record and acts as a beneficial prebiotic dietary fiber."
  }
];
