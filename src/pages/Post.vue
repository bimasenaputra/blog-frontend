<template>
	<div class="space-y-16">
		<h1 class="block text-center text-4xl sm:text-6xl leading-10 font-extrabold tracking-tight text-gray-900"> {{ post.title }} </h1>
		<div class="mt-4 text-gray-500 prose prose-sm lg:prose" v-html="post.body"></div>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { useRoute } from "vue-router";
	import { usePost } from '../api/usePosts';
	const { post, fetchPost } = usePost();
	const route = useRoute();
	onMounted(fetchPost(route.params.slug));
</script>