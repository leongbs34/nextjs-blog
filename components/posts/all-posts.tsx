import { PostsProps } from '../posts.model';
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

export default function AllPosts(props: PostsProps) {
	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsGrid posts={props.posts} />
		</section>
	);
}
