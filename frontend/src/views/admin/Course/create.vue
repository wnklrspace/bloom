<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Admin Panel',
				path: '/admin',
			},
			{
				name: 'Courses',
				path: '/admin/course',
			},
			{
				name: 'Create Course',
				path: '/admin/course/create',
			},
		]"
	/>

	<div class="wrapper">
		<div class="form-container">
			<BForm
				@submit="createCourse"
				class="form"
			>
				<BFormCheckbox
					id="mandatory-checkbox"
					v-model="formVals.mandatory"
					v-on:change="isMandatory = !isMandatory"
					name="mandatory"
					value="true"
					unchecked-value="false"
					>Mandatory</BFormCheckbox
				>

				<BFormInput
					id="name-input-field"
					v-model="formVals.input.name"
					type="text"
					placeholder="Name"
					required
				/>

				<BFormSelect
					id="weekday-select-field"
					v-model="formVals.input.time.weekday"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Weekday
					</option>
					<option value="monday">Monday</option>
					<option value="tuesday">Tuesday</option>
					<option value="wednesday">Wednesday</option>
					<option value="thursday">Thursday</option>
					<option value="friday">Friday</option>
					<option value="saturday">Saturday</option>
				</BFormSelect>

				<BFormSelect
					id="timeslot-select-field"
					v-model="formVals.input.time.timeslot"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Timeslot
					</option>
					<option value="08:15 - 09:45">08:15 - 09:45</option>
					<option value="10:00 - 11:30">10:00 - 11:30</option>
					<option value="11:45 - 13:15">11:45 - 13:15</option>
					<option value="14:15 - 15:45">14:15 - 15:45</option>
					<option value="16:00 - 17:30">16:00 - 17:30</option>
					<option value="17:45 - 19:15">17:45 - 19:15</option>
				</BFormSelect>

				<BFormSelect
					id="class-select-field"
					v-model="formVals.selectedClass"
					required
					v-if="classes && isMandatory"
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Schoolclass
					</option>
					<option
						v-for="classItem in classes"
						:value="classItem._id"
					>
						{{ classItem.name }}
					</option>
				</BFormSelect>

				<BFormSelect
					id="class-select-field"
					v-model="formVals.room"
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						{{
							rooms && rooms.length > 0
								? 'Choose Room'
								: 'No Room available for specified day and timeslot'
						}}
					</option>
					<option
						v-for="room in rooms"
						:value="room"
					>
						{{ room.name }}
					</option>
				</BFormSelect>

				<BFormSelect
					id="class-select-field"
					v-model="formVals.rank"
					v-if="!isMandatory"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Schoolclass Rank
					</option>
					<option
						v-for="rank in ranks"
						:value="rank"
					>
						{{ rank }}
					</option>
				</BFormSelect>

				<BFormSelect
					id="teacher-select-field"
					v-model="formVals.courseTeacher"
					v-if="teacher"
					required
				>
					<option
						value=""
						disabled
						selected
						hidden
					>
						Teacher
					</option>
					<option
						v-for="teacherItem in teacher"
						:value="teacherItem._id"
					>
						{{ teacherItem.cName }}
					</option>
				</BFormSelect>

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
import { ref, onBeforeMount, watch } from 'vue';
import axios from 'axios';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import { BACKEND_URL } from '@/config';

export default {
	name: 'CourseCreate',
	setup() {
		// Define reactive properties
		const formVals = ref({
			input: {
				name: '',
				time: {
					weekday: '',
					timeslot: '',
				},
			},
			rank: '',
			selectedClass: '',
			room: '',
			courseTeacher: '',
			mandatory: false,
		});
		const isMandatory = ref(false);
		const classes: any = ref();
		const teacher: any = ref();
		const rooms: any = ref();
		const ranks = ['5', '6', '7', '8', '9', '10', '11', '12'];

		const fetchClassData = async () => {
			try {
				const res = await fetch('http://localhost:4000/api/v1/class');
				const fetchedClasses = await res.json();
				return fetchedClasses;
			} catch (err) {
				console.log(err);
			}
		};

		const fetchTeacherData = async () => {
			try {
				const res = await fetch('http://localhost:4000/api/v1/teacher');
				const data = await res.json();
				return data;
			} catch (err) {
				console.log(err);
			}
		};

		const fetchRoomData = async () => {
			try {
				console.log(
					formVals.value.input.time.weekday,
					formVals.value.input.time.timeslot,
				);
				const response = await axios.post(
					BACKEND_URL + '/api/v1/room/availableRooms',
					{
						day: formVals.value.input.time.weekday,
						time: formVals.value.input.time.timeslot,
					},
				);

				rooms.value = response.data;
			} catch (error) {
				console.log(error);
			}
		};

		/**
		 * Call fetchRoomData when timeslot or weekday changes
		 */
		watch(
			() =>
				formVals.value.input.time.weekday && formVals.value.input.time.timeslot,
			() => {
				fetchRoomData();
			},
		);

		onBeforeMount(async () => {
			await fetchRoomData();
			const classesData = await fetchClassData();
			const teacherData = await fetchTeacherData();

			classes.value = classesData;
			teacher.value = teacherData;
		});

		return {
			classes,
			teacher,
			rooms,
			ranks,
			isMandatory,
			formVals,
		};
	},
	methods: {
		async createCourse() {
			await axios
				.post('http://localhost:4000/api/v1/course', {
					name: this.formVals.input.name,
					mandatory: this.formVals.mandatory,
					time: {
						weekday: this.formVals.input.time.weekday,
						timeslot: this.formVals.input.time.timeslot,
					},
					room: this.formVals.room,
					rank: this.formVals.rank ? this.formVals.rank : null,
					class: this.formVals.selectedClass
						? this.formVals.selectedClass
						: null,
					courseTeacher: this.formVals.courseTeacher,
				})
				.then((res) => {
					alert(res.data);
					this.$router.push('/admin/course');
				})
				.catch((err) => {
					alert(err.response.data);
				});
		},
	},
};
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 20px;

	padding: 2rem;
}

.breadcrumbs {
	list-style: none;
	padding: 20px 0;
	margin: 0;
	display: flex;
	align-items: center;
}

.breadcrumbs li {
	display: inline-block;
}

.breadcrumbs li a {
	color: #777;
	text-decoration: none;
}

.breadcrumbs li a:hover {
	text-decoration: underline;
}

.form-container {
	max-width: 500px;
	width: 100%;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
