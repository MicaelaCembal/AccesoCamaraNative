import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation, setImageGaleria }) {
    const selectImage = async () => {
      const options = {
        title: 'Selecciona una imagen',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      try {
        const result = await ImagePicker.launchImageLibraryAsync(options);
  
        if (result.cancelled) {
          console.log('El usuario canceló la selección');
        } else {
          const path = result.uri;
          setImageGaleria(path); // Actualiza la imagen seleccionada en la galería
          navigation.navigate('ImageScreen'); // Navega a la pantalla de ImageScreen
        }
      } catch (error) {
        console.error('Error al seleccionar la imagen:', error);
      }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la aplicación de cámara</Text>
      <Button
        title="Abrir Cámara"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Seleccionar Imagen"
        onPress={() => selectImage()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
