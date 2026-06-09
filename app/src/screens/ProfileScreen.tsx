import {
  Bell,
  Bookmark,
  ChevronRight,
  MapPin,
  Settings,
  Sparkles,
  TrendingDown,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Shell } from "../components/layout/Shell";
import { Pref, Progress, SectionTitle, Stat } from "../components/ui";
import {
  practicalSavingsTips,
  savedRecipes,
  savingsSwaps,
  skillProgress,
} from "../constants/cooking";
import { colors } from "../constants/theme";
import { styles } from "../styles/styles";
import type { Nav } from "../types/navigation";

export function ProfileScreen({ nav }: { nav: Nav }) {
  return (
    <Shell nav={nav} active="profile">
      <View style={styles.rowBetween}>
        <View style={styles.inlineWide}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View>
            <Text style={styles.eyebrow}>Home cook</Text>
            <Text style={styles.profileName}>Alex Rivera</Text>
          </View>
        </View>
        <View style={styles.circleWhite}>
          <Bell size={16} color={colors.earth800} />
        </View>
      </View>

      <View style={[styles.metaRow, styles.mt24]}>
        <Stat label="Sessions" value="14" />
        <View style={styles.metaDivider} />
        <Stat label="Streak" value="5 days" />
        <View style={styles.metaDivider} />
        <Stat label="Saved" value="$32" />
      </View>

      <View style={styles.mt28}>
        <Text style={styles.leafEyebrow}>Smart living</Text>
        <Text style={styles.serifSubTitle}>Cook well, spend less.</Text>
        <Text style={[styles.bodyText, styles.mt8]}>
          Honest swaps from your coach - no upsell, no spam.
        </Text>
      </View>

      <View style={[styles.savingsSummary, styles.mt24]}>
        <View>
          <Text style={styles.leafEyebrow}>Saved this month</Text>
          <Text style={styles.moneyText}>$32.40</Text>
        </View>
        <View style={styles.whiteIconBox}>
          <TrendingDown size={24} color={colors.leaf} />
        </View>
      </View>

      <View style={[styles.rowBetweenEnd, styles.mt28]}>
        <SectionTitle title="Try these swaps" />
        <Text style={styles.warmSmall}>See all</Text>
      </View>
      {savingsSwaps.map((swap) => (
        <View key={swap.from} style={styles.swapCard}>
          <View style={styles.flex1}>
            <Text style={styles.swapLine}>
              <Text style={styles.strike}>{swap.from}</Text>{" "}
              <Text style={styles.strong}>{"->"} {swap.to}</Text>
            </Text>
            <Text style={styles.cardBody}>{swap.note}</Text>
          </View>
          <View style={styles.savePill}>
            <Text style={styles.saveText}>-{swap.save}</Text>
          </View>
        </View>
      ))}

      <SectionTitle title="On sale near you" style={styles.mt28} />
      <View style={styles.saleCard}>
        <View style={styles.inline}>
          <MapPin size={12} color={colors.warm} />
          <Text style={styles.warmEyebrow}>Market St - 2 blocks</Text>
        </View>
        <Text style={styles.saleTitle}>Organic tomatoes, $1.99/lb until Sunday.</Text>
        <Text style={styles.cardBody}>
          Perfect for the marinara you're mid-way through.
        </Text>
      </View>

      <SectionTitle title="Practical tips" style={styles.mt28} />
      {practicalSavingsTips.map((tip) => (
        <View key={tip.title} style={styles.tipCard}>
          <View style={styles.smallEarthBox}>
            <Sparkles size={16} color={colors.earth800} />
          </View>
          <View style={styles.flex1}>
            <Text style={styles.cardTitle}>{tip.title}</Text>
            <Text style={styles.cardBody}>{tip.body}</Text>
          </View>
        </View>
      ))}

      <View style={[styles.rowBetweenEnd, styles.mt28]}>
        <SectionTitle title="Your skill tree" />
        <View style={styles.inline}>
          <Sparkles size={12} color={colors.leaf} />
          <Text style={styles.leafSmall}>Growing</Text>
        </View>
      </View>
      <View style={styles.whitePanel}>
        {skillProgress.map((skill) => (
          <View key={skill.name} style={styles.skillRow}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>{skill.name}</Text>
              <Text style={styles.tiny}>{skill.level}%</Text>
            </View>
            <Progress value={skill.level} color={colors.warm} style={styles.mt8} />
          </View>
        ))}
      </View>

      <View style={[styles.rowBetweenEnd, styles.mt28]}>
        <SectionTitle title="Saved recipes" />
        <Text style={styles.warmSmall}>Manage</Text>
      </View>
      {savedRecipes.map((recipe) => (
        <View key={recipe.name} style={styles.savedRow}>
          <View style={styles.savedEmoji}>
            <Text style={styles.emojiMed}>{recipe.emoji}</Text>
          </View>
          <View style={styles.flex1}>
            <Text style={styles.cardTitle}>{recipe.name}</Text>
            <Text style={styles.tiny}>{recipe.meta}</Text>
          </View>
          <Bookmark size={16} color={colors.earth600} />
        </View>
      ))}

      <SectionTitle title="Preferences" style={styles.mt28} />
      <View style={styles.prefBox}>
        <Pref label="Dietary preferences" value="No restrictions" />
        <Pref label="Kitchen confidence" value="Confident beginner" />
        <Pref label="Coach voice" value="Calm & warm" />
        <Pref label="Camera & mic" value="Always ask" />
      </View>

      <Pressable style={styles.settingsRow} onPress={() => nav("onboarding")}>
        <View style={styles.inlineWide}>
          <Settings size={16} color={colors.earth600} />
          <Text style={styles.cardTitle}>Settings & account</Text>
        </View>
        <ChevronRight size={16} color={colors.earth600} />
      </Pressable>

      <Text style={styles.smallCenter}>
        Remy learns gently. You can clear what it remembers anytime.
      </Text>
    </Shell>
  );
}
