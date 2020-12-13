import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

interface Props {}

const PlaceDetailScreen: NavigationStackScreenComponent = (props: Props) => {
	return (
		<View>
			<Text>PlaceDetailScreen</Text>
		</View>
	);
};

PlaceDetailScreen.navigationOptions = (navData) => {
	return {
		headerTitle: navData.navigation.getParam("placeTitle"),
	};
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({});
