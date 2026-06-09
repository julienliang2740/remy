# App-local AI service layer

This folder contains the frontend-owned service layer for Remy's first AI-backed cooking flows. It keeps backend-like logic modular inside `app/` while preserving `app/src/services/cookingService.ts` as the frontend-facing facade.

## Supported flows

- Image/photo -> detected ingredients
  - `CapturedShot[]` is converted into app-local image inputs.
  - The detector returns a reference-shaped inventory.
  - Inventory items are merged, deduped, and adapted to frontend `DetectedIngredient[]`.

- Ingredients -> generated recipe
  - Selected, typed, and scanned ingredients are adapted into a reference-shaped inventory.
  - The recipe generator returns a reference-shaped recipe.
  - The result is adapted to frontend `RecipeSuggestion`.

## Provider status

`mock` is the only implemented provider.

Real OpenAI, Gemini, and Claude clients are TODO and intentionally out of scope for this pass. Do not document or treat them as implemented until safe provider clients and key handling are added.

## Reference layer boundary

`remy-agent-layer/` is reference only. Do not import from it, call it, move it, modify it, or add it as a dependency from `app/`.

The app owns local copies/adaptations of the small contracts it needs so the frontend can evolve without coupling to the reference implementation.

## Module overview

- `config.ts` - resolves app-local AI config; defaults to `mock`; rejects unsupported providers with developer-facing errors.
- `types.ts` - app-local AI contracts such as `ImageInput`, `DetectionResult`, `Ingredient`, and `Recipe`.
- `imageInput.ts` - converts frontend image URIs into base64 image inputs.
- `mockData.ts` - deterministic mock inventories.
- `ingredientDetection.ts` - mock ingredient detection and inventory merge/dedupe.
- `recipeGeneration.ts` - mock recipe generation from an inventory.
- `adapters.ts` - maps between app-local AI contracts and frontend cooking types.
- `service.test.ts` - standalone service checks that do not launch Expo.
- `serviceDemo.ts` - standalone demo output for scan and recipe flow.

## Config/env behavior

Default behavior is mock mode. Leave config unset or use:

```text
EXPO_PUBLIC_REMY_AI_PROVIDER=mock
```

Any configured provider other than `mock` currently throws a clear configuration error. This is intentional until real provider clients are added safely.

## How to run

From `app/`:

```bash
npm run typecheck
npm run test:services
npm run demo:services
```

The service test and demo compile only the local service entrypoints and run with Node. They do not launch the Expo app and do not require API keys.

## Adding a future real provider safely

When adding a real provider:

1. Keep `cookingService.ts` as the frontend-facing facade.
2. Add provider-specific code behind the existing service interfaces.
3. Keep request/response contracts validated before adapting to frontend types.
4. Add service tests with injected/fake `fetch` so tests do not call real APIs.
5. Make missing config errors explicit and developer-facing.
6. Do not expose production secrets in Expo/web bundles.

## Security

Do not commit API keys or real secrets.

Any key placed in client-side Expo/web config can be exposed to users. Production key management needs a backend, key broker, or equivalent server-side boundary. That backend is out of scope for this frontend-only pass.

## Known limitations/TODOs

- Mock detection is deterministic fixture logic, not real image understanding.
- Real OpenAI/Gemini/Claude clients are not implemented.
- Production key management is not implemented.
- Partial scan success is not implemented; scan failures are surfaced as simple UI errors.
- Preference, diet, multi-recipe, pricing, and live cooking integrations are out of scope here.
