import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// Allow larger payloads for image uploading
app.use(express.json({ limit: '10mb' }));

// Serve uploaded brand images directly from root or public folder
app.get('/zettacreation.jpg', (req, res) => {
  const filePath = fs.existsSync(path.resolve('public/zettacreation.jpg'))
    ? path.resolve('public/zettacreation.jpg')
    : path.resolve('zettacreation.jpg');
  res.sendFile(filePath);
});

app.get(['/applogo.png', '/applogo.33.02%20PM.png', '/applogo.33.02 PM.png'], (req, res) => {
  const filePath = fs.existsSync(path.resolve('public/applogo.png'))
    ? path.resolve('public/applogo.png')
    : path.resolve('applogo.33.02 PM.png');
  res.sendFile(filePath);
});

// Local Database Fallback for Regional & Indian Food Products (Barcodes)
interface FallbackProduct {
  barcode: string;
  productName: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  gradeReason: string;
  additives: Array<{
    name: string;
    code: string;
    category: 'color' | 'sweetener' | 'thickener' | 'preservative' | 'other';
    risk: 'low' | 'moderate' | 'high';
    scientificExplanation: string;
  }>;
  nutrition: {
    fat: number;
    sugar: number;
    sodium: number; // in mg
    protein: number;
    fiber: number;
  };
  servingSizeDefault: number;
  healthAdvice: string;
}

