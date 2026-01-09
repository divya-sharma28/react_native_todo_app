import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const TodoInput = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
        // Alert.alert("Success", "Todo added!");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to add todo!");
      }
    }
  };
  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          //   multiline // on keyboard enter/reeturn will go to next line without this it will submit
          placeholder="What do you want to do?"
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              !newTodo.trim()
                ? colors.gradients.muted
                : colors.gradients.primary
            }
            style={[
              styles.addButton,
              !newTodo.trim() && styles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color={"#ffffff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
