<template>
	<div>
		<ResizableTextarea v-if="post.title">
			<template v-slot:default="{ resize, el }">
				<textarea :ref="el" v-model="post.title" v-on:input="resize" class="w-full overflow-visible text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none p-0" rows="1"></textarea>
			</template>
		</ResizableTextarea>
	</div>
</template>

<script setup>
	import { onMounted, watch } from 'vue';
	import ResizableTextarea from '../../components/ResizableTextarea.vue';
	import { useAdminPost } from '../../api/useAdminPosts';
	import { useRoute } from 'vue-router';
	import _ from 'lodash';

	const router = useRoute();
	const { post, fetchPost, patchPost } = useAdminPost();

	const updatePost = async () => {
		await patchPost(post.uuid);
	};
	
	onMounted(async () => {
		await fetchPost(router.params.slug);

		watch(() => _.cloneDeep(post), _.debounce(() => {
			updatePost();
		}, 1000));
	});
</script>