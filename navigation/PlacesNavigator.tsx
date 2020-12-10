import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Colors } from "../assets/Colors";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";

const PlacesNavigator = createStackNavigator(
	{
		Places: PlacesListScreen,
		PlaceDetail: PlaceDetailScreen,
		NewPlace: NewPlaceScreen,
		Map: MapScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor:
					Platform.OS === "android" ? Colors.PRIMARY : "",
			},
			headerTintColor:
				Platform.OS === "android" ? "white" : Colors.PRIMARY,
		},
	}
);

export default createAppContainer(PlacesNavigator);
