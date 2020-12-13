import Place from "../models/place";

// PLACES
export const ADD_PLACE = "ADD_PLACE";
export interface IPlacesState {
	places: Place[];
}

interface AddPlaceAction {
	type: typeof ADD_PLACE;
	placeData: {
		id: string;
		title: string;
		image: string;
	};
}

export type PlacesActionTypes = AddPlaceAction;
