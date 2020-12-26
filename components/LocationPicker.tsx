import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Button,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Colors } from "../assets/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";
import { NavigationStackProp } from "react-navigation-stack";

interface Props {
	navigation: NavigationStackProp;
}

interface IPickedLocation {
	lat: number;
	lng: number;
}

const LocationPicker = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [pickedLocation, setPickedLocation] = useState<IPickedLocation>();

	const mapPickedLocation = props.navigation.getParam("pickedLocation");

	useEffect(() => {
		if (mapPickedLocation) {
			setPickedLocation(mapPickedLocation);
		}
	}, [mapPickedLocation]);

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.LOCATION);
		if (result.status !== "granted") {
			Alert.alert(
				"No Permissions Found",
				"Need permissions to access location.",
				[{ text: "OK" }]
			);
			return false;
		}
		return true;
	};
	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		try {
			setIsLoading(true);
			const location = await Location.getCurrentPositionAsync({});
			setPickedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		} catch (e) {
			Alert.alert(
				"Could not get location!",
				"Please try again or manually pick a location on the map.",
				[{ text: "Ok" }]
			);
		}
		setIsLoading(false);
	};
	const pickOnMapHandler = () => {
		props.navigation.navigate("Map");
	};
	return (
		<View style={styles.locationPicker}>
			<MapPreview
				style={styles.mapPreview}
				location={pickedLocation}
				onPress={pickOnMapHandler}
			>
				{isLoading ? (
					<ActivityIndicator
						size="large"
						color={Colors.PRIMARY}
					></ActivityIndicator>
				) : (
					<Text>No location chosen yet!</Text>
				)}
			</MapPreview>
			<View style={styles.actions}>
				<Button
					title="Get User Location"
					color={Colors.PRIMARY}
					onPress={getLocationHandler}
				></Button>
				<Button
					title="Pick on Map"
					color={Colors.PRIMARY}
					onPress={pickOnMapHandler}
				></Button>
			</View>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 15,
	},
	mapPreview: {
		marginBottom: 10,
		width: "100%",
		height: 150,
		borderColor: "#ccc",
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
});
