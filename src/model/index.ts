import { AuthModel, authModel } from "./auth";
import { postsModel, PostsModel } from "./posts";

export interface StoreModel {
	auth: AuthModel;
	posts: PostsModel;
}

const storeModel: StoreModel = {
	auth: authModel,
	posts: postsModel,
};

export default storeModel;
