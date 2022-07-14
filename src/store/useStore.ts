import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('store', {
	state: () => {
		return {
			authenticated: false,
			user: null,
		}
	},

	getters: {
		getAuthenticated: (state) => state.authenticated,
		getUser: (state) => state.user,
	},

	actions: {
		authenticate() {
			axios.get('api/user').then((response) => {
				this.authenticated = true;
				this.user = response.data;
			})
			.catch(() => {
				this.authenticated = false;
				this.user = null;
			});
		},

		async login(credentials) {
			await axios.get('sanctum/csrf-cookie');
			const resp = await axios.post('login', credentials);

			this.authenticate();
		},
	},
	
	persist: true,
});