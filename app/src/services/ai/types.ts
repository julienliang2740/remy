export const SUPPORTED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export type SupportedMediaType = (typeof SUPPORTED_MEDIA_TYPES)[number];

export const QUANTITY_KINDS = ["exact", "estimate", "unknown"] as const;
export type QuantityKind = (typeof QUANTITY_KINDS)[number];

export const INGREDIENT_CATEGORIES = [
  "produce",
  "dairy",
  "meat",
  "seafood",
  "pantry",
  "grain",
  "spice",
  "condiment",
  "beverage",
  "frozen",
  "bakery",
  "other",
] as const;

export type IngredientCategory = (typeof INGREDIENT_CATEGORIES)[number];

export type AiProvider = "mock" | "openai" | "gemini" | "claude";

export type ImageInput = {
  base64: string;
  mediaType: SupportedMediaType;
  label?: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
  quantityKind: QuantityKind;
  category: IngredientCategory;
  confidence: number;
};

export type DetectionResult = {
  items: Ingredient[];
  notes: string;
};

export type Recipe = {
  title: string;
  description: string;
  servings: number;
  timeMinutes: number;
  usesFromInventory: string[];
  pantryAssumptions: string[];
  missingButRecommended: Array<{ name: string; why: string }>;
  steps: string[];
};
