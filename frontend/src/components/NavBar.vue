<template>
	<div class="navigation">
		<router-link to="/">
			<img
				class="logo"
				src="../assets/logo_smiley.svg"
				alt="Bloom Student Logo"
			/>
		</router-link>
		<nav
			class="non-admin-nav"
			v-if="role !== 'admin'"
		>
			<ul>
				<li>
					<router-link
						to="/schedule"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/schedule') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/schedule.png"
								alt="Schedule"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Schedule</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/class"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/class') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/class.png"
								alt="Class"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Class</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/courses"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/courses') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/course.png"
								alt="Courses"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Courses</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/grades"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/grades') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/grade.png"
								alt="Grades"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Grades</p>
						</div>
					</router-link>
				</li>
			</ul>
		</nav>
		<nav
			class="admin-nav"
			v-else
		>
			<ul>
				<li>
					<router-link
						to="/admin/class"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/admin/class') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/class.png"
								alt="Classes"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Classes</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/admin/student"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/admin/student') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/student.png"
								alt="Students"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Students</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/admin/teacher"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/admin/teacher') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/teacher.png"
								alt="Teachers"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Teacher</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/admin/course"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/admin/course') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/course.png"
								alt="Courses"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Courses</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/admin/exam"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/admin/exam') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/grade.png"
								alt="Exams"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Grading</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link
						to="/admin/room"
						class="nav-list-item"
					>
						<button
							class="button"
							:class="{ active: $route.fullPath.includes('/admin/room') }"
						>
							<img
								class="button-image"
								src="../assets/navbar/room.png"
								alt="Exams"
							/>
						</button>
						<div class="slogan-container">
							<p class="slogan">Rooms</p>
						</div>
					</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BNav, BNavItem } from 'bootstrap-vue-next';

export default defineComponent({
	components: {
		BNav,
		BNavItem,
	},
	setup() {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;
		return { user };
	},
	computed: {
		role() {
			return this.user.role;
		},
	},
});
</script>

<style scoped>
ul {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.navigation {
	width: 100px;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	gap: 4%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px 0;
	background-color: #fff;
	box-shadow: 10px 0px 20px 0px rgba(0, 0, 0, 0.1);
	z-index: 10;
}

.nav-list-item {
	display: flex;
	flex-direction: column;
	gap: 1px;
	align-items: center;
}

.button {
	width: 60px;
	height: 60px;
	border-radius: 10px;
}

.active {
	background-color: orange;
}

.non-admin-nav:deep(.active) {
	background-color: #a2dea2;
}

.button-image {
	width: 38px;
	height: 38px;
}
.button-image-small {
	width: 30px;
	height: 30px;
}

.button-small {
	width: 40px;
	height: 40px;
	border-radius: 10px;
}

.logo {
	width: 40px;
	height: 40px;
}

.slogan-container {
	display: inline-block;
	padding: 0.25rem 0.5rem;
	background-color: #eee;
	border-radius: 20px;
}
.slogan {
	font-size: 11px;
}
</style>