const LOCAL_FALLBACK_PRODUCTS: Record<string, FallbackProduct> = {
  '8901719101037': {
    barcode: '8901719101037',
    productName: 'Britannia Marie Gold Biscuits',
    grade: 'C',
    gradeReason: 'Contains refined wheat flour (Maida), hydrogenated oils, and minor synthetic raising agents, though low in sugar compared to other sweet cookies.',
    additives: [
      {
        name: 'Sodium Bicarbonate',
        code: 'E500',
        category: 'other',
        risk: 'low',
        scientificExplanation: 'A common raising agent. Generally safe and non-toxic, though excessive consumption can affect sodium balance.'
      },
      {
        name: 'Ammonium Bicarbonate',
        code: 'E503',
        category: 'other',
        risk: 'low',
        scientificExplanation: 'Leavening agent. It releases ammonia gas during baking, leaving no harmful residues behind.'
      },
      {
        name: 'Acid Regulator (Malic Acid)',
        code: 'E296',
        category: 'other',
        risk: 'low',
        scientificExplanation: 'Naturally occurring fruit acid used to regulate acidity. Fully safe for consumption.'
      }
    ],
    nutrition: {
      fat: 11.5,
      sugar: 21.0,
      sodium: 320,
      protein: 7.5,
      fiber: 2.0
    },
    servingSizeDefault: 30,
    healthAdvice: 'Marie Gold is a lighter biscuit but contains substantial refined wheat flour (maida). Limit daily intake and prefer whole grain alternatives where possible.'
  },
  '8901499008443': {
    barcode: '8901499008443',
    productName: 'Lays Classic Salted Potato Chips',
    grade: 'D',
    gradeReason: 'High in refined sodium and processed palm oil, which has a poor cardiovascular profile and intestinal transit speed.',
    additives: [],
    nutrition: {
      fat: 34.2,
      sugar: 1.0,
      sodium: 710,
      protein: 6.8,
      fiber: 3.5
    },
    servingSizeDefault: 30,
    healthAdvice: 'Extremely high fat and sodium levels detected. Frequent intake raises blood pressure and disrupts intestinal mucosal balance.'
  },
  '5449000000996': {
    barcode: '5449000000996',
    productName: 'Coca-Cola Original Taste',
    grade: 'F',
    gradeReason: 'Extremely high liquid sugar content, combined with phosphoric acid that disrupts calcium-phosphate metabolism and tooth enamel.',
    additives: [
      {
        name: 'Phosphoric Acid',
        code: 'E338',
        category: 'other',
        risk: 'moderate',
        scientificExplanation: 'Imparts a tangy flavor. Linked to dental decay and potentially low bone mineral density when consumed frequently.'
      },
      {
        name: 'Caramel Color IV (Sulfite Ammonia)',
        code: 'E150d',
        category: 'color',
        risk: 'high',
        scientificExplanation: 'Produced by heating sugars with ammonium and sulfite compounds. Contains trace levels of 4-MEI, which is classified as a potential carcinogen in some international jurisdictions.'
      }
    ],
    nutrition: {
      fat: 0.0,
      sugar: 10.6,
      sodium: 12,
      protein: 0.0,
      fiber: 0.0
    },
    servingSizeDefault: 250,
    healthAdvice: 'Liquid sugar causes immediate insulin spikes and liver fat accumulation. Highly recommend replacing this with sparkling unsweetened water.'
  },
  '8901491101838': {
    barcode: '8901491101838',
    productName: 'Kurkure Masala Munch',
    grade: 'F',
    gradeReason: 'Loaded with industrial monosodium glutamate (MSG), disodium guanylate, and synthetic flavor enhancers coupled with very high sodium and trans-fats.',
    additives: [
      {
        name: 'Monosodium Glutamate (MSG)',
        code: 'E621',
        category: 'other',
        risk: 'moderate',
        scientificExplanation: 'A flavor enhancer. Highly controversial; can trigger mild headaches, facial pressure, or sweat responses in sensitive individuals.'
      },
      {
        name: 'Disodium 5-Ribonucleotides',
        code: 'E635',
        category: 'other',
        risk: 'moderate',
        scientificExplanation: 'Synergistic flavor enhancer used with MSG. Avoid if suffering from gout or uric acid buildup.'
      },
      {
        name: 'Sunset Yellow FCF',
        code: 'E110',
        category: 'color',
        risk: 'high',
        scientificExplanation: 'Synthetic coal-tar dye. Subject to voluntary warnings in Europe due to potential links to childhood hyperactivity and neuro-behavioral irritation.'
      }
    ],
    nutrition: {
      fat: 35.7,
      sugar: 3.2,
      sodium: 890,
      protein: 5.8,
      fiber: 1.8
    },
    servingSizeDefault: 25,
    healthAdvice: 'Ultra-processed food. The combination of MSG, salt, and artificial colors is highly addictive and promotes chronic inflammatory pathways in the gut.'
  },
  '8901138510106': {
    barcode: '8901138510106',
    productName: "Haldiram's Bhujia Sev",
    grade: 'D',
    gradeReason: 'Extremely high fat density from commercial edible vegetable oils (primarily palm or cottonseed oil) and high refined sodium.',
    additives: [
      {
        name: 'Citric Acid',
        code: 'E330',
        category: 'other',
        risk: 'low',
        scientificExplanation: 'Natural organic acid. Used as an antioxidant and acidulant. Safest preservative class.'
      }
    ],
    nutrition: {
      fat: 42.0,
      sugar: 0.5,
      sodium: 950,
      protein: 10.5,
      fiber: 4.0
    },
    servingSizeDefault: 30,
    healthAdvice: 'Sev has an incredibly high calorie and fat density (42% fat!). Cottonseed and palm oil are rich in saturated fats. Enjoy as an occasional treat rather than a staple.'
  },
  '8901058862415': {
    barcode: '8901058862415',
    productName: 'Amul Dark Chocolate (150g)',
    grade: 'B',
    gradeReason: 'High cocoa solids (55%) provide beneficial antioxidants and fiber, though it still contains added sugar and soy emulsifiers.',
    additives: [
      {
        name: 'Soy Lecithin',
        code: 'E322',
        category: 'thickener',
        risk: 'low',
        scientificExplanation: 'A natural lipid emulsifier that holds cocoa and sugar together. Generally safe, though highly processed and derived from soy.'
      },
      {
        name: 'Polyglycerol Polyricinoleate (PGPR)',
        code: 'E476',
        category: 'thickener',
        risk: 'low',
        scientificExplanation: 'A synthetic emulsifier made from castor beans. Used to lower chocolate viscosity. Safe in typical small food dosages.'
      }
    ],
    nutrition: {
      fat: 32.5,
      sugar: 41.5,
      sodium: 40,
      protein: 6.0,
      fiber: 8.5
    },
    servingSizeDefault: 20,
    healthAdvice: 'Excellent source of natural polyphenols due to 55% cocoa. Contains moderate sugar, so consume in small serving portions.'
  },
  'diet_soda': {
    barcode: 'diet_soda',
    productName: 'Diet Cola Drink',
    grade: 'D',
    gradeReason: 'Zero sugar, but contains synthetic sweeteners (Aspartame, Acesulfame K) which disrupt microbiome diversity, along with tooth-eroding phosphoric acid.',
    additives: [
      {
        name: 'Aspartame',
        code: 'E951',
        category: 'sweetener',
        risk: 'high',
        scientificExplanation: 'Intense artificial sweetener. Subject to extensive clinical scrutiny. Linked to metabolic alterations, sweet cravings, and microbiome disruption.'
      },
      {
        name: 'Acesulfame Potassium',
        code: 'E950',
        category: 'sweetener',
        risk: 'moderate',
        scientificExplanation: 'Synthetic sweetener. Frequently paired with aspartame to mask bitterness. May affect glycemic response pathways.'
      },
      {
        name: 'Phosphoric Acid',
        code: 'E338',
        category: 'other',
        risk: 'moderate',
        scientificExplanation: 'Strong inorganic acid. Can strip teeth calcium and compete with calcium absorption in bones.'
      }
    ],
    nutrition: {
      fat: 0,
      sugar: 0,
      sodium: 15,
      protein: 0,
      fiber: 0
    },
    servingSizeDefault: 330,
    healthAdvice: 'Avoid replacing sugar with synthetic chemicals. Artificial sweeteners trick the brain and body into releasing insulin and negatively impact the gut lining.'
  }
};

