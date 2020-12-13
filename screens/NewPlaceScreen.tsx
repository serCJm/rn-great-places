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
	NavigationStackProp,
	NavigationStackScreenComponent,
} from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { Colors } from "../assets/Colors";
import ImagePickerComponent from "../components/ImagePicker";
import * as placesActions from "../store/places-actions";

interface Props {
	navigation: NavigationStackProp;
}

const NewPlaceScreen: NavigationStackScreenComponent = (props: Props) => {
	const [titleValue, setTitleValue] = useState("");
	const [selectedImage, setSelectedImage] = useState("");
	const dispatch = useDispatch();
	const titleChangeHandler = (text: string) => {
		setTitleValue(text);
	};
	const savePlaceHandler = () => {
		dispatch(placesActions.addPlace(titleValue, selectedImage));
		props.navigation.goBack();
	};
	const imageTakenHandler = (imagePath: string) => {
		setSelectedImage(imagePath);
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
				<ImagePickerComponent
					onImageTake={imageTakenHandler}
				></ImagePickerComponent>
				<Button
					title="Save Place"
					color={Colors.PRIMARY}
					onPress={savePlaceHandler}
				></Button>
			</View>
		</ScrollView>
	);
};

NewPlaceScreen.navigationOptions = (navData) => {
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
