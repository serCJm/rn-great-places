import React from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceItem from "../components/PlaceItem";

interface Props {
	navigation: NavigationStackProp;
}

const PlacesListScreen: NavigationStackScreenComponent = (props: Props) => {
	const places = useSelector((state: RootState) => state.places.places);
	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<PlaceItem
					image={itemData.item.imageUri}
					title={itemData.item.title}
					address={""}
					onSelect={() => {
						props.navigation.navigate("PlaceDetail", {
							placeTitle: itemData.item.title,
							placeId: itemData.item.id,
						});
					}}
				></PlaceItem>
			)}
		></FlatList>
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
