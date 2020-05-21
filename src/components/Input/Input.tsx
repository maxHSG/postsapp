import React from "react";

import styled from "styled-components/native";

import { TextInput, TextInputProps } from "react-native";

import theme from "@/utils/theme";

interface Props extends TextInputProps {}

const InputBase: React.FC<Props> = styled(TextInput).attrs({
	placeholderTextColor: theme.colors.lightgray,
	underlineColorAndroid: "transparent",
})`
	border-bottom-color: lightgray;
	border-bottom-width: 2px;
	font-size: 24px;
	margin: 12px 0;
	font-weight: bold;
	color: gray;
`;

const Input: React.FC<Props> = ({ ...props }) => {
	return <InputBase {...props} />;
};

export default Input;
