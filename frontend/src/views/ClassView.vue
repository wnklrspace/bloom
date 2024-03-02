<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Classes',
				path: '/class',
			},
		]"
	/>
	<div class="wrapper">
		<div>
			<h1>Hello, {{ user.cName }}!</h1>
		</div>
		<div>
			<h4>Class: {{ className }}</h4>
			<div>
				<p>Class teacher: {{ classTeacher }}</p>
				<p>Contact: {{ classTeacherEmail }}</p>
			</div>
			<div class="class-tabs">
				<b-tabs content-class="mt-3">
					<b-tab
						:title="`Students (${studentAmount})`"
						active
					>
						<table>
							<tbody>
								<tr
									v-for="(student, index) in students"
									:key="index"
								>
									<td>{{ studentNames[index] }}</td>
								</tr>
							</tbody>
						</table>
					</b-tab>
					<b-tab title="Announcements">
						<p>Announcements</p>
					</b-tab>
				</b-tabs>
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
			classId: '' as string,
			className: {} as string,
			students: [] as string[],
			studentAmount: 0 as number,
			studentNames: [] as string[],
			classTeacher: '' as string,
			classTeacherEmail: '' as string,
		};
	},

	mounted() {
		this.fetchClassStudentIds();
	},
	setup() {
		const storedUser = localStorage.getItem('user');
		const user = storedUser ? JSON.parse(storedUser) : null;
		return { user };
	},
	methods: {
		async fetchClassStudentIds() {
			var classData = {};
			try {
				// Fetch student from user and get class
				const student = await axios.get(
					`http://localhost:4000/api/v1/student/${this.user.userId}`,
				);
				this.classId = student.data.class;
				// Fetch class name of the student and get students lenght
				const response = await axios.get(
					`http://localhost:4000/api/v1/class/${this.classId}`,
				);
				this.className = response.data.name;
				this.students = response.data.students;
				this.studentAmount = this.students.length;

				// Fetch class teacher
				const classTeacherId = response.data.classTeacher;
				const teacherInfo = await axios.get(
					`http://localhost:4000/api/v1/teacher/${classTeacherId}`,
				);
				this.classTeacher = teacherInfo.data.cName;
				this.classTeacherEmail = teacherInfo.data.contact.email;

				// Fetch student names
				const studentNamePromises = this.students.map(async (student: any) => {
					try {
						const studentResponse = await axios.get(
							`http://localhost:4000/api/v1/student/${student}`,
						);
						return studentResponse.data.cName;
					} catch (error) {
						console.error('Error fetching student name:', error);
						return '';
					}
				});

				this.studentNames = await Promise.all(studentNamePromises);
			} catch (error) {
				console.error('Error fetching students:', error);
			}
		},
	},
});
</script>
