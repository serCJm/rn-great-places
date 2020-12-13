import * as FileSystem from "expo-file-system";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../App";
import { ADD_PLACE, PlacesActionTypes } from "./types";

export const addPlace = (
	title: string,
	image: string
): ThunkAction<void, RootState, unknown, PlacesActionTypes> => {
	return async (dispatch) => {
		const fileName = image.split("/").pop() || "";
		const newPath = FileSystem.documentDirectory
			? FileSystem.documentDirectory + fileName
			: `${new Date().toISOString()}.jpg`;
		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
		return dispatch({
			type: ADD_PLACE,
			placeData: { title, image: newPath },
		});
	};
};
