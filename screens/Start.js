import {
  Button,
  Modal,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import Header from "../components/Header";
import colors from "../Reusable_Objects/color";
import {LinearGradient} from "expo-linear-gradient";

function Start({startHandler}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameConfirmed, setNameConfirmed] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [nameFocused, setNameFocused] = useState(true);
    const [emailFocused, setEmailFocused] = useState(true);
    const [notRobot, setNotRobot] = useState(false);

    const checkName = () => {
        const isEveryCharNaN = name.split('').every(char => isNaN(char));
        setNameConfirmed(isEveryCharNaN && name.length > 1);
    };
    const checkEmail = () => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        console.log("is Valid email",isValidEmail);
        setEmailConfirmed(isValidEmail);
    };
    const checkInputs = () => {
      checkEmail(email);
      checkName(name);
      setEmailFocused(false);
      setNameFocused(false);
      console.log(name, email);
      console.log("name confirmed: ",nameConfirmed,"email confirmed: ", emailConfirmed, "name focuse: ", nameFocused, "email focused: ", emailFocused);
      if(nameConfirmed && emailConfirmed && notRobot){
        startHandler(name, email);
      }
    };

    const clearInputs = () => {
      setName("");
      setEmail("");
      setNotRobot(false);
    }
  return (
    <Modal>
      <SafeAreaView style={styles.container}>
        <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}/>
        <Header name={"Welcome"} color={colors.blue} />
        <View style={styles.inputCard}>
            <View style={styles.divison}>
          <Header name={"Name"} color={colors.purple}></Header>
          <TextInput
            value={name}
            style={styles.textInput}
            onChangeText={(text) => {
              setName(text);
            }}
            onFocus={()=>{setNameFocused(true)}}
            onBlur={()=>{checkName
              setNameFocused(false)}
            }
          ></TextInput>
          {(!nameFocused && !nameConfirmed) && <Text >Invalid Name!</Text>}
          </View>
          <View style={styles.divison}>
          <Header name={"Email address"} color={colors.purple}></Header>
          <TextInput style={styles.textInput}
          value={email}
          onChangeText={(text)=>{setEmail(text)}}
          onFocus={()=>setEmailFocused(true)}
          onBlur={()=>{checkEmail
            setEmailFocused(false)
          }} >
          </TextInput>
            { (!emailFocused && !emailConfirmed) && <Text>Invalid Email!</Text>}
            </View>
            <View style={{flexDirection:"row"}}>
              <Checkbox
              value={notRobot}
              onValueChange={(value)=>{setNotRobot(value)}}></Checkbox>
              <Text style={{marginLeft: 10}}>I am not a robot</Text>
            </View>
          <View style={styles.buttonContainer}>
          <Button
            title="Reset"
            color={colors.red}
            onPress={() => {
              clearInputs();
            }}
          ></Button>
          <Button
           title="Start"
           color={colors.white} 
           onPress={checkInputs}
           disabled={!notRobot}></Button>
        </View>
        </View>
        
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
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
