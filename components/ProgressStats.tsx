import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const todos = useQuery(api.todos.getTodos);
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  const completedCount = todos ? todos.filter((d) => d.isCompleted).length : 0;
  const allCount = todos ? todos.length : 0;
  const activeTodos = allCount - completedCount;
  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Progress Stats</Text>
      {/* totol todos */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.statIcon}
            >
              <Ionicons name="list" size={20} color={"#ffff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={styles.statNumber}>{allCount}</Text>
            <Text style={styles.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>
        {/* completed */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.success}
              style={styles.statIcon}
            >
              <Ionicons name="checkmark-circle" size={20} color={"#ffff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed Todos</Text>
          </View>
        </LinearGradient>
        {/* active */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient
              colors={colors.gradients.warning}
              style={styles.statIcon}
            >
              <Ionicons name="time" size={20} color={"#ffff"} />
            </LinearGradient>
          </View>
          <View>
            <Text style={styles.statNumber}>{activeTodos}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
