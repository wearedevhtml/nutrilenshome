export interface Additive {
  id: string;
  name: string;
  eNumber: string;
  category: 'preservative' | 'colorant' | 'stabilizer' | 'sweetener' | 'flavor_enhancer';
  risk: 'safe' | 'caution' | 'danger';
  description: string;
  clinicalInsight: string;
  alternatives: string[];
}

export interface ProductSample {
  id: string;
  name: string;
  brand: string;
  category: string;
  ingredientsRaw: string;
  additivesDetected: string[]; // references Additive.id
  score: number; // 0-100 (Health Score)
  summary: string;
}
