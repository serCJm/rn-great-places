import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
} from "react-native";
import {
	NavigationStackOptions,
	NavigationStackProp,
	NavigationStackScreenProps,
} from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { Colors } from "../assets/Colors";
import * as placesActions from "../store/places-actions";

interface Props {
	navigation: NavigationStackProp<{}>;
}

const NewPlaceScreen = (props: Props) => {
	const [titleValue, setTitleValue] = useState("");
	const dispatch = useDispatch();
	const titleChangeHandler = (text: string) => {
		setTitleValue(text);
	};
	const savePlaceHandler = () => {
		dispatch(placesActions.addPlace(titleValue));
		props.navigation.goBack();
	};
	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangeHandler}
					value={titleValue}
				></TextInput>
				<Button
					title="Save Place"
					color={Colors.PRIMARY}
					onPress={savePlaceHandler}
				></Button>
			</View>
		</ScrollView>
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

const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
});
