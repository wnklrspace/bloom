import CourseModel from '../../../models/CourseModel';
import ClassModel from '../../../models/ClassModel';
import StudentModel from '../../../models/StudentModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { CourseProps } from '../../../types/interfaces';
import { DatabaseRoomProps } from '../../../types/interfaces/roomInterface';
import { TIMESLOTS, WEEKDAYS } from '../../../types/enums';

/**
 * Updates an existing course in the database.
 * The following parameters can be updated:
 * @param name - Name of the course
 * @param mandatory - Is the course mandatory?
 * @param room - Room of the course
 * @param time - Time of the course
 * @param weekday - Weekday of the course
 * @param start - Start time of the course
 * @param end - End time of the course
 * @param courseTeacher - Teacher of the course
 * @param rank - Rank of all school classes that should be added
 * @param callback - Callback function
 * @returns {Promise<void>}
 */

const editCourse = async (
	params: {
		courseId: string;
		name?: string;
		mandatory?: boolean;
		room?: DatabaseRoomProps['_id'];
		time: {
			weekday?: WEEKDAYS;
			timeslot?: TIMESLOTS;
		};
		courseTeacher?: CourseProps['courseTeacher'];
	},
	callback: Callback,
) => {
	const course = await CourseModel.findById(params.courseId);

	if (!course || course === null) {
		callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_DOES_NOT_EXIST,
		});
		return;
	}

	const courseObjectToBeUpdated = {
		name: course.name,
		shortName: course.shortName,
		mandatory: course.mandatory,
		room: course.room,
		time: course.time,
		courseTeacher: course.courseTeacher,
		rank: course.rank,
		students: course.students,
		schoolClasses: course.schoolClasses,
	};

	/**
	 * Update course with a new name and short name
	 */
	if (params.name !== undefined) {
		courseObjectToBeUpdated.name = params.name;
		courseObjectToBeUpdated.shortName = params.name.substring(0, 3);
	}

	/**
	 * Update course with the new parameter for mandatory
	 */
	if (params.mandatory !== undefined) {
		courseObjectToBeUpdated.mandatory = params.mandatory;

		/**
		 * If the course becomes mandatory, add it to all students that are in the same rank
		 */
		if (params.mandatory) {
			const students = await StudentModel.find({
				rank: course.rank,
			});

			if (!students) {
				callback({
					isSuccess: false,
					message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
				});
				return;
			}

			students.forEach(async (student) => {
				const updatedStudent = await StudentModel.findByIdAndUpdate(
					student._id,
					{
						$push: {
							courses: course._id,
						},
					},
					{ new: true },
				);

				if (!updatedStudent) {
					callback({
						isSuccess: false,
						message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
					});
					return;
				}
			});
		}
	}

	/**
	 * Update course with the new parameter for the room
	 */
	if (params.room !== undefined) {
		courseObjectToBeUpdated.room = params.room;
	}

	/**
	 * Update course with the new parameter for a courseTeacher
	 */
	if (params.courseTeacher !== undefined) {
		courseObjectToBeUpdated.courseTeacher = params.courseTeacher;
	}

	try {
		const updatedCourse = await CourseModel.findByIdAndUpdate(
			params.courseId,
			courseObjectToBeUpdated,
			{ new: true },
		);

		if (!updatedCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.COURSE_COULD_NOT_BE_UPDATED,
			});
			return;
		}

		callback({
			isSuccess: true,
			message: Message.COURSE_SUCCESSFULLY_UPDATED,
			res: updatedCourse,
		});
		return;
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_COULD_NOT_BE_UPDATED,
		});
		return;
	}
};

export default editCourse;
