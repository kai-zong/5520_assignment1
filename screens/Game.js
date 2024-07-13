import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Button, TextInput, Text, SafeAreaView } from "react-native";
import Header from "../components/Header";
import Information from "./Information";
import colors from "../Reusable_Objects/color";

const Game = ({visibility}) => {
  const initialTime = 60;
  const initialAttempts = 4;
  const [gameKey, setGameKey] = useState(0);

  // Function to restart the game
  const restartGame = () => {
    setGameKey(prevKey => prevKey + 1);
  };

  return (
    <GameComponent
      key={gameKey}
      visibility={visibility}
      initialTime={initialTime}
      initialAttempts={initialAttempts}
      onRestart={restartGame}
    />
  );
};

const GameComponent = ({ initialTime, initialAttempts, onRestart, visibility}) => {
  const [timer, setTimer] = useState(initialTime);
  const [guessesLeft, setGuessesLeft] = useState(initialAttempts);
  const [hint, setHint] = useState("");
  const [hintsGiven, setHintsGiven] = useState(false);
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [infoTexts, setInfoTexts] = useState([]);
  const [infoImages, setInfoImages] = useState([]);
  const [infoButtons, setInfoButtons] = useState([]);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isWinning, setIsWinning] = useState(false);
  const [isGameVisible, setIsGameVisible] = useState(true);

  const giveHint = () => {
    setHintsGiven(true);
    if (number % 2 === 0) {
      setHint("The number is even");
    } else {
      setHint("The number is odd");
    }
  };

  const endGame = () => {
    setIsInfoVisible(true);
    setIsGameVisible(false);
    setInfoTexts(["You ended the game!"]);
    setInfoImages([]);
    setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
    setIsWinning(false);
  };

  const submitGuess = () => {
    
    const guessNumber = parseInt(guess, 10);
    if(guessNumber < 1 || guessNumber > 100 || isNaN(guessNumber)) {
      setIsNumberValid(false);
      return;
    }
    setIsNumberValid(true);
    if (guessNumber === number) {
      const updatedGuessesLeft = guessesLeft - 1;
      setIsGameVisible(false);
      setIsInfoVisible(true);
      setGuessesLeft(updatedGuessesLeft);
      setInfoTexts(["You win!", `Attempts used: ${initialAttempts - updatedGuessesLeft}`]);
      setInfoImages([`https://picsum.photos/id/${number}/100/100`]);
      setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
      setIsWinning(true);
      return;
    }
    if (guessesLeft === 1) {
      setIsWinning(false);
      setIsGameVisible(false);
      setIsInfoVisible(true);
      setInfoTexts(["You are out of Attempts!", `You lost! The correct number was ${number}.`]);
      setInfoImages([]);
      setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
      return;
    }
    setGuessesLeft(prevGuessesLeft => prevGuessesLeft - 1);
    setIsWinning(true);
    setIsInfoVisible(true);
    setIsGameVisible(false);
    setInfoImages([]);
    setInfoTexts(["Wrong guess! Try again."]);
    setInfoButtons( [{ title: "OK", onPress: () => {setIsInfoVisible(false)
      setGuess("");
      setIsGameVisible(true);
    } }, {title: "End Game", onPress: endGame}]);
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }

    if (timer === 0 && !isInfoVisible) {
      setIsWinning(false);
      setIsGameVisible(false);
      setInfoTexts(["Time's up! You are out of time."]);
      setIsInfoVisible(true);
      setInfoTexts((currentTexts) => [...currentTexts, `You lost! The correct number was ${number}.`]);
      setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
    }
  }, [timer]);

  return (
    <Modal visible={visibility} transparent={true} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.restartButtonContainer}>
          <Button title="Restart" onPress={onRestart} style={styles.restartButton} />
        </View>
        {isGameVisible && <View style={styles.guessContainer}>
          <Header name="Guess a number between 1 & 100" color="blue" />
          <TextInput
            style={styles.inputText}
            value={guess}
            onChangeText={setGuess}
            keyboardType="number-pad"
            placeholder="Enter your guess"
          />
          <Text>{number}</Text>
          <Text>Guesses left: {guessesLeft}</Text>
          <Text>Timer: {timer} seconds</Text>
          {!isNumberValid && <Text style={styles.errorText}>Please Enter a Number in 1 - 100</Text>}
          {hintsGiven && <Text>{hint}</Text>}
          <View style={styles.buttonRow}>
          <Button title="Use a Hint" onPress={giveHint} />
          <Button title="Submit Guess" onPress={submitGuess} />
          </View>
          </View>}
          
            {isInfoVisible && <Information
              texts={infoTexts}
              images={infoImages}
              buttons={infoButtons}
              winning={isWinning}
            />}
          
      </SafeAreaView>
    </Modal>
  );
};

export default Game;

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  restartButtonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  guessContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
