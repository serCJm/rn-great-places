import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { MapEvent, Marker } from "react-native-maps";

interface Props {}

interface ISelectedLocation {
	lat: number;
	lng: number;
}

const MapScreen = (props: Props) => {
	const [
		selectedLocation,
		setSelectedLocation,
	] = useState<ISelectedLocation>();
	const mapRegion = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	const selectLocationHandler = (event: MapEvent) => {
		setSelectedLocation({
			lat: event.nativeEvent.coordinate.latitude,
			lng: event.nativeEvent.coordinate.longitude,
		});
	};

	let markerCoordinates;

	if (selectedLocation) {
		markerCoordinates = {
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng,
		};
	}

	return (
		<MapView
			style={styles.map}
			region={mapRegion}
			onPress={selectLocationHandler}
		>
			{markerCoordinates && (
				<Marker
					title="Picked Location"
					coordinate={markerCoordinates}
				></Marker>
			)}
		</MapView>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
