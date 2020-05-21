import { thunk, action, Action, Thunk } from "easy-peasy";
import AsyncStorage from "@react-native-community/async-storage";

export interface User {
	name: string;
}

export interface UserLogin {
	username: string;
	password: string;
}

export interface AuthModel {
	user: User;
	app_started: Boolean;
	authenticated: Boolean;
	setUser: Action<AuthModel, User>;
	loginSuccess: Action<AuthModel>;
	loggout: Action<AuthModel>;
	appLoading: Action<AuthModel>;
	appLoaded: Action<AuthModel>;
	signOut: Thunk<AuthModel>;
	checkLogin: Thunk<AuthModel>;
	attemptLogin: Thunk<AuthModel, UserLogin>;
}

export const authModel: AuthModel = {
	user: {
		name: "",
	},
	app_started: false,
	authenticated: false,

	setUser: action((state, user) => {
		state.user = user;
	}),
	loginSuccess: action((state) => {
		state.authenticated = true;
	}),
	loggout: action((state) => {
		state.authenticated = false;
	}),
	appLoading: action((state) => {
		state.app_started = false;
	}),
	appLoaded: action((state) => {
		state.app_started = true;
	}),
	signOut: thunk(async (actions) => {
		await AsyncStorage.removeItem("@user");
		actions.loggout();
		actions.setUser({ name: "" });
	}),
	attemptLogin: thunk(async (actions, state) => {
		if (state.username !== "admin" || state.password !== "admin") {
			throw Error("Credenciais inválidas");
		}

		const user = {
			name: state.username,
		};

		await AsyncStorage.setItem("@user", JSON.stringify(user));

		await actions.setUser(user);

		await actions.loginSuccess();
	}),
	checkLogin: thunk(async (actions) => {
		try {
			actions.appLoading();

			const user = await AsyncStorage.getItem("@user").then((userJson) =>
				JSON.parse(userJson || "")
			);

			if (user?.name) {
				actions.setUser(user);
				actions.loginSuccess();
			}
		} catch (error) {
			await actions.signOut();
		} finally {
			actions.appLoaded();
		}
	}),
};
