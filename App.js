import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import Start from "./screens/Start";
import { useState }  from 'react';
import Confirm from "./screens/Confirm";
import Game from './screens/Game';

export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const handleStart = (name, email) => {
    setName(name);
    setEmail(email);
    setIsVisible(true);
    console.log("handlestart is called");
  };

  const handleGoBack = () => {
    setIsVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* <Start startHandler={handleStart}></Start>
      <Confirm visibility={isVisible} email={email} name={name} goBackHandler={handleGoBack}></Confirm> */}
      <Game/>
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
