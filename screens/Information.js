import React from 'react';
import { Text, Modal, View, Image, Button, SafeAreaView, StyleSheet } from 'react-native';
import colors from '../Reusable_Objects/color';

const Information = ({ visibility, texts, images, buttons, winning }) => {
  return (
    
    <Modal visible={visibility} transparent={true} animationType="slide">
        <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        {texts.map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
        {winning && images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ))}
        {!winning && (
            <Image key={"lose-image"} source={require("../res/frowny-face.jpeg")} style={{ width: 100, height: 100 }} />
          )}
        <View style={styles.buttons}>
        {buttons.map((button, index) => (
          <Button key={index} title={button.title} onPress={button.onPress} />
        ))}
      </View>
      </View>
      </SafeAreaView>
    </Modal>
    
  );
};

export default Information;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    infoContainer:{
        width:"80%",
        height:"60%",
        padding:10,
        backgroundColor:colors.gray,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    buttons:{
        marginTop:20,
        flexDirection:"row",
        justifyContent:"space-around",
        width:"70%"
    }
});