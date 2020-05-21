import React from "react";

import { BoxRebassProps, Box } from "rebass-native";

interface CicleProps extends BoxRebassProps {
	size?: number;
}

const Circle: React.FC<CicleProps> = ({ size, ...props }) => {
	return (
		<Box
			{...props}
			borderRadius={100}
			width={size}
			height={size}
			alignItems="center"
			justifyContent="center"
		/>
	);
};

export default Circle;
