<template>
	<div>
		<div class="absolute w-full left-0 top-0 p-6 flex justify-between items-center space-x-6">
			<div class="flex-grow flex items-center">
				<span class="mr-1">/</span>
				<input type="text" class="p-0 border-none focus:ring-0 w-full" v-model="post.slug" spellcheck="false" v-on:click="$event.target.select()" />
			</div>
			<div class="flex items-center space-x-6">
				<div class="">
					<span class="text-sm text-gray-500"> Autosaved </span>
				</div>
				<button v-on:click="post.published = !post.published" class="text-sm font-medium" v-bind:class="{'text-pink-500' : post.published}">
					{{ post.published ? 'Unpublish' : 'Publish' }}
				</button>
				<router-link :to="{ name: 'post', params: { slug: post.slug } }" class="text-sm font-medium text-gray-800" v-if="post.slug">
					Preview
				</router-link>
			</div>
		</div>
		<div>
			<ResizableTextarea v-if="post.title">
				<template v-slot:default="{ resize, el }">
					<textarea :ref="el" v-model="post.title" v-on:input="resize" class="w-full overflow-visible text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none p-0" rows="1"></textarea>
				</template>
			</ResizableTextarea>
			<Editor v-model="post.body" class="mt-16" />
		</div>
	</div>
</template>

<script setup>
	import { onMounted, watch, watchEffect } from 'vue';
	import ResizableTextarea from '../../components/ResizableTextarea.vue';
	import Editor from '../../components/Editor.vue';
	import { useAdminPost } from '../../api/useAdminPosts';
	import { useRoute } from 'vue-router';
	import _ from 'lodash';
	import slugify from 'slugify';

	const router = useRoute();
	const { post, fetchPost, patchPost } = useAdminPost();

	const updateSlug = () => {
		const slug = post.value.slug;

		if (slug.charAt(slug.length - 1) === ' ') {
			return;
		}

		post.value.slug = slug ? slugify(slug, { strict: true }) : post.value.uuid;
	};

	const updatePost = async () => {
		await patchPost(router.params.uuid);
	};
	
	onMounted(async () => {
		await fetchPost(router.params.uuid);

		watchEffect(() => {
			updateSlug();
		});

		watch(() => _.cloneDeep(post), _.debounce(() => {
			updatePost();
		}, 1000));
	});
</script>