import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null,
		isAuthenticated: false,
	}),
	getters: {
		getUser: (state) => state.user,
		isAuthenticated: (state) => !!state.user,
	},
	actions: {
		setUser(user: any) {
			this.user = user;
		},
		clearUser() {
			this.user = null;
		},
	},
});