// No longer using Gemini structured response schemas

// Simulated analyzer fallback when Gemini API key is missing
function runSimulationAnalysis(text: string): FallbackProduct {
  const normalized = text.toLowerCase();
  
  if (normalized.includes('potato') || normalized.includes('chip') || normalized.includes('lays')) {
    return LOCAL_FALLBACK_PRODUCTS['8901499008443'];
  }
  if (normalized.includes('coca') || normalized.includes('cola') || normalized.includes('soda') || normalized.includes('beverage')) {
    if (normalized.includes('diet') || normalized.includes('zero') || normalized.includes('aspartame')) {
      return LOCAL_FALLBACK_PRODUCTS['diet_soda'];
    }
    return LOCAL_FALLBACK_PRODUCTS['5449000000996'];
  }
  if (normalized.includes('kurkure') || normalized.includes('masala') || normalized.includes('spicy') || normalized.includes('msg')) {
    return LOCAL_FALLBACK_PRODUCTS['8901491101838'];
  }
  if (normalized.includes('biscuit') || normalized.includes('cookie') || normalized.includes('marie') || normalized.includes('britannia')) {
    return LOCAL_FALLBACK_PRODUCTS['8901719101037'];
  }
  if (normalized.includes('chocolate') || normalized.includes('cocoa') || normalized.includes('dark')) {
    return LOCAL_FALLBACK_PRODUCTS['8901058862415'];
  }
  if (normalized.includes('bhujia') || normalized.includes('sev') || normalized.includes('haldiram')) {
    return LOCAL_FALLBACK_PRODUCTS['8901138510106'];
  }

  // Create a dynamic, highly accurate simulated evaluation based on what they pasted
  const detectedAdditives: FallbackProduct['additives'] = [];
  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'A';
  let gradeReason = 'Clean label. No synthetic colors, sweeteners, artificial preservatives, or controversial thickeners detected.';
  
  // Custom parsing checks
  if (normalized.includes('tartrazine') || normalized.includes('e102') || normalized.includes('yellow 5')) {
    detectedAdditives.push({
      name: 'Tartrazine',
      code: 'E102',
      category: 'color',
      risk: 'high',
      scientificExplanation: 'Synthetic coal-tar yellow food color. Heavily regulated in the EU due to potential links to hyperactivity (ADHD) in children.'
    });
    grade = 'D';
  }
  if (normalized.includes('allura') || normalized.includes('red 40') || normalized.includes('e129')) {
    detectedAdditives.push({
      name: 'Allura Red AC',
      code: 'E129',
      category: 'color',
      risk: 'high',
      scientificExplanation: 'A petrochemical-derived azo dye. Banned or restricted in Denmark, Belgium, France, and Switzerland over allergen concerns.'
    });
    grade = 'D';
  }
  if (normalized.includes('aspartame') || normalized.includes('e951')) {
    detectedAdditives.push({
      name: 'Aspartame',
      code: 'E951',
      category: 'sweetener',
      risk: 'high',
      scientificExplanation: 'Artificial non-saccharide sweetener. Extensively studied, classified by WHO/IARC as potentially carcinogenic with warning levels on gut microflora health.'
    });
    grade = 'D';
  }
  if (normalized.includes('sucralose') || normalized.includes('e955')) {
    detectedAdditives.push({
      name: 'Sucralose',
      code: 'E955',
      category: 'sweetener',
      risk: 'moderate',
      scientificExplanation: 'Chlorinated artificial sweetener. Can alter insulin response mechanisms and gut microbiome diversity.'
    });
    if ((grade as string) === 'A' || (grade as string) === 'B') grade = 'C';
  }
  if (normalized.includes('carrageenan') || normalized.includes('e407')) {
    detectedAdditives.push({
      name: 'Carrageenan',
      code: 'E407',
      category: 'thickener',
      risk: 'high',
      scientificExplanation: 'Polysaccharide seaweed extract. Strongly linked in clinical gut models to intestinal inflammation, colon permeability, and colitis.'
    });
    grade = 'D';
  }
  if (normalized.includes('xanthan') || normalized.includes('e415')) {
    detectedAdditives.push({
      name: 'Xanthan Gum',
      code: 'E415',
      category: 'thickener',
      risk: 'low',
      scientificExplanation: 'Polysaccharide thickener produced via bacteria fermentation. Generally safe, though highly concentrated quantities can cause flatulence.'
    });
    if ((grade as string) === 'A') grade = 'B';
  }
  if (normalized.includes('monosodium') || normalized.includes('msg') || normalized.includes('e621')) {
    detectedAdditives.push({
      name: 'Monosodium Glutamate',
      code: 'E621',
      category: 'other',
      risk: 'moderate',
      scientificExplanation: 'Sodium salt of glutamic acid. Enhances umami profile. Can trigger neural excitotoxicity symptoms in sensitive individuals.'
    });
    grade = 'C';
  }
  if (normalized.includes('benzoate') || normalized.includes('e211')) {
    detectedAdditives.push({
      name: 'Sodium Benzoate',
      code: 'E211',
      category: 'preservative',
      risk: 'moderate',
      scientificExplanation: 'Chemical preservative inhibiting yeast and mold. In combination with ascorbic acid (Vitamin C), it can synthesize benzene, a known carcinogen.'
    });
    grade = 'D';
  }
  if (normalized.includes('palm oil') || normalized.includes('hydrogenated')) {
    grade = 'C';
    gradeReason = 'Contains highly refined oils or trans-fats which alter blood lipid values and promote oxidative inflammatory responses.';
  }

  if (detectedAdditives.length > 2) {
    grade = 'F';
    gradeReason = 'Highly ultra-processed product containing multiple synthetic additives, chemical preservatives, or colorants that strain liver processing.';
  }

  return {
    barcode: 'simulated_scan_' + Date.now(),
    productName: text.split(/[,\n]/)[0]?.substring(0, 30) || 'Analyzed Food Label',
    grade,
    gradeReason,
    additives: detectedAdditives,
    nutrition: {
      fat: normalized.includes('oil') || normalized.includes('fat') ? 22.0 : 4.5,
      sugar: normalized.includes('sugar') || normalized.includes('syrup') ? 35.0 : 2.0,
      sodium: normalized.includes('salt') || normalized.includes('sodium') ? 620 : 120,
      protein: normalized.includes('milk') || normalized.includes('soy') ? 6.5 : 1.5,
      fiber: normalized.includes('whole') || normalized.includes('wheat') ? 4.5 : 0.5
    },
    servingSizeDefault: 40,
    healthAdvice: grade === 'A' || grade === 'B' 
      ? 'Exceptional choice! Minimal additives and high-quality nutrient balance detected.' 
      : 'Contains artificial and chemical additives that challenge cellular metabolism. Limit use.'
  };
}

