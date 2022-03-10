import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/placesActions";
import * as FileSystem from "expo-file-system";

import { insertData } from "../helper/db";
import { googleApiKey } from "../constants/env";

import ImgPicker from "../components/ImgPicker";
import Colors from "../constants/Colors";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // add validation here
    setTitleValue(text);
  };

  const ImageTakenHandler = (imgPath) => {
    setSelectedImage(imgPath);
  };

  const fileMoveHandler = async () => {
    try {
      const fileName = selectedImage.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({
        from: selectedImage,
        to: newPath,
      });
      return newPath;
    } catch (err) {
      console.log("Error:", err);
      Alert.alert("Can't move this file.", "Try again!", [{ text: "Okay" }]);
    }
  };
  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);
  const savePlaceHandler = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=${googleApiKey}`
      );
      console.log("response:", response);
      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }

      const resData = await response.json();
      // if (!resData.results) {
      //   throw new Error("Something went wrong!");
      // }
      console.log("selectedLocation", selectedLocation);

      const address = resData.results[0].formatted_address;

      const newPath = await fileMoveHandler();
      const dbResult = await insertData(
        titleValue,
        newPath,
        address,
        selectedLocation.lat,
        selectedLocation.lng
      );
      await dispatch(
        placesActions.addPlace(
          dbResult.insertId,
          titleValue,
          newPath,
          selectedLocation
        )
      );
      props.navigation.goBack();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker onImageTaken={ImageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
