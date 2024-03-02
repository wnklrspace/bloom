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
				name: room.name,
				path: `/admin/course/${room._id}`,
			},
		]"
	/>
	<div class="wrapper">
		<h1>{{ room.name }}</h1>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import Header from '@/components/admin/Header.vue';
import Space from '@/components/common/Space.vue';
import DangerZone from '@/components/admin/DangerZone.vue';

export default {
	name: 'RoomDetails',
	components: {
		Breadcrumbs,
		Header,
		Space,
		DangerZone,
	},
	setup() {
		const route = useRoute();
		const room: any = ref({});

		const fetchRoom = async () => {
			await axios
				.get(`http://localhost:4000/api/v1/room/${route.params.id}`)
				.then((response) => {
					room.value = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		};

		onBeforeMount(fetchRoom);

		return {
			room,
		};
	}
};
</script>

<style scoped>
p {
	margin: 0;
}

.wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 20px;
}
</style>
