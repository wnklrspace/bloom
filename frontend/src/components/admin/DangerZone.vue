<template>
	<div class="list-container">
		<p>
			<strong>Danger Zone</strong>
		</p>
		<div class="inner">
			<ul class="list">
				<li class="list-item">
					<p>
						<strong> Delete this {{ title }}</strong> <br />
						Once you delete a {{ title }}, there is no going back. Please be
						certain.
					</p>
					<Button
						:text="`Delete ${title}`"
						:onClick="onClick"
						type="error"
					></Button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import Button from '@/components/common/Button.vue';

export default {
	name: 'DangerZone',
	props: {
		title: {
			type: String,
			required: true,
		},
		onClick: {
			type: Function,
			required: true,
		},
	},
};
</script>

<style scoped>
p {
	margin: 0;
}
.list-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.container {
	width: 100%;
}

.inner {
	width: 100%;
	display: flex;
	justify-content: center;
}

.list {
	flex: 1;
	list-style: none;
	padding: 0;
	margin: 0;
}

.list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 0.5rem 0.5rem 1rem !important;
	border-radius: 0.5rem;
	border: 1px solid red;
}

.list-item p {
	margin: 0;
}
</style>
