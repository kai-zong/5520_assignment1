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

function Start({visibility, startHandler}) {
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
        return isEveryCharNaN && name.length > 1;
    };
    const checkEmail = () => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setEmailConfirmed(isValidEmail);
        return isValidEmail;
        
    };
    const checkInputs = () => {
      const validEmail = checkEmail();
      const validName = checkName();
      setEmailFocused(false);
      setNameFocused(false);
      console.log(name, email);
      console.log("name confirmed: ",nameConfirmed,"email confirmed: ", emailConfirmed, "name focuse: ", nameFocused, "email focused: ", emailFocused);
      if(validEmail && validName && notRobot){
        startHandler(name, email);
        console.log("here");
      }
    };

    const clearInputs = () => {
      setName("");
      setEmail("");
      setNotRobot(false);
    }
  return (
    <Modal transparent={true} visible={visibility}>
      <View style={styles.container}>
        <Header name={"Welcome"} color={colors.blue} />
        <View style={styles.inputCard}>
            <View style={styles.divison}>
          <Header name={"Name"} color={colors.purple}></Header>
          <TextInput
            value={name}
            style={styles.textInput}
            onChangeText={(text) => {
              setName(text);
              checkName();
            }}
            onFocus={()=>{setNameFocused(true)}}
            onBlur={()=>{
              checkName();
              setNameFocused(false)}
            }
          ></TextInput>
          {(!nameFocused && !nameConfirmed) && <Text >Invalid Name!</Text>}
          </View>
          <View style={styles.divison}>
          <Header name={"Email address"} color={colors.purple}></Header>
          <TextInput style={styles.textInput}
          value={email}
          onChangeText={(text)=>{setEmail(text);
            checkEmail();
          }}
          onFocus={()=>setEmailFocused(true)}
          onBlur={()=>{
            checkEmail();
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
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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
