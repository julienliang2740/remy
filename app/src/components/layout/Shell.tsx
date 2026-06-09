import React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { styles } from "../../styles/styles";
import type { Nav, Screen } from "../../types/navigation";
import { BottomNav } from "./BottomNav";

export function Shell({
  children,
  nav,
  active,
  hideNav,
  bleed,
}: {
  children: React.ReactNode;
  nav: Nav;
  active: Screen;
  hideNav?: boolean;
  bleed?: boolean;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.shell,
          bleed ? styles.shellBleed : null,
          hideNav ? styles.shellHideNav : null,
        ]}
      >
        {children}
      </ScrollView>
      {!hideNav && <BottomNav nav={nav} active={active} />}
    </SafeAreaView>
  );
}
