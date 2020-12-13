import React, { useState } from "react";
import { Button, StyleSheet, Text, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Colors } from "../assets/Colors";

interface Props {
	onImageTake: (imageUri: string) => void;
}

const ImagePickerComponent = (props: Props) => {
	const [pickedImage, setPickedImage] = useState("");
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
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		if (!image.cancelled) {
			setPickedImage(image.uri);
			props.onImageTake(image.uri);
		}
	};
	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>No image picked yet.</Text>
				) : (
					<Image
						style={styles.image}
						source={{ uri: pickedImage }}
					></Image>
				)}
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
		marginBottom: 15,
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
