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
		]"
	/>
	<div class="wrapper">
		<CreateButton
			title="Room"
			path="/admin/room/create"
		/>

		<ul class="room-list">
			<List
				title="Available Rooms"
				:items="
					rooms.map((room: any) => {
						return {
							title: room.name,
							link: `/admin/room/${room._id}`,
							handlers: [
								{
									name: 'Edit',
									handler: () => {
										$router.push(`/admin/room/${room._id}`);
									},
								},
							],
						};
					})
				"
			/>
		</ul>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import Header from '@/components/admin/Header.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import CreateButton from '@/components/common/CreateButton.vue';
import List from '@/components/admin/List.vue';

export default {
	name: 'RoomOverview',
	components: {
		Header,
		Breadcrumbs,
	},
	setup() {
		const rooms: any = ref([]);

		const fetchRooms = async () => {
			await axios
				.get(BACKEND_URL + '/api/v1/room')
				.then((response) => {
					rooms.value = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		};

		onBeforeMount(fetchRooms);

		return {
			rooms,
		};
	},
};
</script>

<style scoped>
ul,
li {
	list-style: none;
	margin: 0;
	padding: 0 !important;
}

.wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 20px;
}
</style>
