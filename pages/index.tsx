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
