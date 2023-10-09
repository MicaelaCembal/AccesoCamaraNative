import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Button from '../components/Button';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);
    const [imageGaleria, setImageGaleria] = useState("");
   
  
    useEffect(() => {
      (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === "granted");
      })();
    }, []);
  
    const takePicture = async () => {
      if (cameraRef) {
        try {
          const data = await cameraRef.current.takePictureAsync();
          console.log(data);
          setImage(data.uri);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const savePicture = async () => {
      if (image) {
        try {
          const asset = await MediaLibrary.createAssetAsync(image);
          alert("¡Foto guardada! 🎉");
          setImage(null);
          console.log("saved successfully");
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    if (hasCameraPermission === false) {
      return <Text>No tienes acceso a la cámara</Text>;
    }
  
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
          setImageGaleria(path);
        }
      } catch (error) {
        console.error('Error al seleccionar la imagen:', error);
      }
    };
  return (
    <View style={styles.container}>
      <View style={styles.topControls}>
        <Button
          onPress={() =>
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
            )
          }
          icon="flash"
          color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
        />
        <Button onPress={selectImage} icon="image" color="red" />
      </View>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Volver a sacar"
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Guardar" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Sacá una foto" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});