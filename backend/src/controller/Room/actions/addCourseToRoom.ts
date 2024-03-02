import CourseModel from '../../../models/CourseModel';
import RoomModel from '../../../models/RoomModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import helper from '../../../utils/helper';

const addCourseToRoom = async (
	params: {
		roomId: string;
		courseId: string;
	},
	callback: Callback,
) => {
	const { roomId, courseId } = params;

	const course = await CourseModel.findOne({ _id: courseId });

	if (!course) {
		return callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_COULD_NOT_BE_UPDATED,
		});
	}

	/**
	 * Update the course with the given roomId
	 */
	await CourseModel.findOneAndUpdate(
		{ _id: courseId },
		{ $set: { room: roomId } },
		{ new: true },
	).catch((error) => {
		return callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_COULD_NOT_BE_UPDATED,
		});
	});

	if (course.room && course.room.toString() === roomId) {
		return callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_IS_ALREADY_ASSIGNED_TO_ROOM,
		});
	}

	/**
	 * Remove the course from the old room
	 */
	await RoomModel.findOneAndUpdate(
		{
			_id: course.room,
			[`timetable.${course.time?.weekday}.${helper.findTimeSlotKey(
				course.time?.timeslot,
			)}.course`]: courseId,
		},
		{
			$set: {
				[`timetable.${course.time?.weekday}.${helper.findTimeSlotKey(
					course.time?.timeslot,
				)}.course`]: null,
			},
		},
		{ new: true },
	).catch((error) => {
		console.error('ERROR = ', error);

		return callback({
			isSuccess: false,
			message: ErrorMessage.ROOM_COULD_NOT_BE_UPDATED,
		});
	});

	/**
	 * Update the room with the given course time
	 */
	await RoomModel.findOneAndUpdate(
		{
			_id: roomId,
		},
		{
			$set: {
				[`timetable.${course.time?.weekday}.${helper.findTimeSlotKey(
					course.time?.timeslot,
				)}.course`]: course._id,
			},
		},
		{ new: true },
	).catch((error) => {
		console.error('ERROR = ', error);

		return callback({
			isSuccess: false,
			message: ErrorMessage.ROOM_COULD_NOT_BE_UPDATED,
		});
	});

	return callback({
		isSuccess: true,
		message: Message.COURSE_SUCCESSFULLY_UPDATED,
	});
};

export default addCourseToRoom;
