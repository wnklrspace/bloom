import CourseModel from '../../../models/CourseModel';
import StudentModel from '../../../models/StudentModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Removes a student from a course.
 *
 * @param params
 * @param courseId
 * @param studentId
 * @param callback
 */

const removeStudentFromCourse = async (
	params: {
		courseId: string;
		studentId: string;
	},
	callback: Callback,
) => {
	try {
		const courseId = params.courseId;
		const studentId = params.studentId;

		/**
		 * Check if course exists.
		 * If it does, check if student is still in the course.
		 */
		const studentIsStillInCourse = await CourseModel.findOne({
			_id: courseId,
			students: studentId,
		});

		if (!studentIsStillInCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_IS_NOT_IN_COURSE,
			});
			return;
		}

		/**
		 * Update the course object with the new student.
		 * Remove the course from the student object.
		 */
		await CourseModel.updateOne(
			{
				_id: courseId,
			},
			{
				$pull: {
					students: studentId,
				},
			},
		);

		await StudentModel.updateOne(
			{
				userId: studentId,
			},
			{
				$pull: {
					courses: courseId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: Message.STUDENT_SUCCESSFULLY_ADDED_TO_CLASS,
		});
	} catch (error) {
		callback({
			isSuccess: true,
			message: Message.STUDENT_SUCCESSFULLY_REMOVED_FROM_CLASS,
		});
	}
};

export default removeStudentFromCourse;
