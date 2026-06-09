import type { PantryItem } from "../types/cooking";

export const pantry: PantryItem[] = [
  { name: "Eggs", emoji: "🥚" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Garlic", emoji: "🧄" },
  { name: "Olive oil", emoji: "🫒" },
  { name: "Onion", emoji: "🧅" },
  { name: "Butter", emoji: "🧈" },
  { name: "Tomato", emoji: "🍅" },
  { name: "Lemon", emoji: "🍋" },
  { name: "Rice", emoji: "🍚" },
  { name: "Spinach", emoji: "🥬" },
  { name: "Parmesan", emoji: "🧀" },
  { name: "Chili flakes", emoji: "🌶️" },
];

export const tools = ["Skillet", "Pot", "Sheet pan", "Chef's knife", "Wood spoon"];

export const labelCycle = ["Fridge", "Pantry", "Counter", "Spice rack", "Freezer"];

export const defaultSelectedIngredients = [
  "Pasta",
  "Garlic",
  "Olive oil",
  "Parmesan",
  "Chili flakes",
];

export const skillProgress = [
  { name: "Saute", level: 70 },
  { name: "Knife work", level: 50 },
  { name: "Roasting", level: 35 },
  { name: "Sauces", level: 20 },
];

export const savedRecipes = [
  { name: "Brown butter pasta", emoji: "🍝", meta: "20 min - Easy+" },
  { name: "Lemony roasted chicken", emoji: "🍗", meta: "55 min - Intermediate" },
  { name: "Tomato + bread soup", emoji: "🍅", meta: "30 min - Easy" },
];

export const savingsSwaps = [
  {
    from: "Pine nuts",
    to: "Toasted sunflower seeds",
    note: "Same nutty crunch in pesto.",
    save: "$4.80",
  },
  {
    from: "Heavy cream",
    to: "Whole milk + butter",
    note: "Works for most weeknight sauces.",
    save: "$2.10",
  },
  {
    from: "Fresh basil",
    to: "Frozen basil cubes",
    note: "Keeps for months, same flavor.",
    save: "$1.40",
  },
];

export const practicalSavingsTips = [
  {
    title: "Salt the pasta water, save the rest",
    body: "Reserved starchy water replaces extra cream or butter in most sauces.",
  },
  {
    title: "Day-old bread -> breadcrumbs",
    body: "Toast, blitz, freeze. Boxed crumbs cost 5x more per cup.",
  },
];
