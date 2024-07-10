import {Button, Modal, TextInput, View, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header';
import colors from '../Reusable_Objects/color';

function Start() {
  return (
    <Modal>
        <SafeAreaView style={styles.container}>
        <Header name={"Welcome"} color={colors.purple}/>
        <View style={styles.inputCard}>
            <Header name={"Name"} ></Header>
            <TextInput style={styles.textInput}></TextInput>
            <Header name={"Email address"}></Header>
            <TextInput style={styles.textInput}></TextInput>

        </View>
        </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputCard:{
        backgroundColor: '#fff', // Set the background color
        borderRadius: 10, // Rounded corners
        padding: 20, // Padding inside the card
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Elevation for Android
        elevation: 5,
    },
    textInput: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderBottomWidth: 1
    }
});

export default Start;