import React from "react";

import ButtonBase from "./ButtonBase";

import { Box, BoxRebassProps } from "rebass-native";

const ButtonCircle: React.FC<BoxRebassProps> = (props) => {
	return (
		<ButtonBase>
			<Box
				{...props}
				height={70}
				borderRadius={100}
				width={70}
				alignItems="center"
				justifyContent="center"
			/>
		</ButtonBase>
	);
};

export default ButtonCircle;
