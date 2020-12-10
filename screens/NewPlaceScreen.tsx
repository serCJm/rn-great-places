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
	NavigationStackScreenProps,
} from "react-navigation-stack";
import { Colors } from "../assets/Colors";

interface Props {}

const NewPlaceScreen = (props: Props) => {
	const [titleValue, setTitleValue] = useState("");
	const titleChangeHandler = (text: string) => {
		setTitleValue(text);
	};
	const savePlaceHandler = () => {};
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
