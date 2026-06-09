import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import { defaultSelectedIngredients } from "../constants/cooking";
import {
  defaultRecipeSuggestion,
  generateRecipe,
  scanIngredients,
} from "../services/cookingService";
import type {
  CapturedShot,
  DetectedIngredient,
  RecipeSuggestion,
  ScanIngredientsResponse,
} from "../types/cooking";

type CookingSessionContextValue = {
  shots: CapturedShot[];
  setShots: React.Dispatch<React.SetStateAction<CapturedShot[]>>;
  selectedIngredients: string[];
  customIngredients: string[];
  detectedIngredients: DetectedIngredient[];
  recipe: RecipeSuggestion;
  isScanning: boolean;
  isGeneratingRecipe: boolean;
  toggleIngredient: (name: string) => void;
  addCustomIngredient: (name: string) => void;
  scanCurrentShots: () => Promise<ScanIngredientsResponse>;
  generateCurrentRecipe: () => Promise<RecipeSuggestion>;
};

const CookingSessionContext = createContext<CookingSessionContextValue | undefined>(undefined);

function addUnique(current: string[], additions: string[]) {
  const seen = new Set(current.map((item) => item.toLowerCase()));
  const next = [...current];

  additions.forEach((addition) => {
    const trimmed = addition.trim();
    const key = trimmed.toLowerCase();
    if (!trimmed || seen.has(key)) return;
    seen.add(key);
    next.push(trimmed);
  });

  return next;
}

export function CookingSessionProvider({ children }: { children: React.ReactNode }) {
  const [shots, setShots] = useState<CapturedShot[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    defaultSelectedIngredients,
  );
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const [detectedIngredients, setDetectedIngredients] = useState<DetectedIngredient[]>([]);
  const [recipe, setRecipe] = useState<RecipeSuggestion>(defaultRecipeSuggestion);
  const [isScanning, setIsScanning] = useState(false);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);

  const toggleIngredient = useCallback((name: string) => {
    setSelectedIngredients((current) => {
      const exists = current.some((ingredient) => ingredient.toLowerCase() === name.toLowerCase());
      if (exists) {
        setCustomIngredients((custom) =>
          custom.filter((ingredient) => ingredient.toLowerCase() !== name.toLowerCase()),
        );
        return current.filter((ingredient) => ingredient.toLowerCase() !== name.toLowerCase());
      }

      return [...current, name];
    });
  }, []);

  const addCustomIngredient = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setCustomIngredients((current) => addUnique(current, [trimmed]));
    setSelectedIngredients((current) => addUnique(current, [trimmed]));
  }, []);

  const scanCurrentShots = useCallback(async () => {
    setIsScanning(true);
    try {
      const response = await scanIngredients({ shots });
      setDetectedIngredients(response.detectedIngredients);
      setSelectedIngredients((current) =>
        addUnique(
          current,
          response.detectedIngredients.map((ingredient) => ingredient.name),
        ),
      );
      return response;
    } finally {
      setIsScanning(false);
    }
  }, [shots]);

  const generateCurrentRecipe = useCallback(async () => {
    setIsGeneratingRecipe(true);
    try {
      const nextRecipe = await generateRecipe({
        selectedIngredients,
        customIngredients,
        detectedIngredients,
      });
      setRecipe(nextRecipe);
      return nextRecipe;
    } finally {
      setIsGeneratingRecipe(false);
    }
  }, [customIngredients, detectedIngredients, selectedIngredients]);

  const value = useMemo(
    () => ({
      shots,
      setShots,
      selectedIngredients,
      customIngredients,
      detectedIngredients,
      recipe,
      isScanning,
      isGeneratingRecipe,
      toggleIngredient,
      addCustomIngredient,
      scanCurrentShots,
      generateCurrentRecipe,
    }),
    [
      customIngredients,
      detectedIngredients,
      generateCurrentRecipe,
      isGeneratingRecipe,
      isScanning,
      recipe,
      scanCurrentShots,
      selectedIngredients,
      shots,
      toggleIngredient,
      addCustomIngredient,
    ],
  );

  return (
    <CookingSessionContext.Provider value={value}>{children}</CookingSessionContext.Provider>
  );
}

export function useCookingSession() {
  const value = useContext(CookingSessionContext);
  if (!value) {
    throw new Error("useCookingSession must be used inside CookingSessionProvider");
  }

  return value;
}
