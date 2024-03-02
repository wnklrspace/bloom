<template>
	<div class="app-container">
		<NavBar v-if="user !== null" />
		<div class="view-container">
			<RouterView />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';

export default defineComponent({
	setup() {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;
		const userRole = user ? user.role : null;
		const router = useRouter();

		router.beforeEach((to, from, next) => {
			if (!user) {
				if (to.name !== 'login') {
					next({ name: 'login' });
				} else {
					next();
				}
			} else if (userRole === 'student' && to.name === 'login') {
				next({ name: 'schedule' });
			} else if (userRole === 'admin' && to.name === 'login') {
				next({ name: 'admin' });
			} else {
				next();
			}
		});

		return { user };
	},
});
</script>

<style>
#app {
	max-width: 100% !important;
	min-height: 100dvh;
	margin: auto !important;
	padding: 0 0 0 100px !important;
	background-color: #fff;
}

ul,
li {
	list-style-type: none;
	margin: 0 !important;
	padding: 0 !important;
}

button {
	background-color: transparent;
	border: none;
	cursor: pointer;
}

p {
	margin: 0 !important;
}

a {
	text-decoration: none !important;
	color: black !important;
}

a:hover {
	text-decoration: none !important;
	color: black !important;
	background-color: transparent;
}

.wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 2rem;
}
</style>

<style scoped>
.app-container {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.view-container {
	width: 100%;
}
</style>
