import CourseModel from '../../../models/CourseModel';
import StudentModel from '../../../models/StudentModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Adds a student to a course.
 *
 * @param params
 * @param courseId
 * @param classId
 * @param studentId
 * @param callback
 */
const addStudentToCourse = async (
	params: {
		studentId: string;
		classId: string | null;
		courseId: string;
	},
	callback: Callback,
) => {
	try {
		const { studentId, classId, courseId } = params;

		if (classId === null) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_IS_NOT_IN_CLASS,
			});
			return;
		}

		/**
		 * Check if course exists.
		 * If it does, check if student is already in the course.
		 */

		const studentIsAlreadyInCourse = await CourseModel.findOne({
			_id: courseId,
			students: studentId,
		});

		if (studentIsAlreadyInCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_ALREADY_IN_COURSE,
			});
			return;
		}

		/**
		 * Update the course object with the new student.
		 * Add the course to the student object.
		 */
		await CourseModel.updateOne(
			{
				_id: courseId,
			},
			{
				$push: {
					students: studentId,
				},
			},
		);

		await StudentModel.updateOne(
			{
				userId: studentId,
			},
			{
				$push: {
					courses: courseId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: Message.STUDENT_SUCCESSFULLY_ADDED_TO_COURSE,
		});
	} catch (err) {
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_ADDED_TO_COURSE,
		});
	}
};

export default addStudentToCourse;
