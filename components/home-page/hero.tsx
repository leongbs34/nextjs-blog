import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/pp.ico'
					alt='An image showing me'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I&apos;m Leong</h1>
			<p>I blog about anything</p>
		</section>
	);
}

export default Hero;
