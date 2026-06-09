import {
  defaultRecipeSuggestion,
  generateRecipe,
  scanIngredients,
} from "../cookingService";
import { RemyAiConfigError, resolveAiConfig } from "./config";
import type { CapturedShot } from "../../types/cooking";

async function runServiceTests() {
  await testMockScanWithPhotos();
  await testDemoScanWithoutPhotos();
  await testMockRecipeGeneration();
  testUnsupportedProviderConfig();

  console.log("service tests passed");
}

async function testMockScanWithPhotos() {
  const response = await scanIngredients({
    shots: [
      fakeShot("fridge", "ZGVtby1mcmlkZ2U="),
      fakeShot("pantry", "ZGVtby1wYW50cnk="),
    ],
  });

  assert(response.detectedIngredients.length > 0, "scan should detect mock ingredients");
  assert(
    new Set(response.detectedIngredients.map((item) => item.name.toLowerCase())).size ===
      response.detectedIngredients.length,
    "scan ingredients should be deduped by name",
  );
}

async function testDemoScanWithoutPhotos() {
  const response = await scanIngredients({ shots: [] });
  assert(response.detectedIngredients.length > 0, "demo scan should work without photos");
}

async function testMockRecipeGeneration() {
  const scan = await scanIngredients({
    shots: [fakeShot("counter", "ZGVtby1jb3VudGVy")],
  });
  const recipe = await generateRecipe({
    selectedIngredients: [],
    customIngredients: [],
    detectedIngredients: scan.detectedIngredients,
  });

  assert(recipe.title.trim().length > 0, "recipe should have a title");
  assert(recipe.sourceIngredients.length > 0, "recipe should include source ingredients");
  assert(
    recipe.title !== defaultRecipeSuggestion.title,
    "generated recipe should come from service output, not only the default suggestion",
  );
}

function testUnsupportedProviderConfig() {
  let error: unknown;
  try {
    resolveAiConfig({ provider: "gemini" });
  } catch (caught) {
    error = caught;
  }

  assert(error instanceof RemyAiConfigError, "unsupported first-pass provider should throw config error");
  assert(
    error instanceof Error && error.message.includes("EXPO_PUBLIC_REMY_AI_PROVIDER=mock"),
    "config error should tell developers how to return to mock mode",
  );
}

function fakeShot(label: string, base64: string): CapturedShot {
  return {
    id: `test-${label}`,
    label,
    uri: `data:image/jpeg;base64,${base64}`,
  };
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

void runServiceTests().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  throw error;
});
