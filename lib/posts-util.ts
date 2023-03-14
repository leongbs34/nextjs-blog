import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { PostData } from '@/components/posts.model';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(postIdentifier: string) {
	const postSlug = postIdentifier.replace(/\.md$/, '');
	const filePath = path.join(postsDirectory, `${postSlug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content }: { data: any; content: string } = matter(fileContent);

	const postData: PostData = {
		slug: postSlug,
		content,
		...data,
	};

	return postData;
}

export function getPostsFiles() {
	return fs.readdirSync(postsDirectory);
}

export function getAllPosts() {
	const postFiles = getPostsFiles();

	const allPosts = postFiles.map(postFile => getPostData(postFile));

	const sortedPosts = allPosts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1
	);

	return sortedPosts;
}

export function getFeaturedPosts() {
	const featuredPosts = getAllPosts().filter(post => post.isFeatured);

	return featuredPosts;
}
