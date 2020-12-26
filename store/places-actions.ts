import * as FileSystem from "expo-file-system";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../App";
import { insertPlace, fetchPlaces } from "../helpers/db";
import { ADD_PLACE, PlacesActionTypes, SET_PLACES } from "./types";
import * as SQLite from "expo-sqlite";
import Place from "../models/place";
import { IPickedLocation } from "../components/LocationPicker";

export const addPlace = (
	title: string,
	image: string,
	location: IPickedLocation | undefined
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
				newPath,
				"address",
				15.6,
				17.6
			)) as SQLite.SQLResultSet;

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

interface ISQLResultSet extends SQLite.SQLResultSet {
	rows: {
		_array: Place[];
		length: number;
		item(index: number): any;
	};
}

export const getPlaces = (): ThunkAction<
	void,
	RootState,
	unknown,
	PlacesActionTypes
> => {
	return async (dispatch) => {
		try {
			const dbResult = (await fetchPlaces()) as ISQLResultSet;
			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} catch (e) {
			console.log(e);
			throw e;
		}
	};
};
