import { Fragment } from 'react';
import Hero from '@/components/home-page/hero';
import FeaturedPosts from '@/components/home-page/featured-posts';
import { getFeaturedPosts } from '@/lib/posts-util';
import { PostsDataProps } from '@/components/posts.model';
import Head from 'next/head';

export default function HomePage(props: PostsDataProps) {
	return (
		<Fragment>
			<Head>
				<title>Leong&apos;s Blog</title>
				<meta name='description' content='Content' />
			</Head>
			<Hero />
			<FeaturedPosts posts={props.posts} />
		</Fragment>
	);
}

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts,
		},
	};
}
