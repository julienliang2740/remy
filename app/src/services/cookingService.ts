import { defaultSelectedIngredients } from "../constants/cooking";
import {
  detectionResultToDetectedIngredients,
  generateRecipeInputToInventory,
  recipeSuggestionFromIngredientNames,
  recipeToRecipeSuggestion,
} from "./ai/adapters";
import { isRemyAiConfigError } from "./ai/config";
import { detectIngredientsFromImages } from "./ai/ingredientDetection";
import { createMockImageInput, shotsToImageInputs } from "./ai/imageInput";
import { generateRecipeFromInventory } from "./ai/recipeGeneration";
import type {
  CookingGuideSession,
  GenerateRecipeInput,
  RecipeSuggestion,
  ScanIngredientsInput,
  ScanIngredientsResponse,
} from "../types/cooking";

export const defaultRecipeSuggestion =
  recipeSuggestionFromIngredientNames(defaultSelectedIngredients);

export function isCookingServiceConfigError(error: unknown): boolean {
  return isRemyAiConfigError(error);
}

export async function scanIngredients({
  shots,
}: ScanIngredientsInput): Promise<ScanIngredientsResponse> {
  const imageInputs =
    shots.length > 0 ? await shotsToImageInputs(shots) : [createMockImageInput("demo-scan")];
  const detectionResult = await detectIngredientsFromImages(imageInputs);

  return {
    detectedIngredients: detectionResultToDetectedIngredients(detectionResult),
  };
}

export async function generateRecipe(input: GenerateRecipeInput): Promise<RecipeSuggestion> {
  const inventory = generateRecipeInputToInventory(input);
  const recipe = await generateRecipeFromInventory(inventory);
  return recipeToRecipeSuggestion(recipe, inventory);
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
