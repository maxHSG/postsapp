import React from "react";
import { Text, Image, Box } from "rebass-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import Input from "@/components/Input/Input";
import theme from "@/utils/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFormik } from "formik";
import { useStoreActions } from "@/hooks";
import { UserLogin } from "@/model/auth";
import { showMessage } from "react-native-flash-message";
import Circle from "@/components/Circle";

import * as yup from "yup";

const validationSchema = yup.object({
	username: yup.string().required("O usuário é obrigatório"),
	password: yup.string().required("A senha é obrigatória"),
});

const LoginScreen = () => {
	const { attemptLogin } = useStoreActions((actions) => actions.auth);

	const { values, errors, setFieldValue, handleSubmit } = useFormik({
		initialValues: { username: "", password: "" } as UserLogin,
		validationSchema,
		onSubmit: async ({ username, password }) => {
			try {
				await attemptLogin({ username, password });
			} catch (error) {
				showMessage({
					message: error.message,
					type: "danger",
				});
			}
		},
	});

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: theme.colors.primary }}
		>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				style={{
					backgroundColor: theme.colors.primary,
				}}
			>
				<Box bg={"primary"} flex={1}>
					<Image
						style={{
							width: "100%",
							height: "100%",
						}}
						resizeMode={"cover"}
						source={require("@/assets/undraw_mobile_posts_tlwg-color.jpg")}
					/>
				</Box>

				<Box
					flex={0.6}
					px={30}
					py={20}
					bg={"white"}
					borderTopLeftRadius={50}
					borderTopRightRadius={50}
				>
					<Box flex={1} justifyContent="center">
						<Box>
							<Input
								autoCapitalize={"none"}
								value={values.username}
								onChangeText={(username: string) => {
									setFieldValue("username", username);
								}}
								placeholder="Usuário"
							/>
							{errors.username && (
								<Text color={"red"}>{errors.username}</Text>
							)}
							<Input
								autoCapitalize={"none"}
								secureTextEntry={true}
								value={values.password}
								onChangeText={(password: string) => {
									setFieldValue("password", password);
								}}
								placeholder="Senha"
							/>
							{errors.password && (
								<Text color={"red"}>{errors.password}</Text>
							)}
						</Box>
					</Box>
					<TouchableWithoutFeedback onPress={handleSubmit}>
						<Box
							flex={1}
							alignItems="center"
							justifyContent="space-between"
							flexDirection="row"
						>
							<Text fontSize={5} fontWeight="bold">
								Entrar
							</Text>
							<Circle bg={"primary"} size={70}>
								<Icon
									name="arrow-right"
									size={25}
									color="white"
								/>
							</Circle>
						</Box>
					</TouchableWithoutFeedback>
				</Box>
			</ScrollView>
		</SafeAreaView>
	);
};

export default LoginScreen;
