<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Courses',
				path: '/course',
			},
		]"
	/>
	<div class="wrapper">
		<div>
			<h1>Hello, {{ user.cName }}!</h1>
		</div>
		<div>
			<h4>My courses</h4>
			<div
				class="accordion"
				role="tablist"
			>
				<b-card
					v-for="(course, index) in courses"
					:key="index"
					no-body
					class="mb-1"
				>
					<b-card-header
						header-tag="header"
						class="p-1 accordion-header"
						role="tab"
						v-b-toggle="`accordion-${index}`"
					>
						<h6 class="mb-0">{{ course.name }}</h6>
					</b-card-header>
					<b-collapse
						:id="`accordion-${index}`"
						accordion="my-accordion"
						role="tabpanel"
					>
						<b-card-body>
							<div class="class-tabs">
								<b-tabs content-class="mt-3">
									<b-tab
										title="Exams"
										active
									>
										<p v-if="course.exams.length <= 0">
											This course has no exams
										</p>
										<ul v-if="course.exams.length > 0">
											<li
												v-for="(exam, examIndex) in course.exams"
												:key="examIndex"
											>
												{{ exam.name }}
											</li>
										</ul>
									</b-tab>
									<b-tab title="My grades">
										<p>My grades</p>
									</b-tab>
									<b-tab title="Course contents">
										<p>
											<span v-if="course.teacher">
												Teacher: {{ course.teacher.cName }}
											</span>
											<span v-else>
												Teacher: Not yet assigned
											</span>
										</p>
									</b-tab>
								</b-tabs>
							</div>
						</b-card-body>
					</b-collapse>
				</b-card>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
	data() {
		return {
			courses: [] as any[],
		};
	},
	setup() {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;
		return { user };
	},
	mounted() {
		this.fetchStudentCourses();
	},
	methods: {
		async fetchStudentCourses() {
			try {
				const studentId = this.user.userId;
				const studentResponse = await axios.get(
					`http://localhost:4000/api/v1/student/${studentId}`,
				);
				const courseIds = studentResponse.data.courses;
				const coursePromises = courseIds.map((courseId: string) =>
					axios.get(`http://localhost:4000/api/v1/course/${courseId}`),
				);
				const courseResponses = await Promise.all(coursePromises);
				this.courses = courseResponses.map((response: any) => response.data);

				// Fetch teacher details for each course
				const teacherPromises = this.courses.map((course: any) =>
					course.courseTeacher
						? axios.get(
								`http://localhost:4000/api/v1/teacher/${course.courseTeacher}`,
						  )
						: null,
				);
				const teacherResponses = await Promise.all(teacherPromises);
				const teachers = teacherResponses.map((response: any) =>
					response ? response.data : null,
				);

				// Fetch exams for each course
				const examPromises = this.courses.map((course: any) =>
					course.exams.map((examId: string) =>
						axios.get(`http://localhost:4000/api/v1/exam/${examId}`),
					),
				);
				const examResponses = await Promise.all(
					examPromises.flat(), // Flatten the nested array of promises
				);

				const exams = examResponses.map((response: any) => response.data);

				// Assign teacher information to each course
				this.courses = this.courses.map((course: any, index: number) => {
					return {
						...course,
						teacher: teachers[index],
						exams: exams.filter((exam: any) => course.exams.includes(exam._id)),
					};
				});
			} catch (error) {
				console.error('Error fetching student courses:', error);
			}
		},
	},
});
</script>

<style scoped>
.accordion-header {
	cursor: pointer;
	padding: 0.75rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	height: 40px;
}

.accordion-header:hover {
	background-color: rgb(178, 177, 176);
	color: white;
}

.b-card-body {
	border: 1px solid #ccc;
	border-top: none;
	border-radius: 0 0 5px 5px;
}

.class-tabs {
	margin-top: 1rem;
}

.b-tabs-nav .nav-link {
	color: #333;
	background-color: #f0f0f0;
	border: 1px solid #ccc;
	border-radius: 5px 5px 0 0;
}

.b-tabs-nav .nav-link.active {
	background-color: #fff;
	border-bottom-color: transparent;
}

.b-tab-content {
	padding: 1rem;
	border: 1px solid #ccc;
	border-top: none;
	border-radius: 0 0 5px 5px;
}
</style>
