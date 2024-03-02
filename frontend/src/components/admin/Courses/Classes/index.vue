<template>
	<div class="list-container">
		<h3>Class Configuration Panel</h3>
		<p>
			This panel allows you to add or remove classes from a course. It
			automatically adds all classes with the same rank to one course.
		</p>

		<hr />

		<List
			title="Available Classes"
			:items="
				classes
					.filter((schoolClass: any) => {
						if (assignedClasses.length === 0) {
							return true;
						}

						return assignedClasses.includes(schoolClass._id);
					})
					.map((schoolClass: any) => {
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
									name: assignedClasses.includes(schoolClass._id)
										? 'Remove Class from Course'
										: 'Add Class to Course',
									type: 'primary',
									handler: () => {
										assignedClasses.includes(schoolClass._id)
											? removeClassFromCourse(courseId, schoolClass._id)
											: mandatory
											? assignOneClassToCourse({
													classId: schoolClass._id,
													courseId: courseId,
											  })
											: assignAllClassesWithRankToCourse({
													courseId: courseId,
													classes: classes.filter(
														(item: any) => item.rank === schoolClass.rank,
													),
											  });
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
	name: 'ClassConfiguration',
	props: {
		assignedClasses: {
			type: Array,
			required: true,
			readOnly: true,
		},
		courseId: {
			type: String,
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
	setup() {
		const classes: any = ref([]);

		function fetchClasses() {
			axios
				.get(BACKEND_URL + '/api/v1/class')
				.then((res) => {
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
		assignAllClassesWithRankToCourse({
			courseId,
			classes,
		}: {
			courseId: string;
			classes: any[];
		}) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addManyClasses`, {
					classes: classes,
				})
				.then((response) => {
					console.log(response);
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		},
		assignOneClassToCourse({
			classId,
			courseId,
		}: {
			classId: string;
			courseId: string;
		}) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addOneClass`, {
					classId: classId,
				})
				.then((response) => {
					console.log(response);
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		},
		addClassToCourse(_id: string, classId?: string) {
			axios
				.put(BACKEND_URL + '/api/v1/course/' + _id + '/addClass', {
					classId: classId,
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

		removeClassFromCourse(_id: string, classId?: string) {
			axios
				.put(BACKEND_URL + '/api/v1/course/' + _id + '/removeClass', {
					classId: classId,
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
