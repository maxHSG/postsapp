import React, { useEffect } from "react";

import Modal from "react-native-modal";
import { Box, Text } from "rebass-native";
import Input from "@/components/Input/Input";
import ButtonBase from "@/components/Button/ButtonBase";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native";
import theme from "@/utils/theme";
import Circle from "@/components/Circle";
import { useFormik } from "formik";
import * as yup from "yup";
import { useStoreActions } from "@/hooks";
import uid from "uid";

interface Props {
	isVisible: boolean;
	onSwipeComplete: () => void;
}

const validationSchema = yup.object({
	title: yup.string().required("O título é obrigatório"),
	text: yup.string().required("O texto é obrigatório"),
});

const PostsAddScreen: React.FC<Props> = (props) => {
	const addPost = useStoreActions((actions) => actions.posts.storePost);

	const {
		values,
		resetForm,
		handleSubmit,
		setFieldValue,
		errors,
	} = useFormik({
		initialValues: { title: "", text: "" },
		validationSchema,
		onSubmit: ({ title, text }) => {
			addPost({
				uid: uid(),
				title,
				text,
				date: new Date(),
			});

			resetForm();

			props.onSwipeComplete();
		},
	});

	useEffect(() => {
		resetForm();
	}, [resetForm, props.isVisible]);

	return (
		<Modal
			{...props}
			useNativeDriver
			swipeDirection={["left", "right", "down"]}
			style={{ justifyContent: "flex-end", margin: 0 }}
		>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "flex-end",
					margin: 0,
				}}
				style={{ flex: 1 }}
			>
				<Box
					bg="primary"
					flex={0.8}
					borderTopRightRadius={50}
					borderTopLeftRadius={50}
					overflow="hidden"
				>
					<Box
						py={3}
						width={"100%"}
						alignItems="center"
						flexDirection="row"
						justifyContent="space-evenly"
					>
						<ButtonBase onPress={handleSubmit}>
							<Box>
								<Circle bg="white" size={32}>
									<Icon
										name="save"
										size={18}
										color={theme.colors.primary}
									/>
								</Circle>
								<Text color="white">Salvar</Text>
							</Box>
						</ButtonBase>

						<Text fontSize={4} color="white">
							Cadastrar post
						</Text>
						<ButtonBase onPress={() => props.onSwipeComplete()}>
							<Box>
								<Circle bg="white" size={32}>
									<Icon
										name="times"
										size={18}
										color={theme.colors.primary}
									/>
								</Circle>
								<Text color="white">Fechar</Text>
							</Box>
						</ButtonBase>
					</Box>
					<Box
						p={3}
						borderTopRightRadius={50}
						borderTopLeftRadius={50}
						bg="white"
						flex={1}
					>
						<Box borderTopRightRadius={50} borderTopLeftRadius={50}>
							<Input
								value={values.title}
								onChangeText={(title) =>
									setFieldValue("title", title)
								}
								placeholder="Título"
							/>
							{errors.title && (
								<Text color={"red"}>{errors.title}</Text>
							)}
							<Input
								value={values.text}
								multiline={true}
								onChangeText={(text) =>
									setFieldValue("text", text)
								}
								placeholder="Texto"
							/>
							{errors.text && (
								<Text color={"red"}>{errors.text}</Text>
							)}
						</Box>
					</Box>
				</Box>
			</ScrollView>
		</Modal>
	);
};

export default PostsAddScreen;
