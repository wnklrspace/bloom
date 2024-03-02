<template>
	<div class="list-container">
		<h3>Exam Configuration Panel</h3>

		<hr />

		<List
			title="Exams"
			:items="
				exams
					.filter((e: any) => e.courseId === courseId)
					.map((exam: any) => {
						return {
							link: `/admin/exam/${exam._id}`,
							title: exam.name,
							handlers: [
								{
									name: 'Remove Exam from Course',
									type: 'primary',
									handler: () => {
										console.log('remove exam from course');
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

export default {
	name: 'ExamConfiguration',
	props: {
		courseId: {
			type: String,
			required: true,
			readOnly: true,
		},
	},
	components: {
		List,
		Button,
	},
	setup() {
		const exams: any = ref([]);

		function fetchExams() {
			axios
				.get(BACKEND_URL + '/api/v1/exam')
				.then((res) => {
					exams.value = res.data;
				})
				.catch((err) => console.log(err));
		}

		onBeforeMount(fetchExams);

		return {
			exams,
		};
	},
};
</script>

<style scoped></style>
