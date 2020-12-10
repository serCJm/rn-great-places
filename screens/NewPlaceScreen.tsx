import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	NavigationStackOptions,
	NavigationStackScreenProps,
} from "react-navigation-stack";

interface Props {}

const NewPlaceScreen = (props: Props) => {
	return (
		<View>
			<Text>NewPlaceScreen</Text>
		</View>
	);
};

NewPlaceScreen.navigationOptions = (
	navData: NavigationStackScreenProps
): NavigationStackOptions => {
	return {
		headerTitle: "Add New Place",
	};
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});
