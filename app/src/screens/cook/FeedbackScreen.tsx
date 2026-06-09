import { Check, Sparkles, TrendingUp } from "lucide-react-native";
import { Text, View } from "react-native";

import { Shell } from "../../components/layout/Shell";
import { ActionRow, Notice, PrimaryButton, SectionTitle, Stat } from "../../components/ui";
import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { Nav } from "../../types/navigation";

export function FeedbackScreen({ nav }: { nav: Nav }) {
  return (
    <Shell nav={nav} active="feedback">
      <View style={styles.center}>
        <View style={styles.leafRound}>
          <Check size={24} color={colors.leaf} strokeWidth={2.5} />
        </View>
        <Text style={styles.serifSubTitle}>Beautifully done.</Text>
        <Text style={[styles.bodyText, styles.centerText]}>
          That sauce had a real gloss to it. Your prep was faster, too - about 2
          minutes quicker than last week.
        </Text>
      </View>

      <View style={[styles.metaRowWhite, styles.mt24]}>
        <Stat label="Steps" value="12/12" />
        <View style={styles.metaDivider} />
        <Stat label="Focus" value="8m 40s" />
        <View style={styles.metaDivider} />
        <Stat label="Skill +" value="Saute" />
      </View>

      <View style={styles.twoCol}>
        <View style={[styles.feedbackCard, styles.leafCard]}>
          <Text style={styles.leafEyebrow}>Win</Text>
          <Text style={styles.cardTitle}>Heat management was steady through the sear.</Text>
        </View>
        <View style={[styles.feedbackCard, styles.warmCard]}>
          <Text style={styles.warmEyebrow}>To try</Text>
          <Text style={styles.cardTitle}>
            Slice garlic a touch thinner next time for even color.
          </Text>
        </View>
      </View>

      <View style={[styles.whitePanel, styles.mt20]}>
        <SectionTitle title="Things we noticed" />
        <Notice label="Skipped: salt the pasta water" color={colors.warm} />
        <Notice label="Uncertain: was the pan hot enough?" color={colors.earth400} />
        <Notice label="Nice touch: finished with olive oil" color={colors.leaf} />
      </View>

      <SectionTitle title="Tiny next steps" style={styles.mt20} />
      <ActionRow
        icon={Sparkles}
        title="5-min knife skills drill"
        meta="Tomorrow - builds on today"
        onPress={() => nav("setup")}
      />
      <ActionRow
        icon={TrendingUp}
        title="Track saute in your skill tree"
        meta="2 sessions to unlock 'Confident saute'"
        onPress={() => nav("profile")}
      />

      <View style={styles.pushBottom}>
        <PrimaryButton label="Back to home" onPress={() => nav("home")} dark />
      </View>
    </Shell>
  );
}
