import type { CapturedShot } from "../../types/cooking";
import {
  SUPPORTED_MEDIA_TYPES,
  type ImageInput,
  type SupportedMediaType,
} from "./types";

const EXT_TO_MEDIA: Record<string, SupportedMediaType> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export async function shotsToImageInputs(shots: CapturedShot[]): Promise<ImageInput[]> {
  return Promise.all(shots.map((shot) => shotToImageInput(shot)));
}

export async function shotToImageInput(shot: CapturedShot): Promise<ImageInput> {
  const uri = shot.uri.trim();
  if (!uri) {
    throw new Error(`Cannot scan "${shot.label}": image URI is empty.`);
  }

  const dataUri = parseDataUri(uri);
  if (dataUri) {
    return { ...dataUri, label: shot.label };
  }

  const mediaType = inferMediaType(uri);
  const base64 = await readUriAsBase64(uri);
  return { base64, mediaType, label: shot.label };
}

export function createMockImageInput(seed: string, label = "Demo scan"): ImageInput {
  return {
    base64: stringToBase64(seed),
    mediaType: "image/jpeg",
    label,
  };
}

function parseDataUri(uri: string): Pick<ImageInput, "base64" | "mediaType"> | null {
  const match = uri.match(/^data:([^;,]+);base64,(.+)$/i);
  if (!match) return null;

  const mediaType = normalizeMediaType(match[1] ?? "");
  return {
    base64: match[2] ?? "",
    mediaType,
  };
}

function inferMediaType(uri: string): SupportedMediaType {
  const clean = uri.split(/[?#]/)[0]?.toLowerCase() ?? "";
  const ext = clean.match(/\.([a-z0-9]+)$/)?.[1];

  if (!ext) return "image/jpeg";
  const mediaType = EXT_TO_MEDIA[ext];
  if (mediaType) return mediaType;

  throw new Error(
    `Unsupported image type ".${ext}". Supported scan image types: ${SUPPORTED_MEDIA_TYPES.join(
      ", ",
    )}.`,
  );
}

function normalizeMediaType(value: string): SupportedMediaType {
  const mediaType = value.trim().toLowerCase();
  if ((SUPPORTED_MEDIA_TYPES as readonly string[]).includes(mediaType)) {
    return mediaType as SupportedMediaType;
  }

  throw new Error(
    `Unsupported image media type "${value}". Supported scan image types: ${SUPPORTED_MEDIA_TYPES.join(
      ", ",
    )}.`,
  );
}

async function readUriAsBase64(uri: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(uri);
  } catch (error) {
    throw new Error(
      `Unable to read image URI for scanning. ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  if (!response.ok) {
    throw new Error(`Unable to read image URI for scanning. Fetch failed with ${response.status}.`);
  }

  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength === 0) {
    throw new Error("Unable to scan an empty image.");
  }

  return arrayBufferToBase64(arrayBuffer);
}

function stringToBase64(value: string): string {
  const bytes = new Uint8Array(value.length);
  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }
  return bytesToBase64(bytes);
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return bytesToBase64(new Uint8Array(buffer));
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  if (typeof btoa !== "function") {
    throw new Error("No base64 encoder is available in this runtime.");
  }

  return btoa(binary);
}
