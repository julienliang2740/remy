import { ChefHat, Home, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";
import type { Nav, Screen } from "../../types/navigation";

export function BottomNav({ nav, active }: { nav: Nav; active: Screen }) {
  const tabs = [
    { screen: "home" as const, label: "Home", icon: Home },
    { screen: "setup" as const, label: "Cook", icon: ChefHat },
    { screen: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          active === tab.screen ||
          (tab.screen === "setup" &&
            (active === "recipe" || active === "live" || active === "feedback"));
        return (
          <Pressable key={tab.screen} style={styles.navItem} onPress={() => nav(tab.screen)}>
            <View style={[styles.navIcon, isActive ? styles.navIconActive : null]}>
              <Icon
                size={18}
                color={isActive ? colors.canvas : colors.earth600}
                strokeWidth={isActive ? 2.4 : 2}
              />
            </View>
            <Text style={[styles.navText, isActive ? styles.navTextActive : null]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
