import CourseModel from '../../../models/CourseModel';
import TeacherModel from '../../../models/TeacherModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Removes a student from a course.
 *
 * @param params
 * @param courseId
 * @param teacherId
 * @param callback
 */

const removeTeacherFromCourse = async (
	params: {
		courseId: string;
		teacherId: string;
	},
	callback: Callback,
) => {
	try {
		const courseId = params.courseId;
		const teacherId = params.teacherId;

		/**
		 * Check if course exists.
		 * If it does, check if student is still in the course.
		 */

		const teacherIsInCourse = await CourseModel.findOne({
			_id: courseId,
			courseTeacher: teacherId,
		});

		if (!teacherIsInCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.TEACHER_IS_NOT_IN_COURSE,
			});
			return;
		}

		/**
		 * Update the course object with the new student.
		 * Remove the course from the student object.
		 */
		await CourseModel.updateOne({ _id: courseId }, { courseTeacher: null });

		await TeacherModel.updateOne(
			{
				userId: teacherId,
			},
			{
				$pull: {
					courses: courseId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: Message.TEACHER_SUCCESSFULLY_REMOVED_FROM_COURSE,
		});
	} catch (error) {
		callback({
			isSuccess: true,
			message: ErrorMessage.TEACHER_COULD_NOT_BE_REMOVED_FROM_COURSE,
		});
	}
};

export default removeTeacherFromCourse;
