import { action, Action } from "easy-peasy";

export interface Post {
	uid: string;
	date?: Date;
	title: string;
	text: string;
}

export interface PostsModel {
	posts: Post[];
	post: Post;
	editPost: Action<PostsModel, Post>;
	updatePost: Action<PostsModel, Post>;
	storePost: Action<PostsModel, Post>;
	removePost: Action<PostsModel, string>;
}

export const postsModel: PostsModel = {
	posts: [],
	post: {
		uid: "",
		date: new Date(),
		title: "",
		text: "",
	},
	storePost: action((state, post) => {
		state.posts.push(post);
	}),
	editPost: action((state, post) => {
		state.post = post;
	}),
	updatePost: action((state, post_updated) => {
		state.posts = state.posts.map((post) =>
			post.uid === post_updated.uid ? post_updated : post
		);
	}),
	removePost: action((state, uid) => {
		state.posts = state.posts.filter((post) => post.uid !== uid);
	}),
};
