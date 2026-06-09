import { ArrowRight, ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { IconType } from "../../types/navigation";

export function SectionTitle({ title, style }: { title: string; style?: object }) {
  return <Text style={[styles.sectionTitle, style]}>{title}</Text>;
}

export function Pill({
  label,
  icon: Icon,
  tone,
}: {
  label: string;
  icon?: IconType;
  tone: "leaf" | "warm";
}) {
  const color = tone === "leaf" ? colors.leaf : colors.warm;
  return (
    <View
      style={[styles.pill, { backgroundColor: tone === "leaf" ? colors.leafSoft : colors.warmSoft }]}
    >
      {Icon && <Icon size={12} color={color} />}
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

export function Meta({ icon: Icon, label, value }: { icon: IconType; label: string; value: string }) {
  return (
    <View style={styles.metaCell}>
      <Icon size={16} color={colors.earth600} />
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaCell}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

export function Notice({ label, color }: { label: string; color: string }) {
  return (
    <View style={styles.noticeRow}>
      <View style={[styles.noticeDot, { backgroundColor: color }]} />
      <Text style={styles.bodyDark}>{label}</Text>
    </View>
  );
}

export function ActionRow({
  icon: Icon,
  title,
  meta,
  onPress,
}: {
  icon: IconType;
  title: string;
  meta: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.actionRow} onPress={onPress}>
      <View style={styles.smallEarthBox}>
        <Icon size={16} color={colors.earth800} />
      </View>
      <View style={styles.flex1}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.tiny}>{meta}</Text>
      </View>
      <ArrowRight size={16} color={colors.earth600} />
    </Pressable>
  );
}

export function Pref({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.prefRow}>
      <Text style={styles.cardTitle}>{label}</Text>
      <View style={styles.inline}>
        <Text style={styles.tiny}>{value}</Text>
        <ChevronRight size={14} color={colors.earth600} />
      </View>
    </View>
  );
}

export function Progress({
  value,
  color,
  style,
}: {
  value: number;
  color: string;
  style?: object;
}) {
  return (
    <View style={[styles.progressTrack, style]}>
      <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
}
