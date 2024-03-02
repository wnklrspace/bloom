<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
			{
				name: 'Exams',
				path: '/admin/exam',
			},
			{
				name: 'Create Exam',
				path: '/admin/exam/create',
			},
		]"
	/>
	<div class="wrapper">
		<div class="exam-form-container">
			<BForm
				@submit="createExam"
				class="exam-form"
			>
				<BFormInput
					id="name-input-field"
					v-model="input.name"
					type="text"
					placeholder="Name"
					required
				/>

				<BFormInput
					id="weight-input-field"
					v-model="input.weight"
					type="number"
					placeholder="Weight"
					min="0.25"
					max="1"
					step="0.25"
					v-b-tooltip.hover.top="
						'Enter exam weight. Available values: 0.25, 0.5, 0.75, 1.'
					"
					required
				/>

				<BFormSelect
					id="weekday-select-field"
					v-model="input.type"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Examination Type
					</option>
					<option value="excercise">Excercise</option>
					<option value="exam">Exam</option>
					<option value="presentation">Presentation</option>
					<option value="project">Project</option>
				</BFormSelect>

				<BFormSelect
					id="course-select-field"
					v-model="input.courseId"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Course
					</option>
					<option
						v-for="course in courses"
						:value="course._id"
					>
						{{ course.name }}
					</option>
				</BFormSelect>

				<BFormGroup class="exam-form-inputs">
					<BButton
						type="submit"
						variant="primary"
						>Submit</BButton
					>
				</BFormGroup>
			</BForm>
		</div>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import Header from '@/components/admin/Header.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';

export default {
	name: 'ExamCreate',
	setup() {
		const courses: any = ref([]);

		function fetchCourses() {
			axios
				.get(BACKEND_URL + '/api/v1/course')
				.then((res) => {
					courses.value = res.data;
				})
				.catch((err) => console.log(err));
		}

		onBeforeMount(fetchCourses);

		return {
			courses,
		};
	},
	data() {
		return {
			input: {
				name: '',
				weight: 1,
				type: '',
				courseId: '',
			},
		};
	},
	methods: {
		async createExam() {
			await axios
				.post(BACKEND_URL + '/api/v1/exam', {
					name: this.input.name,
					weight: this.input.weight,
					type: this.input.type,
					courseId: this.input.courseId,
				})
				.then((res) => {
					alert(res.data);
					this.$router.push('/admin/exam');
				})
				.catch((err) => {
					alert(err.response.data);
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

.exam-form-container {
	max-width: 500px;
	width: 100%;
}

.exam-form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
