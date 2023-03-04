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
  const [errorMessage, setErrorMessage] = useState("");

  function handleAdd() {
    if (task === "") {
      alert("preencha o input!");
      return;
    }

    const existis = list.some((t) => t.item === task);

    if (existis) {
      setErrorMessage("A tarefa já existe!");
      setTask("");

      return;
    }

    const data = {
      key: Date.now(),
      item: task,
    };

    setList((oldArray) => [data, ...oldArray]);
    setTask("");
    setErrorMessage("");
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
          onChangeText={(text) => {
            setTask(text);
            setErrorMessage("");
          }}
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
          <Task data={item} deleteItem={() => handleDelete(item.item)} />
        )}
        style={styles.list}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
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
    fontSize: 34,
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
  errorMessage: {
    color: "#ffb6c1",
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
});
