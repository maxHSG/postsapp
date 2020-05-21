module.exports = {
	root: true,
	extends: "@react-native-community",
	plugins: ["@typescript-eslint"],
	rules: {
		"react-native/no-inline-styles": 0,
		"linebreak-style": [
			"error",
			process.platform === "win32" ? "windows" : "unix",
		],

		quotes: [2, "double", { avoidEscape: true }],
		semi: [2, "always"],
	},
};
