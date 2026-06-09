import { ArrowLeft, ChefHat, Flame, Timer, Utensils } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Shell } from "../../components/layout/Shell";
import { IconButton, Meta, PrimaryButton, SectionTitle } from "../../components/ui";
import { useCookingSession } from "../../context/CookingSessionContext";
import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { Nav } from "../../types/navigation";

export function RecipeScreen({ nav }: { nav: Nav }) {
  const { recipe } = useCookingSession();

  return (
    <Shell nav={nav} active="setup" bleed>
      <View style={styles.recipeHero}>
        <LinearGradient
          colors={[colors.warmSoft, colors.earth100, colors.earth200]}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.recipeEmoji}>{recipe.emoji}</Text>
        <IconButton icon={ArrowLeft} onPress={() => nav("setup")} style={styles.topLeft} />
        <View style={styles.suggested}>
          <Text style={styles.suggestedText}>Suggested</Text>
        </View>
      </View>

      <View style={styles.recipeBody}>
        <Text style={styles.serifSubTitle}>{recipe.title}</Text>
        <Text style={[styles.bodyText, styles.mt8]}>{recipe.description}</Text>

        <View style={[styles.metaRow, styles.mt20]}>
          <Meta icon={Timer} label="Time" value={recipe.time} />
          <View style={styles.metaDivider} />
          <Meta icon={Flame} label="Level" value={recipe.level} />
          <View style={styles.metaDivider} />
          <Meta icon={ChefHat} label="Skill" value={recipe.skill} />
        </View>

        <SectionTitle title="The kit" style={styles.mt28} />
        <View style={styles.chipWrap}>
          {recipe.ingredients.map((item) => (
            <View key={item} style={styles.ingredientChip}>
              <Text style={styles.ingredientText}>{item}</Text>
            </View>
          ))}
        </View>

        <SectionTitle title="Tools you'll grab" style={styles.mt24} />
        <View style={styles.inline}>
          <Utensils size={16} color={colors.earth600} />
          <Text style={styles.bodyDark}>{recipe.tools.join(" - ")}</Text>
        </View>

        <View style={[styles.coachNote, styles.mt24]}>
          <Text style={styles.warmEyebrow}>From your coach</Text>
          <Text style={styles.coachQuote}>"{recipe.coachNote}"</Text>
        </View>

        <View style={styles.mt32}>
          <PrimaryButton label="Enter live mode" onPress={() => nav("live")} warm />
          <Pressable style={styles.textButton}>
            <Text style={styles.textButtonText}>Save for later</Text>
          </Pressable>
        </View>
      </View>
    </Shell>
  );
}
