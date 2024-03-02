<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Overview',
				path: '/admin',
			},
			{
				name: 'Classes',
				path: '/admin/class',
			},
			{
				name: schoolClass.name,
				path: `/admin/class/${schoolClass._id}`,
			},
		]"
	/>

	<div class="wrapper">
		<h1>{{ schoolClass.name }}</h1>
		<template v-if="loading">
			<div class="spinner">
				<BSpinner />
				<p class="loader">Loading...</p>
			</div>
		</template>
		<template v-else>
			<h3>Class teacher</h3>

			<b-form @submit="saveChanges">
				<b-form-group
					label="Teacher"
					label-cols-md="3"
					label-align-md="right"
				>
					<b-col cols="9">
						<BFormSelect
							id="teacher-select-field"
							v-model="classTeacher"
							v-if="teacher"
							:disabled="!isEditing"
							required
						>
							<option
								value=""
								disabled
								selected
								hidden
							>
								{{
									teacher.find((t: any) => t._id === schoolClass.classTeacher)
										? teacher.find(
												(t: any) => t._id === schoolClass.classTeacher,
										  ).cName
										: 'Select a teacher'
								}}
							</option>
							<option
								v-for="teacherItem in teacher"
								:value="teacherItem._id"
							>
								{{ teacherItem.cName }}
							</option>
						</BFormSelect>
					</b-col>
					<b-row>
						<b-col
							class="mt-3"
							cols="12"
						>
							<b-button
								v-if="isEditing"
								type="submit"
								variant="success"
								class="mt-2 mr-3"
								>Save Changes</b-button
							>
							<b-button
								v-if="isEditing"
								type="button"
								@click="cancelEdit"
								variant="outline-secondary"
								class="mt-2 ml-3"
								>Cancel</b-button
							>
							<b-button
								v-else
								@click="startEdit"
								variant="dark"
								class="mt-2"
								>Edit</b-button
							>
						</b-col>
					</b-row>
				</b-form-group>
			</b-form>

			<Space />

			<List
				title="Class students"
				:items="
					students
						.filter((student: any) => student.class === schoolClass._id)
						.map((student: any) => {
							return {
								link: `/admin/student/${student._id}`,
								title: student.cName,
								handlers: [
									{
										name: 'Edit',
										handler: () => {
											$router.push(`/admin/student/${student._id}`);
										},
									},
								],
							};
						})
				"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import Header from '@/components/admin/Header.vue';
import Space from '@/components/common/Space.vue';
import DangerZone from '@/components/admin/DangerZone.vue';

export default {
	name: 'ClassDetails',
	components: {
		Breadcrumbs,
		Header,
		Space,
		DangerZone,
	},
	setup() {
		const route = useRoute();
		const schoolClass: any = ref({});
		const teacher: any = ref();
		const currentClassTeacher: any = ref();
		const students: any = ref([]);
		const loading = ref(false);
		let isEditing: any = ref(false);

		const fetchClass = async () => {
			const response = await fetch(
				BACKEND_URL + '/api/v1/class/' + route.params.id,
			);
			const data = await response.json();
			return data;
		};

		const fetchTeacher = async () => {
			try {
				const res = await fetch('http://localhost:4000/api/v1/teacher');
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		};

		const fetchClassTeacher = async () => {
			if (!schoolClass.value.classTeacher)
				return console.info('No teacher assigned');

			try {
				const res = await fetch(
					'http://localhost:4000/api/v1/teacher/' +
						schoolClass.value.classTeacher,
				);
				const data = await res.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		};

		const fetchStudents = async () => {
			try {
				const response = await fetch(BACKEND_URL + '/api/v1/student');
				const data = await response.json();
				return data;
			} catch (err) {
				console.error(err);
			}
		};

		const startEdit = () => {
			isEditing.value = true;
		};

		const cancelEdit = () => {
			isEditing.value = false;
			window.location.reload();
		};

		onBeforeMount(async () => {
			loading.value = true;
			const teacherData = await fetchTeacher();
			const currentClassTeacherData = await fetchClassTeacher();
			const classData = await fetchClass();
			const studentsData = await fetchStudents();

			students.value = studentsData;
			teacher.value = teacherData;
			currentClassTeacher.value = currentClassTeacherData;
			schoolClass.value = classData;
			loading.value = false;
		});

		return {
			schoolClass,
			teacher,
			students,
			currentClassTeacher,
			loading,
			isEditing,
			startEdit,
			cancelEdit,
		};
	},
	data() {
		return {
			classTeacher: '',
		};
	},
	methods: {

		async saveChanges() {
			await axios
				.put(
					'http://localhost:4000/api/v1/class/' +
						this.$route.params.id +
						'/addTeacher',
					{
						teacherId: this.classTeacher,
					},
				)
				.then((res) => {
					this.isEditing = false;
					window.location.reload();
				})
				.catch((err) => {
					alert(err);
				});
		},
	},
};
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 2rem;
}

.spinner {
	display: flex;
	justify-content: center;
}

.loader {
	margin-left: 10px;
	vertical-align: middle;
}

.teacher-input-field {
	width: 600px;
}
.teacher-form {
	padding: 0px;
	display: flex;
	flex-direction: row;
	gap: 10px;
}
</style>
