import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, { text: newTodo, id: Date.now() }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setEditing(null);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editing ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos);
    setNewTodo('');
    setEditing(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new to-do"
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <View style={styles.buttonContainer}>
        {editing === null ? (
          <Button title="Add To-Do" onPress={addTodo} />
        ) : (
          <Button title="Update" onPress={updateTodo} />
        )}
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditing(item.id)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#B0D9B1',
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#D0E7D2',
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
