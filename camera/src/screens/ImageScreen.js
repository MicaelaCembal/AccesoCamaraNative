import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import appStyles from '../styles/appStyles.js';

export default function ImageScreen({ route, navigation }) {

  const imageUri = route?.params?.imageUri || null;
  console.log('Image URI recibida:', imageUri);
  return (
    <View style={appStyles.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={appStyles.image} />
          <TouchableOpacity
            style={appStyles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <Text>No se ha proporcionado una imagen para mostrar.</Text>
      )}
    </View>
  );
}

