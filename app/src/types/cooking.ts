export type CapturedShot = {
  id: string;
  uri: string;
  label: string;
};

export type RecordedVideo = {
  uri: string;
  createdAt: string;
  durationMs: number;
  platform: string;
  mimeType?: string;
};

export type PantryItem = {
  name: string;
  emoji: string;
};

export type DetectedIngredient = {
  name: string;
  confidence: number;
  source: "scan";
};

export type RecipeSuggestion = {
  title: string;
  description: string;
  emoji: string;
  time: string;
  level: string;
  skill: string;
  ingredients: string[];
  tools: string[];
  coachNote: string;
};

export type ScanIngredientsInput = {
  shots: CapturedShot[];
};

export type ScanIngredientsResponse = {
  detectedIngredients: DetectedIngredient[];
};

export type GenerateRecipeInput = {
  selectedIngredients: string[];
  customIngredients: string[];
  detectedIngredients: DetectedIngredient[];
};

export type CookingGuideSession = {
  statusLabel: string;
  coachPrompt: string;
  mode: "recording-placeholder";
};
