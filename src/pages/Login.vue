<template>
	<div>
		<form v-on:submit.prevent="login">
			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script setup>
	import { useStore } from '../store/useStore';
	const store = useStore();

	const login = () => {
		store.login({
			email: 'bimasenaputra@gmail.com',
			password: 'tgs4lyfe',
		});
	};
</script>