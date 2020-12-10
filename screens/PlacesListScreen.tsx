import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import CustomHeaderButton from "../components/CustomHeaderButton";

interface Props {
	navigation: NavigationStackProp;
}

const PlacesListScreen: NavigationStackScreenComponent = (props: Props) => {
	return (
		<View>
			<Text>PlacesListScreen</Text>
		</View>
	);
};

PlacesListScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "Places",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Add Place"
					iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
					onPress={() => {
						navData.navigation.navigate("NewPlace");
					}}
				></Item>
			</HeaderButtons>
		),
	};
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
