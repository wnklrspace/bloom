<template>
	<div class="list-container">
		<h3>Class Configuration Panel</h3>

		<hr />

		<SelectedClass
			v-if="schoolClass"
			:classId="schoolClass"
			:studentId="studentId"
		/>

		<List
			v-else
			title="Available Classes"
			:items="
				classes.map((schoolClass: any) => {
					return {
						link: `/admin/class/${schoolClass._id}`,
						title: schoolClass.name,
						handlers: [
							{
								name: 'Edit',
								type: 'secondary',
								handler: () => {
									$router.push(`/admin/class/${schoolClass._id}`);
								},
							},
							{
								name: 'Add Student to Class',
								type: 'primary',
								handler: () => {
									addStudentToClass(schoolClass._id, studentId);
								},
							},
						],
					};
				})
			"
		/>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { BACKEND_URL } from '@/config';
import List from '@/components/admin/List.vue';
import Button from '@/components/common/Button.vue';
import SelectedClass from './selected.vue';

export default {
	name: 'ClassConfiguration',
	props: {
		studentId: {
			type: String,
			required: true,
			readOnly: true,
		},
		schoolClass: {
			type: String,
			readOnly: true,
		},
	},
	components: {
		List,
		Button,
		SelectedClass,
	},
	setup() {
		const classes: any = ref([]);

		function fetchClasses() {
			axios
				.get(BACKEND_URL + '/api/v1/class')
				.then((res) => {
					console.log('res = ', res);
					classes.value = res.data;
				})
				.catch((err) => console.log(err));
		}

		onBeforeMount(fetchClasses);

		return {
			classes,
			fetchClasses,
		};
	},
	methods: {
		addStudentToClass(_id: string, studentId?: string) {
			axios
				.put(BACKEND_URL + '/api/v1/class/' + _id + '/addStudent', {
					classId: _id,
					studentId: studentId,
				})
				.then((res) => {
					if (res.status === 200) {
						window.location.reload();
					} else {
						alert('Something went wrong');
					}
				})
				.catch((err) => {
					alert(err.response.data);
				});
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
