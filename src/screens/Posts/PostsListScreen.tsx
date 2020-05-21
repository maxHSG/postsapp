import React, { useState } from "react";
import { Text, Box, Image, Truncate } from "rebass-native";
import { SafeAreaView, FlatList } from "react-native";
import ButtonBase from "@/components/Button/ButtonBase";
import Circle from "@/components/Circle";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "@/utils/theme";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { useStoreActions, useStoreState } from "@/hooks";
import PostsAddScreen from "./PostsAddScreen";
import { Post } from "@/model/posts";
import PostsEditScreen from "./PostsEditScreen";
import dayjs from "dayjs";

interface Props {
	navigation: StackNavigationProp<{}>;
}

const PostListEmpty = React.memo(() => {
	return (
		<Box alignItems="center">
			<Image
				style={{
					width: "100%",
					maxHeight: 300,
				}}
				source={require("@/assets/undraw_empty_xct9.png")}
				resizeMode="contain"
			/>
			<Text fontSize={3}>Nenhum Post cadastrado</Text>
		</Box>
	);
});

interface PropsItemProps {
	item: Post;
}

const PostItem: React.FC<PropsItemProps> = React.memo(({ item }) => {
	const removePost = useStoreActions((actions) => actions.posts.removePost);
	const editPost = useStoreActions((actions) => actions.posts.editPost);

	return (
		<Box
			p={3}
			elevation={1}
			m={4}
			bg={"white"}
			borderRadius={10}
			flexDirection="row"
		>
			<Box width="90%">
				<Box mb={3}>
					<Text fontSize={5} fontWeight="bold">
						{item.title}
					</Text>
					<Text fontSize={12}>
						{dayjs(item.date || new Date()).format("DD/MM/YYYY")}
					</Text>
				</Box>
				<Box>
					<Truncate>{item.text}</Truncate>
				</Box>
			</Box>
			<Box width="10%" justifyContent="center">
				<ButtonBase onPress={() => editPost(item)}>
					<Circle size={34} bg={"yellow"} mb={3}>
						<Icon name="pencil" size={15} color="white" />
					</Circle>
				</ButtonBase>
				<ButtonBase onPress={() => removePost(item.uid)}>
					<Circle size={34} bg={"red"}>
						<Icon name="trash" size={15} color="white" />
					</Circle>
				</ButtonBase>
			</Box>
		</Box>
	);
});

const PostsListScreen: React.FC<Props> = () => {
	const signOut = useStoreActions((actions) => actions.auth.signOut);

	const posts = useStoreState((state) => state.posts.posts);

	const [addModal, setAddModal] = useState(false);

	return (
		<SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
			<PostsAddScreen
				isVisible={addModal}
				onSwipeComplete={() => void setAddModal(false)}
			/>
			<PostsEditScreen />
			<Box flex={0.9}>
				<FlatList
					keyExtractor={(item) => item.uid}
					data={posts}
					renderItem={({ item }) => <PostItem item={item} />}
					ListEmptyComponent={() => <PostListEmpty />}
				/>
			</Box>
			<Box
				flex={0.1}
				flexDirection="row"
				elevation={10}
				alignItems="center"
				bg={"white"}
				justifyContent="space-around"
			>
				<ButtonBase>
					<Icon name="home" size={25} color={theme.colors.primary} />
				</ButtonBase>
				<ButtonBase onPress={() => setAddModal(true)}>
					<Box mt={-35}>
						<Circle size={70} bg={"primary"}>
							<Icon name="plus" size={20} color={"white"}></Icon>
						</Circle>
					</Box>
				</ButtonBase>
				<ButtonBase onPress={() => signOut()}>
					<Icon
						name="sign-out"
						size={25}
						color={theme.colors.primary}
					/>
				</ButtonBase>
			</Box>
		</SafeAreaView>
	);
};

export default PostsListScreen;
