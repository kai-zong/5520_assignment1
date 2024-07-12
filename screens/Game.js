import React from "react";
import { useState } from "react";
import { Modal, View, StyleSheet, Button, TextInput, Text } from "react-native";
import Header from "../components/Header";

const Game = () => {
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [guessesLeft, setGuessesLeft] = useState(3);

  return (
    <Modal>
      <View>
        <Button title="Restart" />
        <View>
          <Header name="Guess the number" color="blue" />
          <Text>Guesses left: {guessesLeft}</Text>
          <TextInput />
          <Button title="Use a Hint" />
          <Button title="Submit Guess" />
        </View>
        <Text>Game</Text>
      </View>
    </Modal>
  );
};

export default Game;

const Styles = StyleSheet.create({});
