<template>
	<div
		v-if="room.value"
		class="timetable-container"
	>
		<div v-for="day in Object.entries(room.value.timetable)">
			<!-- <p>DAY = {{ day[0] }}</p> -->
			<div v-for="slot in Object.entries(day)">SLOT = {{ slot[1] }}</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'TimeTableSelection',
	props: {
		room: {
			type: Object as any,
			required: true,
		},
	},
};
</script>

<style scoped></style>
