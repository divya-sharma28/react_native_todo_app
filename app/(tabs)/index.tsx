import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Index = () => {
  // const todos = useQuery(api.todos.getTodos);
  // console.log(todos);

  // const addTodo =useMutation(api.todos.addTodo)
  // const clearTodos =useMutation(api.todos.deleteAllTodos)
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <TodoInput />
        <TodoList/>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Index;
// const createStyles = (colors: ColorScheme) => {
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       gap: 10,
//       backgroundColor: colors.bg,
//     },
//     content: {
//       fontSize: 22,
//     },
//   });

//   return styles;
// };
