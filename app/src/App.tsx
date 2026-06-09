import { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
  useFonts as useSansFonts,
} from "@expo-google-fonts/instrument-sans";
import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
  useFonts as useSerifFonts,
} from "@expo-google-fonts/instrument-serif";

import { CookingSessionProvider } from "./context/CookingSessionContext";
import { HomeScreen } from "./screens/HomeScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { FeedbackScreen } from "./screens/cook/FeedbackScreen";
import { IngredientSetupScreen } from "./screens/cook/IngredientSetupScreen";
import { LiveCookingScreen } from "./screens/cook/LiveCookingScreen";
import { RecipeScreen } from "./screens/cook/RecipeScreen";
import { styles } from "./styles/styles";
import type { Screen } from "./types/navigation";

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [sansLoaded] = useSansFonts({
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    InstrumentSans_700Bold,
  });
  const [serifLoaded] = useSerifFonts({
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
  });

  if (!sansLoaded || !serifLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <CookingSessionProvider>
      <StatusBar style={screen === "live" ? "light" : "dark"} />
      {screen === "onboarding" && <OnboardingScreen nav={setScreen} />}
      {screen === "home" && <HomeScreen nav={setScreen} />}
      {screen === "setup" && <IngredientSetupScreen nav={setScreen} />}
      {screen === "recipe" && <RecipeScreen nav={setScreen} />}
      {screen === "live" && <LiveCookingScreen nav={setScreen} />}
      {screen === "feedback" && <FeedbackScreen nav={setScreen} />}
      {screen === "profile" && <ProfileScreen nav={setScreen} />}
    </CookingSessionProvider>
  );
}
