import React, {useState} from "react";
import ImageScreen from "./src/screens/ImageScreen";
import CameraScreen from "./src/screens/CameraScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  const [imageGaleria, setImageGaleria] = useState(""); 

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={() => (
          <HomeScreen setImageGaleria={setImageGaleria} /> 
        )}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="ImageScreen">
        {(props) => (
          <ImageScreen {...props} imageUri={imageGaleria} /> 
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

