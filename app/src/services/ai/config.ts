import type { AiProvider } from "./types";

declare const process:
  | {
      env?: Record<string, string | undefined>;
    }
  | undefined;

export type AppAiProvider = "mock";

export type AiConfig = {
  provider: AppAiProvider;
};

export class RemyAiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RemyAiConfigError";
  }
}

const KNOWN_PROVIDERS: readonly AiProvider[] = ["mock", "openai", "gemini", "claude"];

export function resolveAiConfig(overrides: { provider?: string } = {}): AiConfig {
  const rawProvider =
    overrides.provider ??
    readEnv("EXPO_PUBLIC_REMY_AI_PROVIDER") ??
    readEnv("REMY_AI_PROVIDER") ??
    "mock";
  const provider = rawProvider.trim().toLowerCase();

  if (!provider || provider === "mock") {
    return { provider: "mock" };
  }

  if ((KNOWN_PROVIDERS as readonly string[]).includes(provider)) {
    throw new RemyAiConfigError(
      `Remy AI provider "${provider}" is recognized but is not implemented in this app-local first pass. ` +
        `Set EXPO_PUBLIC_REMY_AI_PROVIDER=mock or leave it unset. Real provider clients are TODO.`,
    );
  }

  throw new RemyAiConfigError(
    `Unsupported Remy AI provider "${provider}". This app-local first pass supports only "mock". ` +
      `Set EXPO_PUBLIC_REMY_AI_PROVIDER=mock or leave it unset.`,
  );
}

export function isRemyAiConfigError(error: unknown): error is RemyAiConfigError {
  return error instanceof RemyAiConfigError || getErrorName(error) === "RemyAiConfigError";
}

function readEnv(name: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  return process.env?.[name];
}

function getErrorName(error: unknown): string | undefined {
  return typeof error === "object" && error !== null && "name" in error
    ? String((error as { name?: unknown }).name)
    : undefined;
}
