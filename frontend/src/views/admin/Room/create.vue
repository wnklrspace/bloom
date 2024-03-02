<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
			{
				name: 'Rooms',
				path: '/admin/room',
			},
			{
				name: 'Create Room',
				path: '/admin/room/create',
			},
		]"
	/>
	<div class="wrapper">
		<div class="form-container">
			<BForm
				@submit="createRoom"
				class="form"
			>
				<BFormInput
					id="name-input-field"
					v-model="input.name"
					type="text"
					placeholder="Name"
					required
				/>

				<BFormGroup class="room-form-inputs">
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
import Header from '@/components/admin/Header.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import axios from 'axios';

export default {
	name: 'RoomCreate',
	setup() {},
	data() {
		return {
			input: {
				name: '',
			},
		};
	},
	methods: {
		async createRoom() {
			await axios
				.post('http://localhost:4000/api/v1/room', {
					name: this.input.name,
				})
				.then((res) => {
					alert(res.data);
					this.$router.push('/admin/room');
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
	margin-top: 20px;
}

.breadcrumbs {
	list-style: none;
	padding: 20px 0;
	margin: 0;
	display: flex;
	align-items: center;
}

.breadcrumbs li {
	display: inline-block;
}

.breadcrumbs li a {
	color: #777;
	text-decoration: none;
}

.breadcrumbs li a:hover {
	text-decoration: underline;
}

.form-container {
	max-width: 500px;
	width: 100%;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
