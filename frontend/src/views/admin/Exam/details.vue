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
				name: exam.name,
				path: `/admin/exam/${exam._id}`,
			},
		]"
	/>

	<div class="wrapper">
		<h1>{{ exam.name }}</h1>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { BACKEND_URL } from '@/config';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import Header from '@/components/admin/Header.vue';
import Space from '@/components/common/Space.vue';
import ClassConfiguration from '@/components/admin/Students/Classes/index.vue';
import CourseConfiguration from '@/components/admin/Students/Courses/index.vue';
import DangerZone from '@/components/admin/DangerZone.vue';

export default {
	name: 'ExamDetails',
	components: {
		Breadcrumbs,
		Header,
		Space,
		ClassConfiguration,
		CourseConfiguration,
		DangerZone,
	},

	setup() {
		const route = useRoute();
		const exam: any = ref({});

		const fetchExam = async () => {
			const response = await fetch(
				BACKEND_URL + '/api/v1/exam/' + route.params.id,
			);
			const data = await response.json();
			exam.value = data;
		};

		onBeforeMount(fetchExam);

		return {
			exam,
		};
	}
};
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;

	padding: 2rem;
}
</style>
