import React from "react";
import { Button, StyleSheet, Text, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Colors } from "../assets/Colors";

interface Props {}

const ImagePickerComponent = (props: Props) => {
	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(
			Permissions.CAMERA,
			Permissions.CAMERA_ROLL
		);
		if (result.status !== "granted") {
			Alert.alert(
				"No Permissions Found",
				"Need permissions to access camera.",
				[{ text: "OK" }]
			);
			return false;
		}
		return true;
	};
	const takeImageHandler = async () => {
		const hasPermissions = await verifyPermissions();
		if (!hasPermissions) return;
		ImagePicker.launchCameraAsync();
	};
	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				<Text>No image picked yet.</Text>
				<Image style={styles.image}></Image>
			</View>
			<Button
				title="Take Image"
				color={Colors.PRIMARY}
				onPress={takeImageHandler}
			></Button>
		</View>
	);
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: "center",
	},
	imagePreview: {
		width: "100%",
		height: 200,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#ccc",
		borderWidth: 1,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
