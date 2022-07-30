import { ref } from 'vue';
import axios from 'axios';

export const usePosts = () => {
	const posts = ref([]);

	const fetchPosts = async () => {
		let response = await axios.get('api/posts');
		posts.value = response.data.data;
	};

	return {
		posts,
		fetchPosts,
	};
};

export const usePost = () => {
	const post = ref([]);

	const fetchPost = async (slug: string) => {
		let response = await axios.get(`api/posts/${slug}`);
		post.value = response.data.data;
	};

	return {
		post,
		fetchPost,
	}
}