import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ViewStyle,
	TouchableOpacity,
} from "react-native";
import ENV from "../env";

interface Props {
	style: ViewStyle;
	location:
		| {
				lat: number;
				lng: number;
		  }
		| undefined;
	onPress: () => void;
	children?: React.ReactNode;
}

const MapPreview = (props: Props) => {
	let imagePreviewUrl;
	if (props.location) {
		`https://maps.googleapis.com/maps/api/staticmap?center=${
			props.location.lat
		},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap
	&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}
	&key=${ENV().googleApiKey}`;
	}
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{ ...styles.mapPreview, ...props.style }}
		>
			{props.location ? (
				<Image
					style={styles.mapImage}
					source={{ uri: imagePreviewUrl }}
				></Image>
			) : (
				props.children
			)}
		</TouchableOpacity>
	);
};

export default MapPreview;

const styles = StyleSheet.create({
	mapPreview: {
		justifyContent: "center",
		alignItems: "center",
	},
	mapImage: {
		width: "100%",
		height: "100%",
	},
});
