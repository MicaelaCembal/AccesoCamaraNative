import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImageScreen({ route, navigation }) {
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  goBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
