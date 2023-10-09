export default function ImageScreen({ route, navigation }) {
    const imageUri = route?.params?.imageUri || null;
  
    return (
      <View style={styles.container}>
        {imageUri ? (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity
              style={styles.goBackButton}
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
  