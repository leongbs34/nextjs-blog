import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/posts-util';
import { PostData } from '@/components/posts.model';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';
import Head from 'next/head';

type PostDataProps = {
	post: PostData;
};

interface IParams extends ParsedUrlQuery {
	slug: string;
}

export default function PostDetailPage({ post }: PostDataProps) {
	return (
		<Fragment>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</Fragment>
	);
}

export function getStaticProps(context: GetStaticPropsContext) {
	const { slug } = context.params as IParams;
	const post = getPostData(slug);

	return {
		props: {
			post,
		},
		revalidate: 600,
	};
}

export function getStaticPaths() {
	const slugs = getPostsFiles().map(fileName => fileName.replace(/\.md$/, ''));

	const paths = slugs.map(slug => ({ params: { slug } }));

	return {
		paths,
		fallback: false,
	};
}
