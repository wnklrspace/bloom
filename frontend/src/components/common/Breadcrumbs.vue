<template>
	<div class="breadcrumbs-header">
		<ul class="breadcrumbs">
			<li
				v-for="(link, index) in links"
				:key="index"
			>
				<a
					v-if="index !== links.length - 1"
					:href="link.path"
					>{{ link.name }}</a
				>
				<p
					class="active"
					v-else
				>
					<strong>{{ link.name }}</strong>
				</p>
				<p
					class="slash"
					v-if="index !== links.length - 1"
				>
					/
				</p>
			</li>
		</ul>
		<div class="user-settings">
			<button
				class="list-button"
				@click="toggleShowSettings"
			>
				{{ user ? user.cName : 'No user logged in' }}
				<div
					class="icon-container"
					:class="{ 'icon-container--rotated': isVisible }"
				>
					<ChevronDown />
				</div>
			</button>
			<ul
				:class="{
					'settings-active': isVisible,
				}"
				class="settings"
			>
				<li>
					<button
						class="list-button"
						:class="{ active: $route.fullPath.includes('/settings') }"
						@click="editAccount"
					>
						<router-link to="/settings"> Settings </router-link>
					</button>
				</li>
				<li>
					<button
						class="list-button"
						@click="logout"
					>
						<router-link to="/login"> Logout </router-link>
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import ChevronDown from '@/components/icons/ChevronDown.vue';

export default {
	name: 'Breadcrumbs',
	components: {
		ChevronDown,
	},
	props: {
		links: {
			type: Array<{
				name: string;
				path: string;
			}>,
			default: () => [],
		},
	},
	data() {
		return {
			isVisible: false,
		};
	},
	setup() {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;
		return { user };
	},
	methods: {
		logout() {
			localStorage.removeItem('user');
			console.info('User logged out');
			this.$router.push('/login');
			window.location.reload();
		},
		editAccount() {
			console.info('Settings');
			this.$router.push('/settings');
		},
		toggleShowSettings() {
			this.isVisible = !this.isVisible;
		},
	},
};
</script>

<style scoped>
ul,
li {
	list-style: none;
	margin: 0;
	padding: 0 !important;
}

.breadcrumbs-header {
	position: relative;
	width: calc(100vw - 100px);
	margin: 0 0 0 auto;
	background-color: #f4f4f4;
	padding: 0 2rem !important;
	height: 60px;

	display: flex;
	align-items: center;
	justify-content: space-between;
}

.breadcrumbs {
	list-style: none;
	display: flex;
	margin: 0;
}

.breadcrumbs li {
	display: flex;
}

.breadcrumbs li a,
.breadcrumbs li p {
	display: inline-block;
	color: #777;
	text-decoration: none;
	padding: 10px 0;
	margin: 0;
}

.breadcrumbs li a:hover {
	text-decoration: underline;
	background-color: transparent;
}

.active {
	color: #222 !important;
}

.slash {
	padding: 10px !important;
}

.user-settings {
	position: relative;
}

.settings {
	position: absolute;
	top: 100%;
	right: 0;
	flex-direction: column;
	background-color: rgba(255, 255, 255, 0.75);
	backdrop-filter: blur(20px);
	padding: 0.5rem;
	border: 1px solid #ccc;

	width: 200px;
	overflow: hidden;
	border-radius: 10px;

	opacity: 0;
	pointer-events: none;
}

.settings-active {
	opacity: 1;
	pointer-events: all;
}

.list-button {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	width: 100%;
	border-radius: 10px;
}

.list-button:hover {
	background-color: #eee;
}

.icon-container--rotated {
	transform: rotate(180deg);
}
</style>
