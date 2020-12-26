import Place from "../models/place";

// PLACES
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export interface IPlacesState {
	places: Place[];
}

interface AddPlaceAction {
	type: typeof ADD_PLACE;
	placeData: {
		id: string;
		title: string;
		image: string;
		address: string;
		coords: {
			lat: number;
			lng: number;
		};
	};
}
interface GetPlaceAction {
	type: typeof SET_PLACES;
	places: Place[];
}

export type PlacesActionTypes = AddPlaceAction | GetPlaceAction;
