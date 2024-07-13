import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import Start from "./screens/Start";
import { useState }  from 'react';
import Confirm from "./screens/Confirm";
import Game from './screens/Game';
import colors from './Reusable_Objects/color';
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmIsVisible, setConfirmIsVisible] = useState(false);
  const [gameIsVisible, setGameIsVisible] = useState(false);
  const [renderGame, setRenderGame] = useState(false);
  const [startIsVisible, setStartIsVisible] = useState(true);



  const handleStart = (name, email) => {
    setName(name);
    setEmail(email);
    setConfirmIsVisible(true);
    setStartIsVisible(false);
  };

  const handleContinue = () => {
    setConfirmIsVisible(false);
    setGameIsVisible(true);
    setRenderGame(true);
  }

  const handleGoBack = () => {
    setConfirmIsVisible(false);
    setStartIsVisible(true);
  }

  const handleRestart = () => {
    setGameIsVisible(false);
    setRenderGame(false);
    setConfirmIsVisible(false);
    setStartIsVisible(true);
    setName("");
    setEmail("");
  }

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}/>
      <View>
      {!gameIsVisible && (
        <Start visibility={startIsVisible} startHandler={handleStart}></Start>
      )}
      {console.log("confirmVisible: ", confirmIsVisible)}
      {confirmIsVisible && (
        <Confirm 
          visibility={confirmIsVisible} 
          email={email} 
          name={name} 
          goBackHandler={handleGoBack} 
          continueHandler={handleContinue} 
        />
      )}
      {renderGame && (
          <Game 
            startHandler={handleRestart}
            visibility={gameIsVisible} 
          />
      )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 9999, // Ensure this is on top of the modal
  },
});
