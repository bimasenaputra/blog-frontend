<template>
	<div class="max-w-md mx-auto w-full">
		<form class="mt-8 space-y-6" v-on:submit.prevent="login">
			<div class="rounded-md shadow-sm space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<div class="mt-1">
						<input type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="user@example.com" v-model="form.email"/>
					</div>
					<p class="mt-2 text-sm text-red-600" v-if="errors.email">{{ errors.email[0] }}</p>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="mt-1">
						<input type="password" name="password" id="password" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" v-model="form.password"/>
					</div>
					<p class="mt-2 text-sm text-red-600" v-if="errors.password">{{ errors.password[0] }}</p>
				</div>
			</div>

			<button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
		</form>
	</div>
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import { useStore } from '../store/useStore';
	import { useRouter } from 'vue-router';

	const store = useStore();
	const router = useRouter();

	const errors = ref({});
	const form = reactive({
		email: '',
		password: '',
	})

	const login = () => {
		store.login(form).then(() => {
			router.push({ name: 'admin.posts' })
		}).catch((e) => {
			if (e.response.status === 422) {
				errors.value = e.response.data.errors;
			}
		});
	};
</script>