<template>
	<b-row>
		<b-col cols="4">
			<router-link
				class="cta-button"
				:to="path"
			>
				<p>+ {{ title }}</p>
			</router-link>
		</b-col>
	</b-row>
</template>

<script lang="ts">
export default {
	name: 'CreateButton',
	props: {
		title: {
			type: String,
		},
		path: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
p {
	margin: 0;
}
.cta-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100px;
	border-radius: 0.5rem;
	text-decoration: none;
	border: 2px dashed #ccc;
	text-align: center;
	transition: 0.3s ease border;
}

.cta-button p {
	color: #000;
}

.cta-button:hover {
	background-color: #fff2db;
	border: 2px solid #ff9f00;
}
</style>
