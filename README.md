# Remy

This folder contains two independent projects:

- `website/` - React + Vite marketing website
- `app/` - React Native + Expo mobile app

Each project has its own dependencies and should be run from its own folder.

## How to Set Things Up Properly

### 1. Install dependencies per project

Run installs from the project folder you want to work on:

```bash
cd app
npm install
```

```bash
cd ../website
npm install
```

### 2. Configure the mobile app AI service

The Expo app has an app-local AI service layer for two flows:

- image/photo -> detected ingredients
- ingredients -> generated recipe

The only implemented provider is `mock`, which works without API keys or a backend.

Create a local env file from the example if you want explicit config:

```bash
cd app
cp .env.example .env
```

Keep this value for the current implementation:

```text
EXPO_PUBLIC_REMY_AI_PROVIDER=mock
```

Do not add real OpenAI, Gemini, Claude, or other provider keys to the client app. Expo/web client-side config can be exposed to users. Production key management needs a backend or key broker, which is not part of this frontend setup.

### 3. Verify the app service layer without launching Expo

From `app/`:

```bash
npm run typecheck
npm run test:services
npm run demo:services
```

These checks compile and run the app-local service code only. They do not launch the full app and do not require API keys.

### 4. Run the mobile app

From `app/`:

```bash
npm run web
```

Or start Expo and choose a target:

```bash
npm start
```

### 5. Run the website

From `website/`:

```bash
npm run dev
```

### Important boundaries

- `remy-agent-layer/` is reference only for the frontend app work. Do not import from it, call it, move it, modify it, or depend on it from `app/`.
- Keep backend-like frontend logic inside `app/src/services/ai/`.
- Keep `app/src/services/cookingService.ts` as the frontend-facing facade for scan and recipe generation.
- Do not commit secrets or real API keys.

## Website

```bash
cd website
npm install
npm run dev
```

Other website commands:

```bash
npm run build
npm run preview
```

## Mobile App

```bash
cd app
npm install
npx expo start
```

From the Expo dev server, choose the target you want to run on, such as iOS,
Android, or web.