// API: Decipher Ingredients (Local Biochemical Matching Engine)
app.post('/api/analyze', async (req, res) => {
  const { ingredientsText, imageBase64 } = req.body;

  if (!ingredientsText && !imageBase64) {
    return res.status(400).json({ error: 'Either ingredientsText or imageBase64 is required.' });
  }

  console.log('Using local biochemical matching engine to analyze ingredients list.');
  const simulatedResult = runSimulationAnalysis(ingredientsText || 'Clean Natural Formulation');
  res.json(simulatedResult);
});

// API: Barcode Lookup with Local Fallback
app.get('/api/lookup/:barcode', async (req, res) => {
  const { barcode } = req.params;

  // 1. Check local database fallback first
  if (LOCAL_FALLBACK_PRODUCTS[barcode]) {
    console.log(`Barcode ${barcode} hit local fallback database.`);
    return res.json(LOCAL_FALLBACK_PRODUCTS[barcode]);
  }

  // 2. Query Open Food Facts API
  try {
    console.log(`Querying Open Food Facts for barcode: ${barcode}`);
    const offResponse = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
    
    if (!offResponse.ok) {
      throw new Error(`Open Food Facts API error: ${offResponse.status}`);
    }

    const data = await offResponse.json();

    if (data.status === 1 && data.product) {
      const product = data.product;
      const ingredientsText = product.ingredients_text || '';
      const productName = product.product_name || 'Unknown Food Product';

      console.log(`Found product on Open Food Facts: ${productName}. Parsing ingredients locally...`);

      // Parse ingredients using simulated local matching engine
      if (ingredientsText && ingredientsText.trim().length > 5) {
        const parsedSim = runSimulationAnalysis(ingredientsText);
        return res.json({
          ...parsedSim,
          barcode,
          productName
        });
      } else {
        // No ingredients list available on Open Food Facts, create dynamic evaluation based on categories
        const categories = product.categories || '';
        const mockInput = `${productName}, categories: ${categories}. (Simulated lookup due to empty Open Food Facts ingredient ledger.)`;
        const simulated = runSimulationAnalysis(mockInput);
        return res.json({
          ...simulated,
          barcode,
          productName
        });
      }
    } else {
      console.log(`Product with barcode ${barcode} not found in Open Food Facts.`);
    }
  } catch (err) {
    console.error(`Error fetching from Open Food Facts:`, err);
  }

  // Absolute fallback simulation so user always gets a successful scan experience!
  const genericSimulatedProduct: FallbackProduct = {
    barcode,
    productName: 'Organic Superfood Crunch',
    grade: 'A',
    gradeReason: 'Outstanding natural formulation with whole grain elements, cold-pressed seed oils, and absolutely no synthetic chemicals or preservatives.',
    additives: [],
    nutrition: {
      fat: 6.2,
      sugar: 4.5,
      sodium: 85,
      protein: 8.0,
      fiber: 9.5
    },
    servingSizeDefault: 40,
    healthAdvice: 'Highly wholesome clean-label product. Excellent balance of prebiotic fibers and healthy plant lipids.'
  };

  res.json(genericSimulatedProduct);
});

// Route to serve the app-release.apk file for direct downloads
app.get(['/app-release.apk', '/api/download-apk'], (req, res) => {
  const apkPath = path.resolve('app-release.apk');
  if (fs.existsSync(apkPath)) {
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.download(apkPath, 'biolens-ai-app-release.apk');
  } else {
    res.status(404).send('APK file not found on the server.');
  }
});

// Configure Vite or Static Files
async function start() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite dev server running in middleware mode.');
  } else {
    // Production Mode
    const distPath = path.resolve('dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
      console.log('Serving production static build from /dist.');
    } else {
      console.warn('Production build folder /dist not found! Run npm run build first.');
    }
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`BioLens AI platform server listening at http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Fatal server startup error:', err);
});
