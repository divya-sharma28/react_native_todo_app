import { createSettingsStyles } from "@/assets/styles/settings.styles";
import Dangerzone from "@/components/Dangerzone";
import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.iconContainer}
            >
              <Ionicons name="settings" size={28} color={"#ffff"} />
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />

          <Preferences />
          <Dangerzone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  content: {
    fontSize: 22,
  },
});
