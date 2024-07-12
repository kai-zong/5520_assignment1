import React from 'react';
import { Text, Modal, View, Image, Button } from 'react-native';

const Information = ({ visibility, texts, images, buttons }) => {
  return (
    <Modal visible={visibility} transparent={true}>
      <View>
        {texts.map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
      </View>
      <View>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ))}
      </View>
      <View>
        {buttons.map((button, index) => (
          <Button key={index} title={button.title} onPress={button.onPress} />
        ))}
      </View>
    </Modal>
  );
};

export default Information;
