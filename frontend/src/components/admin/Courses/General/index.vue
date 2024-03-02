<template>
	<div>
		<div class="title-container">
			<h1>{{ course.name }}</h1>
			<div class="short-name-container">
				<p>{{ course.shortName }}</p>
			</div>
		</div>
	</div>

	<div>
		<BRow>
			<BCol cols="4">
				<div class="list-wrapper">
					<p>
						<strong>General</strong>
					</p>
					<ul class="list">
						<li class="list-item">
							<div class="form">
								<label for="mandatory">Mandatory</label>
								<BFormCheckbox
									id="mandatory"
									v-model="course.mandatory"
									name="mandatory"
									switch
									:onChange="
										() =>
											handleMandatoryChange({
												courseId: course._id,
												mandatory: course.mandatory,
												selectedClasses: course.schoolClasses,
											})
									"
								/>
							</div>
						</li>
					</ul>
				</div>
				<RoomConfiguration
					:course="course"
					:room="course.room"
				/>
			</BCol>
			<BCol cols="8">
				<List
					title="Teacher"
					:items="
						teacher
							.filter((teacherItem: any) => {
								if (!course.courseTeacher) {
									return true;
								}

								if (
									course.courseTeacher &&
									teacherItem._id === course.courseTeacher
								) {
									return true;
								} else {
									return false;
								}
							})
							.map((teacherItem: any) => {
								return {
									link: `/admin/teacher/${teacherItem._id}`,
									title: teacherItem.cName,
									handlers: [
										{
											name: course.courseTeacher
												? 'Remove from course'
												: 'Add to course',
											type: 'secondary',
											handler: () => {
												course.courseTeacher
													? removeTeacherFromCourse(course._id, teacherItem._id)
													: addTeacherToCourse(course._id, teacherItem._id);
											},
										},
									],
								};
							})
					"
				/>
			</BCol>
		</BRow>
	</div>

	<div
		v-if="isMandatory"
		class="modal"
	>
		<b-modal
			v-model="showModal"
			title="Choose one class"
			v-on:cancel="cancelMakeMandatory()"
			v-on:ok="cancelMakeMandatory()"
			v-on:close="cancelMakeMandatory()"
			v-on:hide="cancelMakeMandatory()"
		>
			<p>
				You have to choose one class for this course in order to make it
				mandatory. A mandatory course cannot be assigned to multiple classes.
			</p>
			<ul
				v-for="classItem in classes.filter((schoolClass: any) => {
					if (course.schoolClasses.length === 0) {
						return true;
					}

					return course.schoolClasses.includes(schoolClass._id);
				})"
			>
				<li class="list-item">
					<p>
						{{ classItem.name }}
					</p>
					<button
						class="button secondary"
						v-on:click="
							assignOneClassToCourse({
								classId: classItem._id,
								courseId: course._id,
							})
						"
					>
						Assign
					</button>
				</li>
			</ul>
		</b-modal>
	</div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import { BACKEND_URL } from '@/config';
import List from '../../List.vue';
import RoomConfiguration from '@/components/admin/Courses/Rooms/index.vue';

export default {
	name: 'GeneralConfiguration',
	components: {
		List,
		RoomConfiguration,
	},
	props: {
		course: {
			type: Object,
			required: true,
			readOnly: true,
		},
	},
	data() {
		return {
			isMandatory: false,
			showModal: false,
		};
	},
	setup() {
		const teacher: any = ref([]);
		const rooms: any = ref([]);
		const classes: any = ref([]);
		const isMandatory = ref(false);

		const fetchTeacher = async () => {
			axios
				.get(BACKEND_URL + '/api/v1/teacher')
				.then((response) => {
					teacher.value = response.data;
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		};

		const fetchClasses = async () => {
			axios
				.get(BACKEND_URL + '/api/v1/class')
				.then((response) => {
					classes.value = response.data;
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		};

		const fetchRoomData = async () => {
			try {
				const res = await fetch('http://localhost:4000/api/v1/room');
				const data = await res.json();
				return data;
			} catch (err) {
				console.log(err);
			}
		};

		onBeforeMount(async () => {
			fetchClasses();
			fetchTeacher();
		});

		return {
			teacher,
			rooms,
			isMandatory,
			classes,
		};
	},
	methods: {
		async addTeacherToCourse(courseId: string, teacherId: string) {
			await axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addTeacher`, {
					teacherId: teacherId,
				})
				.then((response) => {
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		},
		async removeTeacherFromCourse(courseId: string, teacherId: string) {
			await axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/removeTeacher`, {
					teacherId: teacherId,
				})
				.then((response) => {
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		},
		async handleMandatoryChange({
			courseId,
			mandatory,
			selectedClasses,
		}: {
			courseId: string;
			mandatory?: boolean;
			selectedClasses: any[];
		}) {
			if (mandatory === false) {
				this.isMandatory = false;
				this.showModal = false;

				this.assignAllClassesWithRankToCourse({
					courseId: courseId,
					classes: selectedClasses,
				});

				this.editCourse({
					courseId: courseId,
					mandatory: false,
				});
			} else {
				this.isMandatory = true;
				this.showModal = true;
			}
		},
		async cancelMakeMandatory() {
			this.isMandatory = false;
			this.showModal = false;
			window.location.reload();
		},
		async editCourse({
			courseId,
			name,
			room,
			mandatory,
		}: {
			courseId: string;
			name?: string;
			room?: string;
			mandatory?: boolean;
		}) {
			await axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}`, {
					name: name,
					room: room,
					mandatory: mandatory,
				})
				.then((response) => {
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		},
		assignAllClassesWithRankToCourse({
			courseId,
			classes,
		}: {
			courseId: string;
			classes: any[];
		}) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addManyClasses`, {
					classes: classes,
				})
				.then((response) => {
					console.log(response);
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});
		},
		assignOneClassToCourse({
			classId,
			courseId,
		}: {
			classId: string;
			courseId: string;
		}) {
			axios
				.put(BACKEND_URL + `/api/v1/course/${courseId}/addOneClass`, {
					classId: classId,
				})
				.then((response) => {
					console.log(response);
					window.location.reload();
				})
				.catch((error) => {
					alert(error);
					console.log(error);
				});

			this.editCourse({
				courseId: courseId,
				mandatory: true,
			});
		},
	},
};
</script>

<style scoped>
p,
ul,
li {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.list-wrapper {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.list {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
}

.list-item {
	height: 60px;
	border: 1px solid #ccc;
	background-color: #fff;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px !important;
}

.form {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
}
.title-container {
	display: flex;
	align-items: center;
	gap: 10px;
}
.short-name-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	padding: 0 20px;
	border-radius: 5px;
	background-color: #eee;
}

.orange-bg {
	background-color: #fdb4ff;
}

.mandatory-form {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
</style>
