import type {
  DetectedIngredient,
  GenerateRecipeInput,
  RecipeSuggestion,
} from "../../types/cooking";
import type { DetectionResult, Ingredient, Recipe } from "./types";

export function detectionResultToDetectedIngredients(
  result: DetectionResult,
): DetectedIngredient[] {
  return uniqueByName(result.items)
    .filter((item) => item.confidence >= 0.5)
    .map((item) => ({
      name: toDisplayIngredientName(item.name),
      confidence: clampConfidence(item.confidence),
      source: "scan",
    }));
}

export function generateRecipeInputToInventory(input: GenerateRecipeInput): DetectionResult {
  const detectedByName = new Map(
    input.detectedIngredients.map((ingredient) => [
      ingredient.name.trim().toLowerCase(),
      ingredient,
    ]),
  );
  const names = uniqueNames([
    ...input.selectedIngredients,
    ...input.customIngredients,
    ...input.detectedIngredients.map((ingredient) => ingredient.name),
  ]);

  return {
    items: names.map((name): Ingredient => {
      const detected = detectedByName.get(name.toLowerCase());
      return {
        name: name.toLowerCase(),
        quantity: 0,
        unit: "count",
        quantityKind: "unknown",
        category: "other",
        confidence: detected?.confidence ?? 1,
      };
    }),
    notes: "Inventory built from selected, typed, and scanned app ingredients.",
  };
}

export function recipeToRecipeSuggestion(
  recipe: Recipe,
  inventory: DetectionResult,
): RecipeSuggestion {
  const sourceIngredients = uniqueNames(
    recipe.usesFromInventory.length > 0
      ? recipe.usesFromInventory
      : inventory.items.map((item) => item.name),
  ).map(toDisplayIngredientName);
  const kit = uniqueNames([
    ...recipe.usesFromInventory,
    ...recipe.pantryAssumptions,
    ...recipe.missingButRecommended.map((item) => item.name),
  ])
    .map(toDisplayIngredientName)
    .slice(0, 10);

  return {
    title: recipe.title,
    description: recipe.description,
    emoji: emojiForInventory(inventory),
    sourceIngredients,
    time: `${recipe.timeMinutes} min`,
    level: recipe.timeMinutes <= 20 ? "Easy" : "Easy+",
    skill: skillForInventory(inventory),
    ingredients: kit.length > 0 ? kit : ["Salt", "Pepper", "Cooking Oil"],
    tools: toolsForInventory(inventory),
    coachNote: recipe.steps[0] ?? "Start by getting everything prepped before the pan heats up.",
  };
}

export function recipeSuggestionFromIngredientNames(
  ingredientNames: string[],
): RecipeSuggestion {
  const inventory: DetectionResult = {
    items: uniqueNames(ingredientNames).map((name) => ({
      name: name.toLowerCase(),
      quantity: 0,
      unit: "count",
      quantityKind: "unknown",
      category: "other",
      confidence: 1,
    })),
    notes: "Default app ingredients.",
  };

  return recipeToRecipeSuggestion(
    {
      title: "Pasta + pantry skillet",
      description:
        "A simple weeknight dish using the basket you already started with.",
      servings: 2,
      timeMinutes: 20,
      usesFromInventory: inventory.items.map((item) => item.name),
      pantryAssumptions: ["salt", "pepper", "water", "cooking oil"],
      missingButRecommended: [{ name: "lemon", why: "a little acidity helps balance richness" }],
      steps: ["Gather your ingredients before you start cooking."],
    },
    inventory,
  );
}

function uniqueByName(items: Ingredient[]): Ingredient[] {
  const seen = new Set<string>();
  const result: Ingredient[] = [];

  for (const item of items) {
    const key = item.name.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

function uniqueNames(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    const key = trimmed.toLowerCase();
    if (!trimmed || seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }

  return result;
}

function toDisplayIngredientName(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function clampConfidence(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function emojiForInventory(inventory: DetectionResult): string {
  const names = inventory.items.map((item) => item.name.toLowerCase()).join(" ");
  if (names.match(/pasta|spaghetti|rigatoni/)) return "\u{1F35D}";
  if (names.match(/chicken/)) return "\u{1F357}";
  return "\u{1F373}";
}

function skillForInventory(inventory: DetectionResult): string {
  const names = inventory.items.map((item) => item.name.toLowerCase()).join(" ");
  if (names.match(/flour|egg|milk|banana/)) return "Mix";
  if (names.match(/rice|soy|ginger|pepper/)) return "Saute";
  return "Saute";
}

function toolsForInventory(inventory: DetectionResult): string[] {
  const names = inventory.items.map((item) => item.name.toLowerCase()).join(" ");
  if (names.match(/flour|egg|milk|banana/)) return ["Bowl", "skillet", "spatula"];
  if (names.match(/rice/)) return ["Skillet", "pot", "wooden spoon"];
  return ["Skillet", "chef's knife", "wooden spoon"];
}
