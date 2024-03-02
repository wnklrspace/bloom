<template>
	<header>
		<ul class="header">
			<li>
				<a
					class="item-button"
					href="/admin/class"
					:class="{ active: $route.fullPath.includes('class') }"
				>
					Classes
				</a>
			</li>
			<li>
				<a
					class="item-button"
					href="/admin/student"
					:class="{ active: $route.fullPath.includes('student') }"
				>
					Students
				</a>
			</li>
			<li>
				<a
					class="item-button"
					href="/admin/teacher"
					:class="{ active: $route.fullPath.includes('teacher') }"
				>
					Teacher
				</a>
			</li>
			<li>
				<a
					class="item-button"
					href="/admin/course"
					:class="{ active: $route.fullPath.includes('course') }"
				>
					Courses
				</a>
			</li>
			<li>
				<a
					class="item-button"
					href="/admin/exam"
					:class="{ active: $route.fullPath.includes('exam') }"
				>
					Exams
				</a>
			</li>
			<li>
				<a
					class="item-button"
					href="/admin/room"
					:class="{ active: $route.fullPath.includes('room') }"
				>
					Rooms
				</a>
			</li>
		</ul>
	</header>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

export default {
	name: 'Header',

	setup() {
		const userStore = useUserStore();
		const { user } = storeToRefs(userStore);

		return {
			user: user,
		};
	},
};
</script>

<style scoped>
ul li {
	list-style: none;
	display: flex;
}

.paragraph {
	max-width: 600px;
}
.header {
	display: flex;
	list-style: none;
	padding: 0;
	margin: 0;
	gap: 10px;
	border-bottom: 2px solid #ccc;
	padding-bottom: 10px;
}

.item-button {
	padding: 10px 20px;
	border-radius: 5px;
	background-color: #f0f0f0;
	cursor: pointer;
	color: #333;
	border: none;
	text-decoration: none;
	margin: 0;
}

.active {
	background-color: orange;
}
</style>
