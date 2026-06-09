import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";

import { colors } from "../../constants/theme";
import { styles } from "../../styles/styles";

export function FauxCamera() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#5a4838", "#241a12", "#0a0604"]}
        start={{ x: 0.15, y: 0.15 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.panEmoji}>🍳</Text>
    </View>
  );
}

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Sparkles size={12} color={colors.warm} />
      <Text style={styles.cameraBulletText}>{children}</Text>
    </View>
  );
}
