import React from 'react';

import 'react-native-gesture-handler';

import { name as appName } from './app.json';

import { AppRegistry } from 'react-native';

import App from './App';

import { StoreProvider } from 'easy-peasy';

import { ThemeProvider } from 'styled-components/native';

import store from './src/store';

import FlashMessage from 'react-native-flash-message';

import theme from './src/utils/theme';

const AppRoot = () => {
	return (
		<ThemeProvider theme={theme}>
			<StoreProvider store={store}>
				<App />

				<FlashMessage position="top" />
			</StoreProvider>
		</ThemeProvider>
	);
};

AppRegistry.registerComponent(appName, () => AppRoot);
