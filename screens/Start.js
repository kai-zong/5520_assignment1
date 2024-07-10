import {
  Button,
  Modal,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import colors from "../Reusable_Objects/color";

function Start() {
  const checkInputs = () => {
    console.log("Checking inputs");
  };
  return (
    <Modal>
      <SafeAreaView style={styles.container}>
        <Header name={"Welcome"} color={colors.blue} />
        <View style={styles.inputCard}>
          <Header name={"Name"} color={colors.purple}></Header>
          <TextInput
            style={[styles.textInput, { marginBottom: 20 }]}
          ></TextInput>
          <Header name={"Email address"} color={colors.purple}></Header>
          <TextInput style={styles.textInput}></TextInput>
          <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            color={colors.red}
            onPress={() => {
              checkInputs();
            }}
          ></Button>
          <Button title="sfd"></Button>
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
