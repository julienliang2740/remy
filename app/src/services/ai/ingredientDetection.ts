import { resolveAiConfig } from "./config";
import { MOCK_INVENTORIES } from "./mockData";
import type { DetectionResult, ImageInput, Ingredient } from "./types";

export async function detectIngredientsFromImages(
  images: ImageInput[],
): Promise<DetectionResult> {
  const config = resolveAiConfig();

  if (config.provider === "mock") {
    return mergeInventories(images.map(detectMockImage));
  }

  return assertNever(config.provider);
}

export function mergeInventories(results: DetectionResult[]): DetectionResult {
  const byKey = new Map<string, Ingredient>();
  const notes: string[] = [];

  for (const result of results) {
    if (result.notes.trim()) notes.push(result.notes.trim());

    for (const item of result.items) {
      const key = `${item.name.toLowerCase()}::${item.unit.toLowerCase()}`;
      const existing = byKey.get(key);

      if (!existing) {
        byKey.set(key, { ...item });
        continue;
      }

      existing.quantity += item.quantity;
      existing.confidence = Math.max(existing.confidence, item.confidence);
      if (existing.quantityKind !== item.quantityKind) {
        existing.quantityKind = "estimate";
      }
    }
  }

  return {
    items: [...byKey.values()].sort((a, b) => b.confidence - a.confidence),
    notes: notes.join(" "),
  };
}

function detectMockImage(image: ImageInput): DetectionResult {
  const fixture = MOCK_INVENTORIES[hashString(image.base64) % MOCK_INVENTORIES.length]!;
  return {
    items: fixture.items.map((item) => ({ ...item })),
    notes: image.label ? `${fixture.notes} Source: ${image.label}.` : fixture.notes,
  };
}

function hashString(value: string): number {
  let hash = 2166136261;
  const length = Math.min(value.length, 4096);

  for (let index = 0; index < length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash);
}

function assertNever(value: never): never {
  throw new Error(`Unhandled Remy AI provider: ${value}`);
}
