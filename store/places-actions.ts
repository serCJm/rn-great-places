import * as FileSystem from "expo-file-system";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../App";
import { insertPlace } from "../helpers/db";
import { ADD_PLACE, PlacesActionTypes } from "./types";
import * as SQLite from "expo-sqlite";

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
			const dbResult: SQLite.SQLResultSet = (await insertPlace(
				title,
				image,
				"address",
				15.6,
				17.6
			)) as SQLite.SQLResultSet;
			console.log(dbResult);
			dispatch({
				type: ADD_PLACE,
				placeData: {
					id: dbResult.insertId.toString(),
					title,
					image: newPath,
				},
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	};
};
