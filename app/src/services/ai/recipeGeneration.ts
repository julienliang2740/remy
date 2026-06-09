import { resolveAiConfig } from "./config";
import type { DetectionResult, Recipe } from "./types";

export async function generateRecipeFromInventory(
  inventory: DetectionResult,
): Promise<Recipe> {
  const config = resolveAiConfig();

  if (config.provider === "mock") {
    return mockRecipeFromInventory(inventory);
  }

  return assertNever(config.provider);
}

export function mockRecipeFromInventory(inventory: DetectionResult): Recipe {
  const names = unique(inventory.items.map((item) => item.name));
  const hero = names[0] ?? "pantry staples";
  const second = names[1];
  const title = second
    ? `${toDisplayName(hero)} skillet with ${toDisplayName(second)}`
    : `Simple ${toDisplayName(hero)} skillet`;
  const timeMinutes = Math.min(35, 18 + Math.max(names.length, 1) * 2);

  return {
    title,
    description:
      names.length > 0
        ? `A practical weeknight dish built around ${formatList(names.slice(0, 3))}.`
        : "A flexible pantry meal for when the scan or basket is empty.",
    servings: 2,
    timeMinutes,
    usesFromInventory: names.slice(0, 6),
    pantryAssumptions: ["salt", "pepper", "water", "cooking oil"],
    missingButRecommended: [
      names.some((name) => name.includes("lemon"))
        ? { name: "fresh herbs", why: "they add a fresh finish without changing the method" }
        : { name: "lemon", why: "a squeeze brightens the finished dish" },
    ],
    steps: [
      "Gather the ingredients and cut everything into bite-size pieces.",
      `Warm a skillet over medium heat and start with ${toDisplayName(hero)}.`,
      "Add the remaining ingredients in order from firmest to most delicate.",
      "Season with salt and pepper, then loosen with a splash of water if needed.",
      "Taste, adjust, and serve while warm.",
    ],
  };
}

function unique(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = value.trim().toLowerCase();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

function toDisplayName(value: string): string {
  return value
    .split(/\s+/)
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function formatList(values: string[]): string {
  const displayValues = values.map(toDisplayName);
  if (displayValues.length === 0) return "what you have";
  if (displayValues.length === 1) return displayValues[0]!;
  if (displayValues.length === 2) return `${displayValues[0]} and ${displayValues[1]}`;
  return `${displayValues[0]}, ${displayValues[1]}, and ${displayValues[2]}`;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled Remy AI provider: ${value}`);
}
