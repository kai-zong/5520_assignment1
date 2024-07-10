import {
  Button,
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import colors from "../Reusable_Objects/color";

function Start({}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameConfirmed, setNameConfirmed] = useState(true);
    const [emailConfirmed, setEmailConfirmed] = useState(true);

    const checkName = () => {
        const isEveryCharNaN = name.split('').every(char => isNaN(char));
        setNameConfirmed(isEveryCharNaN && name.length > 1);
    };
    const checkEmail = () => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setEmailConfirmed(isValidEmail);
    };
  const checkInputs = () => {
    checkEmail(email);
    checkName(name);
  };
  return (
    <Modal>
      <SafeAreaView style={styles.container}>
        <Header name={"Welcome"} color={colors.blue} />
        <View style={styles.inputCard}>
            <View style={styles.divison}>
          <Header name={"Name"} color={colors.purple}></Header>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              setName(text);
            }}
            onFocus={()=>{setNameConfirmed(true)}}
            onBlur={checkName}
          ></TextInput>
          {nameConfirmed ? null : <Text >Invalid Name!</Text>}
          </View>
          <View style={styles.divison}>
          <Header name={"Email address"} color={colors.purple}></Header>
          <TextInput style={styles.textInput}
          onChangeText={(text)=>{setEmail(text)}}
          onFocus={()=>setEmailConfirmed(true)}
          onBlur={checkEmail} >
          </TextInput>
            {emailConfirmed ? null : <Text>Invalid Email!</Text>}
            </View>
          <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            color={colors.red}
            onPress={() => {
              checkInputs();
            }}
          ></Button>
          <Button title="Start" color={colors.white} onPress={checkInputs}></Button>
        </View>
        </View>
        
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputCard: {
    backgroundColor: colors.gray, // Set the background color
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the card
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  divison: {
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "purple",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    width: "50%"
  },
});

export default Start;
