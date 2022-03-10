export const ADD_PLACES = "ADD_PLACES";
export const FETCH_PLACES = "FETCH_PLACES";

export const addPlace = (id, title, imageUri) => {
  console.log("id:", id);
  console.log("title:", title);
  return {
    type: ADD_PLACES,
    placeData: {
      id: id,
      title: title,
      imageUri: imageUri,
      address: address,
      coords: {
        lat: location.lat,
        lng: location.lng,
      },
    },
  };
};

export const fetchPlaces = (dbResult) => {
  return {
    type: FETCH_PLACES,
    places: dbResult.rows._array, //changes need here
  };
};
