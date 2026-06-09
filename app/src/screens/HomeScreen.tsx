import { ArrowRight, Flame, Sparkles, Timer } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Shell } from "../components/layout/Shell";
import { Pill, PrimaryButton, Progress, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { styles } from "../styles/styles";
import type { Nav } from "../types/navigation";

export function HomeScreen({ nav }: { nav: Nav }) {
  return (
    <Shell nav={nav} active="home">
      <Text style={styles.eyebrow}>Good afternoon, Alex</Text>
      <Text style={styles.serifTitle}>The kitchen{"\n"}is yours.</Text>

      <View style={[styles.softPanel, styles.mt28]}>
        <View style={styles.rowBetweenEnd}>
          <View>
            <Pill label="This week" icon={Sparkles} tone="leaf" />
            <Text style={styles.largeMetric}>4 of 10 skills</Text>
          </View>
          <Text style={styles.rightSmall}>
            Last:{"\n"}
            <Text style={styles.strong}>Knife skills</Text>
          </Text>
        </View>
        <Progress value={40} color={colors.leaf} style={styles.mt16} />
      </View>

      <SectionTitle title="Jump back in" style={styles.mt28} />
      <Pressable style={styles.sessionCard} onPress={() => nav("live")}>
        <View style={styles.foodTile}>
          <Text style={styles.emojiLarge}>🍅</Text>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.cardTitle}>Slow-simmered marinara</Text>
          <View style={styles.inline}>
            <Timer size={12} color={colors.earth600} />
            <Text style={styles.tiny}>Step 3 of 8 - 12 min left</Text>
          </View>
        </View>
        <View style={styles.roundWarm}>
          <ArrowRight size={16} color={colors.white} />
        </View>
      </Pressable>

      <View style={styles.twoCol}>
        <Pressable style={styles.tileCard} onPress={() => nav("recipe")}>
          <View style={styles.smallFoodTile}>
            <Text style={styles.emojiMed}>🍳</Text>
          </View>
          <Text style={styles.tileTitle}>Saved: Crispy fried eggs</Text>
          <Text style={styles.tiny}>Beginner - 8 min</Text>
        </Pressable>
        <Pressable
          style={[styles.tileCard, styles.leafCard]}
          onPress={() => nav("profile")}
        >
          <View style={styles.smallWhiteTile}>
            <Text style={styles.emojiMed}>🥬</Text>
          </View>
          <Text style={styles.tileTitle}>Saved $14 on swaps</Text>
          <Text style={[styles.tiny, { color: colors.leaf }]}>3 new this week</Text>
        </Pressable>
      </View>

      <View style={styles.pushBottom}>
        <PrimaryButton
          label="Start a new session"
          icon={Flame}
          onPress={() => nav("setup")}
          dark
        />
        <Text style={styles.smallCenter}>
          We'll suggest a recipe based on what you have.
        </Text>
      </View>
    </Shell>
  );
}
