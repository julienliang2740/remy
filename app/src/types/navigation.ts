import type { ComponentType } from "react";

export type Screen =
  | "onboarding"
  | "home"
  | "setup"
  | "recipe"
  | "live"
  | "feedback"
  | "profile";

export type Nav = (screen: Screen) => void;

export type IconType = ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;
