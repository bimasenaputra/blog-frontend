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

export const useDeletePost = () => {
	const deletePost = async (uuid: string) => {
		await axios.delete(`api/admin/posts/${uuid}`);
	}

	return {
		deletePost
	};
}

export const useAdminPost = () => {
	const post = ref([]);

	const fetchPost = async (uuid: string) => {
		let response = await axios.get(`api/admin/posts/${uuid}/edit`);
		post.value = response.data.data;
	};

	const patchPost = async (uuid: string) => {
		let response = await axios.patch(`api/admin/posts/${uuid}`, post.value);
	};

	return {
		post,
		fetchPost,
		patchPost
	};
};