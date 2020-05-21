import React from "react";

import { useStoreState } from "../hooks";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostsListScreen from "../screens/Posts/PostsListScreen";
import LoginScreen from "../screens/Login/LoginScreen";

const Stack = createStackNavigator();

const Routes = () => {
	const auth = useStoreState((state) => state.auth);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!auth.authenticated ? (
					<Stack.Screen
						name="Login"
						options={{ header: () => null }}
						component={LoginScreen}
					/>
				) : (
					<Stack.Screen
						name="Posts"
						options={{ header: () => null }}
						component={PostsListScreen}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default Routes;
