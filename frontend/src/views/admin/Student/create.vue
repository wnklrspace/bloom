<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
			{
				name: 'Students',
				path: '/admin/student',
			},
			{
				name: 'Create Student',
				path: '/admin/student/create',
			},
		]"
	/>
	<div class="wrapper">
		<div class="student-form-container">
			<BForm
				@submit="createStudent"
				class="student-form"
			>
				<BFormInput
					id="cname-input-field"
					v-model="input.cName"
					type="text"
					placeholder="Name"
					required
				/>

				<BFormInput
					id="adress-street-input-field"
					v-model="input.address.street"
					type="text"
					placeholder="Street"
					required
				/>

				<BFormInput
					id="adress-zipcode-input-field"
					v-model="input.address.zipCode"
					type="text"
					placeholder="Zipcode"
					required
				/>

				<BFormInput
					id="adress-city-input-field"
					v-model="input.address.city"
					type="text"
					placeholder="City"
					required
				/>

				<BFormInput
					id="contact-phoneNumber-input-field"
					v-model="input.contact.phoneNumber"
					type="text"
					placeholder="Phone number"
					required
				/>

				<BFormSelect
					id="class-select-field"
					v-model="selectedClass"
					required
					v-if="classes"
					v-b-tooltip.hover.top="'Select the class for this student.'"
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Select a Class
					</option>
					<option
						v-for="classItem in classes"
						:value="classItem._id"
					>
						{{ classItem.name }}
					</option>
				</BFormSelect>

				<BFormGroup class="student-form-inputs">
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
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';

export default {
	name: 'StudentCreate',
	setup() {
		const classes: any = ref();

		const fetchClassData = async () => {
			try {
				const res = await fetch('http://localhost:4000/api/v1/class');
				const fetchedClasses = await res.json();
				return fetchedClasses;
			} catch (err) {
				console.log(err);
			}
		};

		onBeforeMount(async () => {
			classes.value = await fetchClassData();
		});

		return {
			classes,
		};
	},
	data() {
		return {
			input: {
				cName: '',
				address: {
					street: '',
					zipCode: '',
					city: '',
				},
				contact: {
					phoneNumber: '',
				},
			},
			selectedClass: null,
			selected: null,
		};
	},
	methods: {
		async createStudent() {
			await axios
				.post('http://localhost:4000/api/v1/student', {
					cName: this.input.cName,
					address: {
						street: this.input.address.street,
						zipCode: this.input.address.zipCode,
						city: this.input.address.city,
					},
					contact: {
						phoneNumber: this.input.contact.phoneNumber,
					},
					selectedClass: this.selectedClass,
					role: 'student',
				})
				.then((res) => {
					alert(res.data);
					this.$router.push('/admin/student');
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

.student-form-container {
	max-width: 500px;
	width: 100%;
}

.student-form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
