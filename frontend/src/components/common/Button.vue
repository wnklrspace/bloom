<template>
	<button
		class="button"
		:class="{
			primary: type === 'primary',
			secondary: type === 'secondary',
			error: type === 'error',
		}"
		@click="() => onClick()"
	>
		{{ text }}
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Button',
	props: {
		type: {
			type: String,
			default: 'primary',
		},
		text: {
			type: String,
			required: true,
		},
		onClick: {
			type: Function,
			required: true,
		},
	},
});
</script>

<style scoped>
.button {
	border: none;
	border-radius: 5px;
	height: 40px;
	padding: 0 30px;
	cursor: pointer;
}

.button.primary {
	background-color: #222;
	color: #fff;
}

.button.secondary {
	background-color: #eee;
	color: #222;
}

.button.secondary:hover {
	background-color: #ddd;
}

.button.error {
	background-color: #f00;
	color: #fff;
}

.button.error:hover {
	background-color: #d00;
}
</style>
