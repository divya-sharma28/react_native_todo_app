import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type Todo = Doc<"todos">;
interface TodoTextAndActionsProps {
  item: Todo;
  setEditID: (id: Id<"todos"> | null) => void;
  setEditText: (text: string) => void;
}
interface EditTodoViewProps {
  item: Todo;
  editID: Id<"todos"> | null;
  setEditID: (id: Id<"todos"> | null) => void;
  setEditText: (text: string) => void;
  editText: string;
}
const TodoCard = ({ item }: { item: Todo }) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const [editID, setEditID] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  return (
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.todoItem}
      >
        <CompletedCheckBox item={item} />
        {editID !== item._id ? (
          <TodoTextAndActions
            item={item}
            setEditID={setEditID}
            setEditText={setEditText}
          />
        ) : (
          <EditingTodoView
            item={item}
            editID={editID}
            setEditID={setEditID}
            setEditText={setEditText}
            editText={editText}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default TodoCard;

const CompletedCheckBox = ({ item }: { item: Todo }) => {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };
  return (
    <TouchableOpacity
      style={styles.checkbox}
      activeOpacity={0.7}
      onPress={() => handleToggleTodo(item._id)}
    >
      <LinearGradient
        colors={
          item.isCompleted ? colors.gradients.success : colors.gradients.muted
        }
        style={[
          styles.checkboxInner,
          {
            borderColor: item.isCompleted ? "transparent" : colors.border,
          },
        ]}
      >
        {item.isCompleted && (
          <Ionicons name="checkmark" size={18} color={"#ffff"} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const TodoTextAndActions = ({
  item,
  setEditID,
  setEditText,
}: TodoTextAndActionsProps) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive", //does not show on android
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={[
          styles.todoText,
          item.isCompleted && {
            textDecorationLine: "line-through",
            color: colors.textMuted,
            opacity: 0.6,
          },
        ]}
      >
        {item.text}
      </Text>
      <View style={styles.todoActions}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setEditID(item._id);
            setEditText(item.text);
          }}
        >
          <LinearGradient
            colors={colors.gradients.warning}
            style={styles.actionButton}
          >
            <Ionicons name="pencil" size={14} color={"#ffff"} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleDeleteTodo(item._id)}
        >
          <LinearGradient
            colors={colors.gradients.danger}
            style={styles.actionButton}
          >
            <Ionicons name="trash" size={14} color={"#ffff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const EditingTodoView = ({
  item,
  editID,
  setEditID,
  setEditText,
  editText,
}: EditTodoViewProps) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const editTodo = useMutation(api.todos.updateTodo);
  const handleCancelEdit = () => {
    setEditID(null);
    setEditText("");
  };
  const handleEditTodo = async () => {
    if (editID) {
      try {
        await editTodo({ id: editID, text: editText.trim() });
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Failed to edit todo");
      } finally {
        handleCancelEdit();
      }
    }
  };
  return (
    <View style={styles.editContainer}>
      <TextInput
        style={styles.editInput}
        value={editText}
        onChangeText={setEditText}
        autoFocus
        // onSubmitEditing={handleEditTodo}
        placeholder="Edit your todo..."
        placeholderTextColor={colors.textMuted}
      />
      <View style={styles.editButtons}>
        <TouchableOpacity onPress={handleEditTodo} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.success}
            style={styles.editButton}
          >
            <Ionicons name="checkmark" size={16} color={"#ffff"} />
            <Text style={styles.editButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.muted}
            style={styles.editButton}
          >
            <Ionicons name="close" size={16} color={"#ffff"} />
            <Text style={styles.editButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
