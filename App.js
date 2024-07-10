import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import Start from "./screens/Start";
import { useState } from 'react';

export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleStart = (name, email) => {
    setName(name);
    setEmail(email);
  };
  const handleReset = () => {
    console.log("Resetting the app")}

  return (
    <View style={styles.container}>
      <Start startHandler={handleStart} resetHandler={handleReset}></Start>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
