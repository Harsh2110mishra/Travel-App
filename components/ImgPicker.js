import React, { useState, useEffect } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return Alert.alert("Camera Permission not granted.", "Try again!", [
        { text: "Okay" },
      ]);
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  const verifyPermissions = async () => {
    const result = await Camera.requestCameraPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert("Please!", "Grant Permission for camera", [{ text: "Okay" }]);
      return false;
    }
    return true;
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.imagePreview} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image picked yet!</Text>
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={() => {
          takeImageHandler();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default ImgPicker;
