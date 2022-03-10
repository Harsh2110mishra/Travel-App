import { ADD_PLACES, FETCH_PLACES } from "./placesActions";
import Place from "../Models/Place";

initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES: {
      return {
        places: action.places.map((pl) => {
          return new Place(pl.id.toString(), pl.title, pl.imageUri);
        }),
      };
    }
    case ADD_PLACES: {
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri
      );
      return { places: state.places.concat(newPlace) };
    }
    default:
      return state;
  }
};
