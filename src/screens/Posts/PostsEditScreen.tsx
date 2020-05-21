import React, { useCallback } from 'react';

import Modal from 'react-native-modal';
import { Box, Text } from 'rebass-native';
import Input from '@/components/Input/Input';
import ButtonBase from '@/components/Button/ButtonBase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import theme from '@/utils/theme';
import Circle from '@/components/Circle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useStoreActions, useStoreState } from '@/hooks';

const validationSchema = yup.object({
	title: yup.string().required('O título é obrigatório'),
	text: yup.string().required('O texto é obrigatório'),
});

const POST_DEFAULT = {
	uid: '',
	title: '',
	text: '',
	date: undefined,
};

const PostsEditScreen: React.FC = () => {
	const updatePost = useStoreActions((actions) => actions.posts.updatePost);

	const editPost = useStoreActions((actions) => actions.posts.editPost);

	const post = useStoreState((state) => state.posts.post);

	const { values, handleSubmit, setFieldValue, errors } = useFormik({
		enableReinitialize: true,
		initialValues: post,
		validationSchema,
		onSubmit: ({ title, text, date }) => {
			updatePost({ title, text, date, uid: post.uid });

			editPost(POST_DEFAULT);
		},
	});

	const closeModal = useCallback(() => {
		editPost(POST_DEFAULT);
	}, [updatePost]);

	return (
		<Modal
			isVisible={!!post.uid}
			onSwipeComplete={closeModal}
			useNativeDriver
			swipeDirection={['left', 'right', 'down']}
			style={{ justifyContent: 'flex-end', margin: 0 }}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-end',
					margin: 0,
				}}
				style={{ flex: 1 }}>
				<Box
					bg="primary"
					flex={0.8}
					borderTopRightRadius={50}
					borderTopLeftRadius={50}
					overflow="hidden">
					<Box
						py={3}
						width={'100%'}
						alignItems="center"
						flexDirection="row"
						justifyContent="space-evenly">
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
							Atualizar post
						</Text>
						<ButtonBase onPress={() => closeModal()}>
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
						flex={1}>
						<Box borderTopRightRadius={50} borderTopLeftRadius={50}>
							<Input
								value={values.title}
								onChangeText={(title) =>
									setFieldValue('title', title)
								}
								placeholder="Título"
							/>
							{errors.title && (
								<Text color={'red'}>{errors.title}</Text>
							)}
							<Input
								value={values.text}
								multiline={true}
								onChangeText={(text) =>
									setFieldValue('text', text)
								}
								placeholder="Texto"
							/>
							{errors.text && (
								<Text color={'red'}>{errors.text}</Text>
							)}
						</Box>
					</Box>
				</Box>
			</ScrollView>
		</Modal>
	);
};

export default PostsEditScreen;
