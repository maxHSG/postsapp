declare module "rebass-native" {
	import {
		TextProps,
		ImageProps,
		ViewProps,
		ViewStyle,
		TextStyle,
	} from "react-native";

	interface RebassProps {
		p?: number;
		px?: number;
		py?: number;
		m?: number;
		mb?: number;
		mr?: number;
		ml?: number;
		mt?: number;
		my?: number;
		mx?: number;
		bg?: string;
	}

	export interface BoxRebassProps extends RebassProps, ViewProps, ViewStyle {}

	export interface TextRebassProps
		extends RebassProps,
			TextProps,
			TextStyle {}

	export const Box: React.FunctionComponent<BoxRebassProps>;
	export const Flex: React.FunctionComponent<BoxRebassProps>;
	export const Text: React.FunctionComponent<TextRebassProps>;
	export const Truncate: React.FunctionComponent<TextRebassProps>;
	export const Image: React.FunctionComponent<ImageProps>;
	export const Provider: any;
}
