import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const todos = useQuery(api.todos.getTodos);
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  const allCount = todos ? todos.length : 0;
  const completedCount = todos ? todos.filter((d) => d.isCompleted).length : 0;

  const progressPercent = allCount > 0 ? (completedCount / allCount) * 100 : 0;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color={"#ffff"} />
        </LinearGradient>
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Today&apos;s Tasks 👀</Text>
          <Text style={styles.subtitle}>
            {completedCount} of {allCount} completed
          </Text>
        </View>
      </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progressPercent)}%
            </Text>
          </View>
        </View>
    
    </View>
  );
};

export default Header;
