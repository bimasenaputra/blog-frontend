<template>
	<div class="space-y-16">
		<div v-for="post in posts">
			<router-link :to="{ name: 'post', params: { slug: post.slug } }" class="block">
				<h1 class="text-3xl sm:text-4xl leading-10 font-extrabold tracking-tight text-gray-900"> {{ post.title }} </h1>
				<div class="mt-4 text-gray-500 prose prose-sm lg:prose" v-html="post.teaser"></div>
			</router-link>
		</div>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { usePosts } from '../api/usePosts';
	const { posts, fetchPosts } = usePosts();
	onMounted(fetchPosts);
</script>