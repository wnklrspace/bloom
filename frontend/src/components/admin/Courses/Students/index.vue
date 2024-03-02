<template>
	<div class="list-container">
		<h3>Student Configuration Panel</h3>
		<p>
			All students that are assigned to this course are listed below. You can
			remove students from this course by clicking the button on the right.
		</p>

		<hr />

		<List
			title="Students"
			:items="
				students.map((student: any) => {
					return {
						link: `/admin/student/${student._id}`,
						title: student.cName,
						handlers: !mandatory
							? [
									{
										name: 'Remove Student from Course',
										type: 'primary',
										handler: () => {
											addStudentToCourse(courseId, student._id, student.class);
										},
									},
							  ]
							: [],
					};
				})
			"
		/>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import List from '@/components/admin/List.vue';
import Button from '@/components/common/Button.vue';
import { onMounted } from 'vue';

export default {
	name: 'StudentConfiguration',
	props: {
		courseId: {
			type: String,
			required: true,
			readOnly: true,
		},
		assignedClasses: {
			type: Array,
			required: true,
			readOnly: true,
		},
		assignedStudents: {
			type: Array,
			required: true,
			readOnly: true,
		},
		mandatory: {
			type: Boolean,
			required: true,
			readOnly: true,
		},
	},
	components: {
		List,
		Button,
	},
	setup(props) {
		const students: any = ref([]);

		async function getStudentsById() {
			axios
				.post(BACKEND_URL + '/api/v1/student/getStudentsByIds', {
					ids: props.assignedStudents,
				})
				.then((res) => {
					console.log('RES = ', res);
				})
				.catch((err) => console.log(err));
		}

		async function fetchStudents() {
			axios
				.get(BACKEND_URL + '/api/v1/student')
				.then((res) => {
					const filteredStudents = res.data.filter((student: any) => {
						return props.assignedStudents.includes(student._id);
					});

					students.value = filteredStudents;
				})
				.catch((err) => console.log(err));
		}

		onMounted(async () => {
			await getStudentsById();
		});

		onBeforeMount(async () => {
			await fetchStudents();
		});

		return {
			students,
		};
	},
	methods: {
		addStudentToCourse(courseId: string, studentId: string, classId: string) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addStudent`, {
					studentId: studentId,
					classId: classId,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		},
		removeStudentFromCourse(
			courseId: string,
			studentId: string,
			classId: string,
		) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/removeStudent`, {
					studentId: studentId,
					classId: classId,
				})
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		},
	},
};
</script>

<style scoped>
p {
	margin: 0;
}

.first {
	border-radius: 0.5rem 0.5rem 0 0;
}

.last {
	border-radius: 0 0 0.5rem 0.5rem;
	border-bottom: 1px solid #ccc;
}
</style>
