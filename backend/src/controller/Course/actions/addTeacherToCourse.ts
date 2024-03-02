import CourseModel from '../../../models/CourseModel';
import TeacherModel from '../../../models/TeacherModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Adds a student to a course.
 *
 * @param params
 * @param courseId
 * @param studentId
 * @param callback
 */
const addTeacherToCourse = async (
	params: {
		teacherId: string;
		courseId: string;
	},
	callback: Callback,
) => {
	try {
		const { teacherId, courseId } = params;

		/**
		 * Check if course exists.
		 * If it does, check if student is already in the course.
		 */
		const teacherIsAlreadyInCourse = await CourseModel.findOne({
			_id: courseId,
			courseTeacher: teacherId,
		});

		if (teacherIsAlreadyInCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.TEACHER_ALREADY_IN_COURSE,
			});
			return;
		}

		/**
		 * Update the course object with the new teacher.
		 * Add the course to the teacher object.
		 */
		await TeacherModel.updateOne(
			{
				userId: teacherId,
			},
			{
				$push: {
					courses: courseId,
				},
			},
		);

		await CourseModel.updateOne(
			{ _id: courseId },
			{ courseTeacher: teacherId },
		);

		callback({
			isSuccess: true,
			message: Message.TEACHER_SUCCESSFULLY_ADDED_TO_COURSE,
		});
	} catch (err) {
		callback({
			isSuccess: false,
			message: ErrorMessage.TEACHER_COULD_NOT_BE_ADDED_TO_COURSE,
		});
	}
};

export default addTeacherToCourse;
