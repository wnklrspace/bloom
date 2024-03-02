<template>
	<div>
		<h3>Course Configuration Panel</h3>

		<hr />

		<b-row>
			<b-col cols="6">
				<List
					title="Registered Courses"
					:items="
						courses
							.filter((course: any) => assignedCourses.includes(course._id))
							.map((course: any) => {
								return {
									link: `/admin/course/${course._id}`,
									title: course.name + ' (' + course.students.length + ')',
									handlers: !course.mandatory
										? [
												{
													name: 'Remove',
													type: 'danger',
													handler: () => {
														removeStudentFromClass(course._id, studentId);
													},
												},
										  ]
										: [],
								};
							})
					"
				/>
			</b-col>

			<b-col cols="6">
				<List
					title="Available Courses"
					:items="
						courses
							.filter((course: any) => {
								if (schoolClass !== null) {
									return (
										course.schoolClasses.includes(schoolClass) &&
										!assignedCourses.includes(course._id)
									);
								}

								return !assignedCourses.includes(course._id);
							})
							.map((course: any) => {
								return {
									link: `/admin/course/${course._id}`,
									title: course.name + ' (' + course.students.length + ')',
									handlers: [
										{
											name: 'Add',
											type: 'primary',
											handler: () => {
												addStudentToCourse(course._id, schoolClass, studentId);
											},
										},
									],
								};
							})
					"
				/>
			</b-col>
		</b-row>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { BACKEND_URL } from '@/config';
import List from '@/components/admin/List.vue';

export default {
	name: 'CourseConfiguration',
	props: {
		studentId: {
			type: String,
			required: true,
			readOnly: true,
		},
		schoolClass: {
			type: String,
			required: true,
			readOnly: true,
		},
		assignedCourses: {
			type: Array,
			required: true,
			readOnly: true,
		},
	},
	components: {
		List,
	},
	setup(props) {
		const courses: any = ref([]);

		function fetchCourses() {
			axios
				.get(BACKEND_URL + '/api/v1/course')
				.then((response) => {
					courses.value = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		}

		onBeforeMount(() => {
			fetchCourses();
		});

		return {
			courses,
			fetchCourses,
		};
	},
	methods: {
		addStudentToCourse(courseId: string, classId: string, studentId: string) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addStudent`, {
					studentId,
					classId,
				})
				.then((response) => {
					if (response.status === 200) {
						window.location.reload();
					} else {
						alert(response.data);
					}
				})
				.catch((error) => {
					alert(error.response.data);
				});
		},
		removeStudentFromClass(courseId: string, studentId: string) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/removeStudent`, {
					studentId,
				})
				.then((response) => {
					if (response.status === 200) {
						window.location.reload();
					} else {
						alert(response.data);
					}
				})
				.catch((error) => {
					alert(error.response.data);
				});
		},
	},
};
</script>

<style scoped></style>
