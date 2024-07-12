import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, Button, TextInput, Text } from "react-native";
import Header from "../components/Header";
import Information from "./Information";
import colors from "../Reusable_Objects/color";

const Game = () => {
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
      initialTime={initialTime}
      initialAttempts={initialAttempts}
      onRestart={restartGame}
    />
  );
};

const GameComponent = ({ initialTime, initialAttempts, onRestart }) => {
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

  const giveHint = () => {
    setHintsGiven(true);
    if (number % 2 === 0) {
      setHint("The number is even");
    } else {
      setHint("The number is odd");
    }
  };

  const submitGuess = () => {
    const guessNumber = parseInt(guess, 10);
    if(guessNumber < 1 || guessNumber > 100) {
      setIsNumberValid(false);
      return;
    }
    setIsNumberValid(true);
    if (guessNumber === number) {
      setInfoTexts(["You win!"]);
      setInfoTexts((currentTexts) => [...currentTexts, "Attempts used: " + (initialAttempts - guessesLeft)]);
      setInfoImages([`https://picsum.photos/id/${number}/100/100`]);
      setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
      return;
    }
    if (guessesLeft === 1) {
      setInfoTexts(["You are out of Attempts!", `You lost! The correct number was ${number}.`]);
      setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
      return;
    }
    setIsInfoVisible(true);
    setInfoTexts(["Wrong guess! Try again."]);
    setInfoButtons( [{ title: "OK", onPress: () => setIsInfoVisible(false) }, {title: "End Game", onPress: onRestart}]);
    setGuessesLeft(prevGuessesLeft => prevGuessesLeft - 1);
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }

    if (timer === 0 && !isInfoVisible) {
      setInfoTexts(["Time's up! You are out of time."]);
      setIsInfoVisible(true);
      setInfoTexts((currentTexts) => [...currentTexts, `You lost! The correct number was ${number}.`]);
      setInfoButtons([{ title: "Play Again", onPress: onRestart }]);
    }
  }, [timer]);

  return (
    <View >
      <Modal visible={true}>
        <View style={styles.container}>
          <Button title="Restart" onPress={onRestart} />
          <View style={styles.guessContainer}>
            <Header name="Guess a number between 1 & 100" color="blue" />
            <TextInput
              style={styles.inputText}
              value={guess}
              onChangeText={setGuess}
              keyboardType="number-pad"
              placeholder="Enter your guess"
            />
            <Text>Guesses left: {guessesLeft}</Text>
            <Text>Timer: {timer} seconds</Text>
            {!isNumberValid && <Text>Please Enter a Number in 1 - 100</Text>}
            {hintsGiven && <Text>{hint}</Text>}
            <Button title="Use a Hint" onPress={giveHint} />
            <Button title="Submit Guess" onPress={submitGuess} />
          </View>
          <Information
        visibility={isInfoVisible}
        texts={infoTexts}
        images={infoImages}
        buttons={infoButtons}
      />
        </View>
      </Modal>
      
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  guessContainer: {
    backgroundColor: "gray",
    padding: 10,
    width: "80%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
