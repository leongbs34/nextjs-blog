import { Fragment } from 'react';
import Hero from '@/components/home-page/hero';
import FeaturedPosts from '@/components/home-page/featured-posts';
import React from 'react';

const DUMMY_POSTS = [
	{
		post: {
			title: 'Getting Started with NextJS',
			image: 'getting-started-with-nextjs.png',
			excerpt:
				'NextJS is a Reactframework for production - it makes building fullstack React apps and sites a breeze and ships with built-in server-side rendering',
			date: new Date(),
			slug: 'getting-started-with-nextjs',
		},
	},
];

export default function HomePage() {
	return (
		<Fragment>
			<Hero />
			<FeaturedPosts posts={DUMMY_POSTS} />
		</Fragment>
	);
}
