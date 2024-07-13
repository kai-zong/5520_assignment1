import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import Start from "./screens/Start";
import { useState }  from 'react';
import Confirm from "./screens/Confirm";
import Game from './screens/Game';
import colors from './Reusable_Objects/color';

export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [gameIsVisible, setGameIsVisible] = useState(false);
  const [renderGame, setRenderGame] = useState(false);



  const handleStart = (name, email) => {
    setName(name);
    setEmail(email);
    setConfirmIsVisible(true);
    console.log("handlestart is called");
  };

  const handleContinue = () => {
    setConfirmIsVisible(false);
    setGameIsVisible(true);
    setRenderGame(true);
  }

  const handleGoBack = () => {
    setConfirmIsVisible(false);
  }



  return (
    <View style={styles.container}>
      <View>
      <Start startHandler={handleStart}></Start>
      <Confirm visibility={confirmIsVisible} email={email} name={name} goBackHandler={handleGoBack} continueHandler={handleContinue}></Confirm>
      { renderGame && <Game visibility={gameIsVisible}/>}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
