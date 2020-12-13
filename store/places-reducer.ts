import Place from "../models/place";
import { ADD_PLACE, IPlacesState, PlacesActionTypes } from "./types";

const initialState: IPlacesState = {
	places: [],
};

export default (
	state: IPlacesState = initialState,
	action: PlacesActionTypes
): IPlacesState => {
	switch (action.type) {
		case ADD_PLACE:
			const newPlace = new Place(
				new Date().toString(),
				action.placeData.title,
				action.placeData.image
			);
			return {
				places: state.places.concat(newPlace),
			};
		default:
			return state;
	}
};
