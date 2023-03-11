import { PostsProps } from '../posts.model';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

export default function PostsGrid({ posts }: PostsProps) {
	return (
		<ul className={classes.grid}>
			{posts.map(({ post }) => (
				<PostItem post={post} key={post.slug} />
			))}
		</ul>
	);
}
