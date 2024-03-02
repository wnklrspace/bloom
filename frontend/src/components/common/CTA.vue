<template>
	<button
		class="button"
		@click="onClick"
	>
		{{ text }}
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'CTA',
	props: {
		text: {
			type: String,
			required: true,
		},
		onClick: {
      type: Function as any,
      required: true,
    },
	},
});
</script>

<style scoped>
.button {
	background-color: #222;
	border: none;
	border-radius: 10px;
	padding: 10px 20px;
	cursor: pointer;
}
</style>
