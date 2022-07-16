import { ref } from 'vue';
import axios from 'axios';

export const useAdminPosts = () => {
	const posts = ref([]);

	const fetchPosts = async () => {
		let response = await axios.get('api/admin/posts');
		posts.value = response.data.data;
	};

	return {
		posts,
		fetchPosts,
	};
};

export const useCreatePost = () => {
	const createPost = async () => {
		let response = await axios.post('api/admin/posts');
		return response.data.data;
	}

	return {
		createPost
	};
}

export const useAdminPost = () => {
	const post = ref([]);

	const fetchPost = async (slug) => {
		let response = await axios.get(`api/admin/posts/${slug}/edit`);
		post.value = response.data.data;
	};

	return {
		post,
		fetchPost,
	};
};