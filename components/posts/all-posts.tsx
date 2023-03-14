import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';
import { PostsDataProps } from '@/components/posts.model';

export default function AllPosts(props: PostsDataProps) {
	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsGrid posts={props.posts} />
		</section>
	);
}
