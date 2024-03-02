<template>
	<b-container class="login-view">
		<b-row>
			<b-col
				cols="5"
				class="login-wrapper"
			>
				<div class="login-img">
					<img
						src="../assets/login-logo.jpg"
						width="200"
						height="250"
					/>
				</div>
			</b-col>
			<b-col
				cols="2"
				class="vertical-line"
			></b-col>
			<b-col
				cols="5"
				class="login-form-wrapper"
			>
				<div class="login-text">
					<h1>Login</h1>
				</div>
				<div class="form">
					<BForm
						@submit="log"
						class="login-form"
					>
						<BFormGroup
							class="login-form-inputs"
							id="input-username"
							label="Enter username:"
							label-for="username-input-field"
						>
							<BFormInput
								id="username-input-field"
								v-model="input.userName"
								type="text"
								placeholder="Enter username"
								required
							/>
						</BFormGroup>
						<BFormGroup
							class="login-form-inputs"
							id="input-password"
							label="Enter password:"
							label-for="password-input-field"
						>
							<BFormInput
								id="password-input-field"
								v-model="input.password"
								type="password"
								placeholder="Enter password"
								required
							/>
						</BFormGroup>
						<p
							v-if="loginError"
							class="error-message"
						>
							Username oder Passwort sind falsch. Bitte überprüfen Sie Ihre
							Eingabe.
						</p>
						<BFormGroup class="">
							<BButton
								type="submit"
								variant="primary"
								>Submit</BButton
							>
						</BFormGroup>
					</BForm>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			input: {
				userName: '',
				password: '',
			},
			loginError: false,
		};
	},
	props: {},
	methods: {
		async log() {
			const usernameInput = document.getElementById('username-input-field');
			const passwordInput = document.getElementById('password-input-field');

			try {
				const response = await fetch(
					'http://localhost:4000/api/v1/user/login',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							userName: this.input.userName,
							password: this.input.password,
						}),
					},
				);
				const data = await response.json();
				localStorage.setItem('user', JSON.stringify(data));

				const storedUser = localStorage.getItem('user');
				const user = storedUser ? JSON.parse(storedUser) : null;

				if (user.role === 'student') {
					this.$router.push({ path: '/schedule' });
				} else if (user.role === 'admin') {
					this.$router.push({ path: '/admin' });
				}

				usernameInput?.classList.remove('error');
				passwordInput?.classList.remove('error');
				this.loginError = false;
				window.location.reload();
			} catch (error) {
				usernameInput?.classList.add('error');
				passwordInput?.classList.add('error');
				this.loginError = true;
			}

			document.forms[0].reset();
		},
	},
});
</script>

<style scoped>
.login-form-wrapper {
	display: flex;
	align-items: left;
	flex-direction: column;
}

.login-form-inputs {
	padding-bottom: 10px;
}

.vertical-line {
	width: 0px;
	border-left: 1px solid #000;
	min-height: 100%;
	float: left;
}

.login-view {
	display: flex;
	padding: 0 2rem;
	justify-content: center;
	align-items: center;
}

.error {
	border: red 2px solid;
}

.error-message {
	color: red;
}
</style>
