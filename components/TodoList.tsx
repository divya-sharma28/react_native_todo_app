import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList } from "react-native";
import LoadingSpinner from "./LoadingSpinner";

import { createHomeStyles } from "@/assets/styles/home.styles";
import { Doc } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import EmptyState from "./EmptyState";
import TodoCard from "./TodoCard";

type Todo = Doc<"todos">;
const TodoList = () => {
  const todos = useQuery(api.todos.getTodos);
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const isLoading = todos === undefined;

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return <TodoCard item={item} />;
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item._id}
      style={styles.todoList}
      contentContainerStyle={styles.todoListContent}
      ListEmptyComponent={<EmptyState />}
    />
  );
};

export default TodoList;
