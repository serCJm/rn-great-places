import { ADD_PLACE, PlacesActionTypes } from "./types";

export const addPlace = (title: string, image: string): PlacesActionTypes => {
	return { type: ADD_PLACE, placeData: { title, image } };
};
