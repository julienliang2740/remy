import { defaultSelectedIngredients } from "../constants/cooking";
import type {
  CookingGuideSession,
  GenerateRecipeInput,
  RecipeSuggestion,
  ScanIngredientsInput,
  ScanIngredientsResponse,
} from "../types/cooking";

const kitLabels: Record<string, string> = {
  pasta: "Dried rigatoni",
  garlic: "Garlic, 3 cloves",
  butter: "Salted butter",
  tomato: "Tomatoes",
  parmesan: "Parmesan",
  spinach: "Spinach",
  eggs: "Eggs",
  "olive oil": "Olive oil",
  "chili flakes": "Chili flakes",
};

function uniqueIngredients(values: string[]) {
  const seen = new Set<string>();
  return values
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function buildRecipeSuggestion(ingredients: string[]): RecipeSuggestion {
  const allIngredients = uniqueIngredients(ingredients);
  const hasPasta = allIngredients.some((ingredient) => ingredient.toLowerCase() === "pasta");
  const primary = hasPasta ? "Pasta" : allIngredients[0] ?? "Pasta";
  const pantryCount = Math.max(allIngredients.length - 1, 1);
  const kit = uniqueIngredients([
    ...allIngredients.map((ingredient) => kitLabels[ingredient.toLowerCase()] ?? ingredient),
    "Salted butter",
    "Parmesan",
  ]).slice(0, 8);

  return {
    title: hasPasta ? "Pasta + 3 pantry items" : `${primary} + ${pantryCount} pantry items`,
    description:
      "A buttery, garlicky weeknight bowl. We'll focus on getting the garlic golden, not burnt.",
    emoji: hasPasta ? "🍝" : "🍳",
    sourceIngredients: allIngredients,
    time: "20 min",
    level: "Easy+",
    skill: "Saute",
    ingredients: kit,
    tools: ["Pot", "skillet", "wooden spoon"],
    coachNote: "We'll watch the garlic together. Pull it the moment it smells nutty.",
  };
}

export const defaultRecipeSuggestion = buildRecipeSuggestion(defaultSelectedIngredients);

export async function scanIngredients({
  shots,
}: ScanIngredientsInput): Promise<ScanIngredientsResponse> {
  const fallbackIngredients = ["Eggs", "Spinach", "Tomato", "Lemon"];
  const detectedIngredients = fallbackIngredients.slice(0, Math.max(2, Math.min(4, shots.length + 2)));

  return {
    detectedIngredients: detectedIngredients.map((name, index) => ({
      name,
      confidence: 0.86 - index * 0.05,
      source: "scan",
    })),
  };
}

export async function generateRecipe({
  selectedIngredients,
  customIngredients,
  detectedIngredients,
}: GenerateRecipeInput): Promise<RecipeSuggestion> {
  return buildRecipeSuggestion([
    ...selectedIngredients,
    ...customIngredients,
    ...detectedIngredients.map((ingredient) => ingredient.name),
  ]);
}

export async function createCookingGuideSession(
  recipe: RecipeSuggestion,
): Promise<CookingGuideSession> {
  return {
    statusLabel: "Watch placeholder",
    coachPrompt: recipe.coachNote,
    mode: "recording-placeholder",
  };
}
