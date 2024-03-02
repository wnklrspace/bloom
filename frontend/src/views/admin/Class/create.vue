<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
			{
				name: 'Classes',
				path: '/admin/class',
			},
			{
				name: 'Create Class',
				path: '/admin/class/create',
			},
		]"
	/>
	<div class="wrapper">
		<div class="class-form-container">
			<BForm
				@submit="createClass"
				class="class-form"
			>
				<BFormSelect
					id="class-select-field"
					v-model="input.rank"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Rank
					</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
					<option value="11">11</option>
					<option value="12">12</option>
					<option value="13">13</option>
				</BFormSelect>

				<div
					class="input-container"
					:class="{ ['rank-selected']: input.rank }"
				>
					<BFormInput
						id="name-input-field"
						v-model="input.name"
						type="text"
						placeholder="Name"
						required
					/>
					<p v-if="input.rank">{{ input.rank }}</p>
				</div>

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
import Header from '@/components/admin/Header.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import axios from 'axios';

export default {
	name: 'ClassCreate',
	setup() {},
	data() {
		return {
			input: {
				name: '',
				rank: '',
			},
		};
	},
	methods: {
		createClass() {
			axios
				.post('http://localhost:4000/api/v1/class', {
					name: this.input.name,
					rank: this.input.rank,
				})
				.then((res) => {
					console.log(res);
					this.$router.push('/admin/class');
				})
				.catch((err) => console.log(err));
		},
	},
};
</script>

<style scoped>
.class-form-container {
	max-width: 500px;
	width: 100%;
}

.class-form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.input-container {
	position: relative;
	display: flex;
}

.rank-selected input {
	padding-left: 2rem;
}

.input-container p {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	margin: 0;
	padding: 0.375rem 2.25rem 0.375rem 0.75rem;
	line-height: 1.6;
}
</style>
