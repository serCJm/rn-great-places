import { ADD_PLACE } from "./types";

export const addPlace = (title: string) => {
	return { type: ADD_PLACE, placeData: { title } };
};
