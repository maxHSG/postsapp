import React, { useEffect } from "react";

import { useStoreState, useStoreActions } from "./src/hooks";

import Routes from "./src/routes";

import { Text, Box } from "rebass-native";
import { StatusBar } from "react-native";
import theme from "@/utils/theme";

const App = () => {
	const authState = useStoreState((state) => state.auth);

	const checkLogin = useStoreActions((actions) => actions.auth.checkLogin);

	useEffect(() => {
		checkLogin();
	}, [checkLogin]);

	if (!authState.app_started) {
		return (
			<Box
				flex={1}
				bg="primary"
				justifyContent="center"
				alignItems="center"
				children={
					<Text fontSize={3} color="white">
						Carregando...
					</Text>
				}
			/>
		);
	}

	return (
		<Box flex={1}>
			<StatusBar backgroundColor={theme.colors.primary} />
			<Routes />
		</Box>
	);
};

export default App;
