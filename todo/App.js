import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import Task from "./src/task.js";

export default function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  function handleAdd() {
    if (task === "") {
      alert("preencha o input!");
      return;
    }

    const data = {
      key: Date.now(),
      item: task,
    };

    setList((oldArray) => [data, ...oldArray]);
    setTask("");
  }

  function handleDelete(item) {
    let filterItem = list.filter((task) => {
      return task.item != item;
    });

    setList(filterItem);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tasks}>Tarefas</Text>

      <View style={styles.containerInput}>
        <TextInput
          value={task}
          onChangeText={(text) => setTask(text)}
          placeholder="Digite sua tarefa..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Task 
            data={item} 
            deleteItem={
              () => handleDelete(item.item)
            } />
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22272e",
    paddingTop: 28,
  },
  tasks: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#FFF",
    marginTop: "5%",
    paddingStart: "5%",
    marginBottom: 12,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  input: {
    width: "75%",
    backgroundColor: "#fbfbfb",
    height: 54,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonAdd: {
    width: "15%",
    height: 44,
    backgroundColor: "#73f7ff",
    marginLeft: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  list: {
    flex: 1,
    backgroundColor: "#fff",
    items: "center",
  },
});
