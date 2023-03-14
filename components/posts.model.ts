import { PostItemProps } from './posts/post-item';

export type PostsDataProps = {
	posts: PostData[];
};

type Data = {
	title: string;
	date: string;
	image: string;
	excerpt: string;
	isFeatured: boolean;
};

export interface PostData extends Data {
	slug: string;
	content: string;
}
