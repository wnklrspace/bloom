<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
		]"
	/>
	<div class="wrapper">
		<h1>Welcome on board, {{ user.cName }}</h1>
		<p class="paragraph">
			Lucky you. You're the captain of this wonderful ship. You have the options
			to configure and setup the whole software from here. We hope to see you
			bloom in this position. What do you want to configure first?
		</p>
		<div>
			<b-row class="first-row">
				<b-col cols="4">
					<router-link
						class="selection-button"
						to="/admin/class"
						>Classes</router-link
					>
				</b-col>
				<b-col cols="4">
					<router-link
						class="selection-button"
						to="/admin/student"
						>Students</router-link
					>
				</b-col>
				<b-col cols="4">
					<router-link
						class="selection-button"
						to="/admin/teacher"
						>Teacher</router-link
					>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="4">
					<router-link
						class="selection-button"
						to="/admin/course"
						>Courses</router-link
					>
				</b-col>
				<b-col cols="4">
					<router-link
						class="selection-button"
						to="/admin/exam"
						>Exams</router-link
					>
				</b-col>
				<b-col cols="4">
					<router-link
						class="selection-button"
						to="/admin/room"
						>Rooms</router-link
					>
				</b-col>
			</b-row>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	// `setup` is a special hook dedicated for the Composition API.
	setup() {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;

		// expose the ref to the template
		return {
			user,
		};
	},
};
</script>

<style scoped>
.paragraph {
	max-width: 600px;
}

.first-row {
	margin-bottom: calc(var(--bs-gutter-x));
}

.selection-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #dedede;
	border: none;
	border-radius: 0.5rem;
	min-height: 200px;
}

.selection-button:hover {
	background-color: #ddd;
}
</style>
