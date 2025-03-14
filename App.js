import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, Button } from 'react-native';
import { CheckBox } from '@rneui/themed';

const App = () => {
  const [checklist, setChecklist] = useState([
    { id: '1', task: 'Task One', completed: false },
    { id: '2', task: 'Task Two', completed: false },
    { id: '3', task: 'Task Three', completed: false },
    { id: '4', task: 'Task Four', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle task completion state
  const toggleCheckbox = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Render individual item in the checklist
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <CheckBox value={item.completed} onPress={() => toggleCheckbox(item.id)} />
        <Text
          style={[
            styles.task,
            item.completed ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : null,
          ]}
        >
          {item.task}
        </Text>
      </View>
    );
  };

  // Handle adding a new task to the checklist
  const addTask = () => {
    if (newTask.trim() === '') return; // Avoid adding empty tasks
    setChecklist((prevChecklist) => [
      ...prevChecklist,
      { id: String(prevChecklist.length + 1), task: newTask, completed: false },
    ]);
    setNewTask(''); // Clear the input field after adding the task
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={checklist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter task here"
        value={newTask}
        onChangeText={setNewTask} // Update the state with the input text
      />
      <Button title="Add Task" onPress={addTask} /> {/* Button to add the task */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  task: {
    fontSize: 18,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
});

export default App;
