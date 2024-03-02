import CourseModel from '../../../models/CourseModel';
import ClassModel from '../../../models/ClassModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import StudentModel from '../../../models/StudentModel';

/**
 * Adds a student to a course.
 *
 * @param params
 * @param courseId
 * @param classId
 * @param callback
 */
const removeClassFromCourse = async (
	params: {
		courseId: string;
		classId: string;
	},
	callback: Callback,
) => {
	try {
		const { courseId, classId } = params;

		/**
		 * Check if course is already assinged to class.
		 */

		const classesDoNotExistInCourse = await CourseModel.findOne({
			_id: courseId,
			schoolClasses: {
				$in: [classId],
			},
		});

		if (!classesDoNotExistInCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_IS_NOT_ASSIGNED_TO_COURSE,
			});
			return;
		}

		/**
		 * Find all classes with the same rank as the class to be removed.
		 */
		const classToBeAdded: any = await ClassModel.findOne({
			_id: classId,
		});
		const allClassesWithSameRank = await ClassModel.find({
			rank: classToBeAdded.rank,
		});

		/**
		 * Remove all classes with the same rank from the course.
		 * Set the rank of the course to null.
		 *
		 * Find all students in the class to be removed.
		 * Remove all students from the course.
		 */

		const classFromStudents = await ClassModel.findOne({
			_id: classId,
		});

		if (!classFromStudents) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_REMOVED_FROM_COURSE,
			});
			return;
		}

		if (!classFromStudents.students) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_REMOVED_FROM_COURSE,
			});
			return;
		}

		/**
		 * Remove all classes with the same rank from the course.
		 * Set the rank of the course to null.
		 * Remove all students from the course.
		 */
		await CourseModel.findOneAndUpdate(
			{
				_id: courseId,
			},
			{
				$pullAll: {
					schoolClasses: allClassesWithSameRank.map(
						(classItem) => classItem._id,
					),
					students: classFromStudents.students.map(
						(studentItem) => studentItem._id,
					),
				},
				rank: null,
			},
		);

		/**
		 * Remove course from students.
		 */
		await StudentModel.updateMany(
			{
				_id: {
					$in: classFromStudents.students.map((studentItem) => studentItem._id),
				},
			},
			{
				$pull: {
					courses: courseId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: Message.CLASS_SUCCESSFULLY_REMOVED_FROM_COURSE,
		});
	} catch (err) {
		callback({
			isSuccess: false,
			message: ErrorMessage.CLASS_COULD_NOT_BE_REMOVED_FROM_COURSE,
		});
	}
};

export default removeClassFromCourse;
