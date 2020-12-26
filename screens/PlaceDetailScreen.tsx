import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import { Colors } from "../assets/Colors";

import MapPreview from "../components/MapPreview";

interface Props {
	navigation: NavigationStackProp;
}

const PlaceDetailScreen: NavigationStackScreenComponent = (props: Props) => {
	const placeId = props.navigation.getParam("placeId");
	const selectedPlace = useSelector((state: RootState) =>
		state.places.places.find((place) => place.id === placeId)
	);
	return (
		<ScrollView>
			<Image
				source={{ uri: selectedPlace?.imageUri }}
				style={styles.image}
			></Image>
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{selectedPlace?.address}</Text>
				</View>
				{selectedPlace?.lat && (
					<MapPreview
						style={styles.mapPreview}
						location={{
							lat: selectedPlace.lat,
							lng: selectedPlace.lng,
						}}
					></MapPreview>
				)}
			</View>
		</ScrollView>
	);
};

PlaceDetailScreen.navigationOptions = (navData) => {
	return {
		headerTitle: navData.navigation.getParam("placeTitle"),
	};
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
		backgroundColor: "#ccc",
	},
	locationContainer: {
		marginVertical: 20,
		width: "90%",
		maxWidth: 350,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		backgroundColor: "white",
		borderRadius: 10,
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.PRIMARY,
		textAlign: "center",
	},
	mapPreview: {
		width: "100%",
		maxWidth: 350,
		height: 300,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
});
