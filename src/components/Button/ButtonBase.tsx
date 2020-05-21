import { ComponentType } from "react";
import {
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedbackProps,
	TouchableOpacityProps,
} from "react-native";

const ButtonBase: ComponentType<
	TouchableOpacityProps | TouchableNativeFeedbackProps
> = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export default ButtonBase;
