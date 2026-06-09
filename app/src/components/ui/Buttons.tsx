import { Pressable, Text, View } from "react-native";

import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { IconType } from "../../types/navigation";

export function PrimaryButton({
  label,
  icon: Icon,
  onPress,
  dark,
  warm,
}: {
  label: string;
  icon?: IconType;
  onPress: () => void;
  dark?: boolean;
  warm?: boolean;
}) {
  const background = warm ? colors.warm : dark ? colors.earth950 : colors.earth950;
  return (
    <Pressable style={[styles.primaryButton, { backgroundColor: background }]} onPress={onPress}>
      <View style={styles.inline}>
        {Icon && <Icon size={16} color={colors.canvas} />}
        <Text style={styles.primaryText}>{label}</Text>
      </View>
    </Pressable>
  );
}

export function IconButton({
  icon: Icon,
  onPress,
  dark,
  style,
}: {
  icon: IconType;
  onPress?: () => void;
  dark?: boolean;
  style?: object;
}) {
  return (
    <Pressable
      style={[dark ? styles.iconButtonDark : styles.iconButtonLight, style]}
      onPress={onPress}
    >
      <Icon size={16} color={dark ? colors.white : colors.earth950} />
    </Pressable>
  );
}
