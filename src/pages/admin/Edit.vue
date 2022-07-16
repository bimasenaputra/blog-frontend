<template>
	<textarea v-model="post.title" class="w-full overflow-visible text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none p-0"></textarea>

</template>

<script setup>
	import { onMounted, watch } from 'vue';
	import { useAdminPost } from '../../api/useAdminPosts';
	import { useRoute } from 'vue-router';
	import _ from 'lodash';

	const router = useRoute();
	const { post, fetchPost } = useAdminPost();
	
	onMounted(async () => {
		await fetchPost(router.params.slug);
		console.log(post);
		watch(() => _.cloneDeep(post), _.debounce(() => {
			console.log('post changed');
		}, 1000));
	});
</script>