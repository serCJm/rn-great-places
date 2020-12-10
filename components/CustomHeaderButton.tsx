import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../assets/Colors";

interface Props {}

const CustomHeaderButton = (props: Props) => {
	return (
		<HeaderButton
			{...props}
			IconComponent={Ionicons}
			iconSize={23}
			color={Platform.OS === "android" ? "white" : Colors.PRIMARY}
			title=""
		></HeaderButton>
	);
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
