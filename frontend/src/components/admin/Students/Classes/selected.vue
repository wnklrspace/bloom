<template>
	<div class="class-container">
		<ul>
			<li>{{ schoolClass.name }}</li>
			<li>
				<ul class="cta-list">
					<li>
						<Button
							type="secondary"
							text="edit"
							:onClick="() => $router.push(`/admin/class/${schoolClass._id}`)"
						/>
					</li>
					<li>
						<Button
							type="error"
							text="Sign out of Class"
							:onClick="
								() => removeStudentFromClass(schoolClass._id, studentId)
							"
						/>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { BACKEND_URL } from '@/config';
import Button from '@/components/common/Button.vue';

export default {
	name: 'SelectedClass',
	components: {
		Button,
	},
	props: {
		classId: {
			type: String,
		},
		studentId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const schoolClass: any = ref({});
		const fetchClass = () => {
			axios
				.get(BACKEND_URL + '/api/v1/class/' + props.classId)
				.then((res) => {
					schoolClass.value = res.data;
				})
				.catch((err) => console.log(err));
		};

		onBeforeMount(fetchClass);

		return {
			schoolClass,
		};
	},
	methods: {
		removeStudentFromClass(classId: string, studentId: string) {
			if (!studentId) {
				alert('Please select a student to add to the class');
			}

			axios
				.put(BACKEND_URL + '/api/v1/class/' + classId + '/removeStudent', {
					classId: classId,
					studentId: studentId,
				})
				.then((res: any) => {
					if (res.status === 200) {
						window.location.reload();
					} else {
						throw new Error(res.data.message);
					}
				})
				.catch((err: any) => {
					console.log(err);
				});
		},
	},
};
</script>

<style scoped>
h3,
p {
	margin: 0;
}

.class-container {
	background-color: #fff;
	border: 1px solid #ccc;
	padding: 10px;
	border-radius: 0.5rem;
}

.class-container ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.cta-list {
	display: flex;
	flex-direction: row;
	gap: 10px;
}

.cta-list li {
	list-style: none;
}
</style>
