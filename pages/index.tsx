import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Fragment } from 'react';
import Hero from '@/components/home-page/hero';
import FeaturedPosts from '@/components/home-page/featured-posts';

function Home() {
	return (
		<Fragment>
			<Hero />
			<FeaturedPosts />
		</Fragment>
	);
}

export default Home;
