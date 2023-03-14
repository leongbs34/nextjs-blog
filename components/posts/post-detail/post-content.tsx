import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { PostData } from '@/components/posts.model';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type PostDataProps = {
	post: PostData;
};

export default function PostContent({ post }: PostDataProps) {
	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	const customRenderers = {
		img(image: any) {
			return (
				<Image
					src={`/images/posts/${post.slug}/${image.src}`}
					alt={image.alt}
					width={600}
					height={300}
				/>
			);
		},
		code(code: any) {
			const { className, children } = code;
			const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
			return (
				<SyntaxHighlighter
					style={atomDark}
					language={language}
					// eslint-disable-next-line react/no-children-prop
					children={children}
				/>
			);
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={post.title} image={imagePath} />
			<ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
		</article>
	);
}
