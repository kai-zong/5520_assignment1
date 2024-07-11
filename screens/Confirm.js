import { Modal, Text, Button, View, StyleSheet, SafeAreaView } from "react-native";
import Header from "../components/Header";
import colors from "../Reusable_Objects/color";
;

const Confirm = ({visibility, email, name, goBackHandler}) => {

    return(
        <Modal visible={visibility} transparent={true} animationType="slide">
            <SafeAreaView style={styles.container}>
                <View style={styles.messageContainer}>
                <Header name={`Hello ${name}`} color={colors.purple}/>

                <Text style={styles.message}>Here is the email that you entered:</Text>
                <Text style={styles.message}>{email}</Text>    
                <Text style={styles.message}>
                    if it is not correct, please go back and enter again.
                </Text>
                <View style={styles.buttons}>
                <Button title="Go Back" onPress={()=>{goBackHandler()}}></Button>
                <Button title="Continue" onPress={()=>{}}></Button>
                </View>
            </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    messageContainer:{
        width:"80%",
        height:"60%",
        padding:10,
        backgroundColor:colors.gray,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },

    message:{
        padding:10,
        color:colors.red
    },

    buttons:{
        flexDirection:"row",
        justifyContent:"space-around",
        
        width:"70%"
    }
});

export default Confirm;