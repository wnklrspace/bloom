<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
			{
				name: 'Teachers',
				path: '/admin/teacher',
			},
			{
				name: 'Create Teacher',
				path: '/admin/teacher/create',
			},
		]"
	/>
	<div class="wrapper">
		<div class="teacher-form-container">
			<BForm
				@submit="createTeacher"
				class="teacher-form"
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

				<BFormGroup class="teacher-form-inputs">
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
import axios from 'axios';
import Header from '@/components/admin/Header.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import { BACKEND_URL } from '@/config';

export default {
	name: 'TeacherCreate',
	setup() {},
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
			selected: null,
		};
	},
	methods: {
		async createTeacher() {
			await axios
				.post(BACKEND_URL + '/api/v1/teacher', {
					cName: this.input.cName,
					address: {
						street: this.input.address.street,
						zipCode: this.input.address.zipCode,
						city: this.input.address.city,
					},
					contact: {
						phoneNumber: this.input.contact.phoneNumber,
					},
					role: 'teacher',
				})
				.then((res) => {
					alert(res.data);
					this.$router.push('/admin/teacher');
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

.teacher-form-container {
	max-width: 500px;
	width: 100%;
}

.teacher-form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
