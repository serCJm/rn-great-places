import Place from "../models/place";
import {
	ADD_PLACE,
	IPlacesState,
	PlacesActionTypes,
	SET_PLACES,
} from "./types";

const initialState: IPlacesState = {
	places: [],
};

export default (
	state: IPlacesState = initialState,
	action: PlacesActionTypes
): IPlacesState => {
	switch (action.type) {
		case SET_PLACES:
			return {
				places: action.places.map((pl) => {
					return new Place(pl.id.toString(), pl.title, pl.imageUri);
				}),
			};
		case ADD_PLACE:
			const newPlace = new Place(
				action.placeData.id,
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
