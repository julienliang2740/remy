import { generateRecipe, scanIngredients } from "../cookingService";
import type { CapturedShot } from "../../types/cooking";

async function runDemo() {
  const shots: CapturedShot[] = [
    {
      id: "demo-fridge",
      label: "Fridge",
      uri: "data:image/jpeg;base64,ZGVtby1mcm9udC1zaGVsZg==",
    },
    {
      id: "demo-pantry",
      label: "Pantry",
      uri: "data:image/jpeg;base64,ZGVtby1wYW50cnktc2hlbGY=",
    },
  ];

  const scan = await scanIngredients({ shots });
  const recipe = await generateRecipe({
    selectedIngredients: [],
    customIngredients: [],
    detectedIngredients: scan.detectedIngredients,
  });

  console.log(
    `Detected ingredients: ${scan.detectedIngredients
      .map((ingredient) => ingredient.name)
      .join(", ")}`,
  );
  console.log(`Generated recipe title: ${recipe.title}`);
}

void runDemo().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  throw error;
});
