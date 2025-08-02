import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleAddTask = () => {
    if (task.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
    Keyboard.dismiss();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updated);
  };

  const deleteTask = (id: number) => {
    const updated = tasks.filter((item) => item.id !== id);
    setTasks(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔥 Avinash's Super To-Do</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Type a task..."
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Animated.View style={[styles.taskContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => toggleTask(item.id)}
            >
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? "#4CAF50" : "#ccc"}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.taskText,
                item.completed && styles.taskTextDone,
              ]}
            >
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Ionicons name="trash" size={22} color="#ff4444" />
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    color: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  addButton: {
    padding: 2,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#777",
  },
});
