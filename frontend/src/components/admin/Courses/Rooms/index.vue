<template>
	<div class="list-container">
		<p>
			<strong> Room </strong>

			<p>
				Current: {{ course.room ? allRooms.find((r: any) => r._id === room)?.name : 'No room assigned yet' }}
			</p>
		</p>

		<BForm
			@submit="addCourseToRoom()"
			class="form"
		>
			<BFormSelect
				id="class-select-field"
				v-model="course.room"
				required
				v-if="rooms"
				v-b-tooltip.hover.top="'Change the room for this course.'"
			>
				<option
					value=""
					disabled
					selected
					hidden
				>
					{{ course.room ? 'Change room' : 'Select room' }}
				</option>
				<option
					v-for="roomItem in rooms"
					:value="roomItem._id"
				>
					{{ roomItem.name }}
				</option>
			</BFormSelect>
			<BButton
				type="submit"
				variant="primary"
				>Save</BButton
			>
		</BForm>
	</div>
</template>

<script lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import axios from 'axios';
import TimeTableSelection from '@/components/admin/Courses/Rooms/TimeTableSelection.vue';
import { BACKEND_URL } from '@/config';

export default {
	name: 'RoomConfiguration',
	components: {
		TimeTableSelection,
	},
	props: {
		course: {
			type: Object,
			required: true,
			readOnly: true,
		},
		room: {
			type: String,
			required: false,
			readOnly: true,
		},
	},
	setup(props) {
		const allRooms: any = ref([]);
		const rooms: any = ref([]);

		const fetchAllRooms = async () => {
			try {
				const response = await axios.get(
					BACKEND_URL + '/api/v1/room',
				);

				allRooms.value = response.data;
			} catch (error) {
				console.log(error);
			}
		};

		const fetchAvailableRooms = async () => {
			try {
				const response = await axios.post(
					BACKEND_URL + '/api/v1/room/availableRooms',
					{
						day: props.course.time.weekday,
						time: props.course.time.timeslot,
					},
				);

				rooms.value = response.data;
			} catch (error) {
				console.log(error);
			}
		};

		const addCourseToRoom = async () => {
			try {
				await axios
					.put(
						BACKEND_URL + `/api/v1/room/${props.course.room}/addCourseToRoom`,
						{
							courseId: props.course._id,
						},
					)
					.then(() => {
						window.location.reload();
					});
			} catch (error) {
				alert(error);
				console.log(error);
			}
		};

		onBeforeMount(fetchAllRooms);

		watch(
			() => props.course,
			() => {
				if (props.course && props.course.time) {
					fetchAvailableRooms();
				}
			},
			{ immediate: true },
		);

		return {
			rooms,
			allRooms,
			addCourseToRoom,
		};
	},
};
</script>

<style scoped>
.list-container {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.form {
	display: flex;
	gap: 20px;
}
.class-select-field {
	width: 100%;
	height: 60px;
}
</style>
