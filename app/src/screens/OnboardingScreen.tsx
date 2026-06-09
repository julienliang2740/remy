import { ArrowRight, Camera, Sparkles, Timer } from "lucide-react-native";
import { SafeAreaView, Text, View } from "react-native";

import { colors } from "../constants/theme";
import { styles } from "../styles/styles";
import type { Nav } from "../types/navigation";
import { PrimaryButton } from "../components/ui";

export function OnboardingScreen({ nav }: { nav: Nav }) {
  const steps = [
    {
      icon: Sparkles,
      title: "A coach for everyday skills.",
      body: "Remy helps you learn things hands-on - starting with cooking. Friendly guidance, never judgmental.",
    },
    {
      icon: Camera,
      title: "Watches with you, gently.",
      body: "Point your camera at the pan. Remy offers small nudges in the moment, then a calm recap afterwards.",
    },
    {
      icon: Timer,
      title: "Practical. Affordable. Yours.",
      body: "Get cheaper ingredient swaps, sale-aware ideas, and small wins that build real kitchen confidence.",
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.onboarding}>
        <Text style={styles.warmEyebrow}>Remy</Text>
        <Text style={[styles.serifHero, styles.mt12]}>
          A calm coach{"\n"}for the kitchen.
        </Text>
        <Text style={[styles.bodyText, styles.mt16]}>
          Real-time nudges while you cook, plus a warm recap when the plate is
          down.
        </Text>

        <View style={styles.stepList}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <View key={step.title} style={styles.infoCardRow}>
                <View style={styles.warmIconBox}>
                  <Icon size={20} color={colors.warm} strokeWidth={2} />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.cardTitle}>{step.title}</Text>
                  <Text style={styles.cardBody}>{step.body}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.pushBottom}>
          <PrimaryButton label="Let's cook" icon={ArrowRight} onPress={() => nav("home")} />
          <Text style={styles.smallCenter}>
            Suggestions are guidance, not gospel. You're the chef.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
