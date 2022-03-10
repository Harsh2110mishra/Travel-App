import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { googleApiKey } from "../constants/env";

const MapPreview = (props) => {
  console.log(props.location.lat, props.location.lng);
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${googleApiKey}`;
  }

  console.log("imagePreviewUrl:", imagePreviewUrl);

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
