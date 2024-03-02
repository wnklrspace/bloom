import CourseModel from '../../../models/CourseModel';
import ClassModel from '../../../models/ClassModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import StudentModel from '../../../models/StudentModel';
import { DatabaseClassProps } from '../../../types/interfaces/classInterface';

/**
 * Adds a student to a course.
 *
 * @param params
 * @param courseId
 * @param classId
 * @param callback
 */
const addOneClassToCourse = async (
	params: {
		courseId: any;
		classId: any;
	},
	callback: Callback,
) => {
	try {
		const { courseId, classId } = params;

		/**
		 * Check if course is already assinged to class.
		 */
		const course = await CourseModel.findOne({
			_id: courseId,
		});
		const students = await StudentModel.find({
			class: classId,
		});

		if (!course) {
			callback({
				isSuccess: false,
				message: ErrorMessage.COURSE_DOES_NOT_EXIST,
			});
			return;
		}

		if (!students) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
			});
			return;
		}

		/**
		 * Find all classes with the same rank as the class to be added.
		 */
		const classToBeAdded: DatabaseClassProps | null = await ClassModel.findOne({
			_id: classId,
		});

		if (!classToBeAdded) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
			});
			return;
		}

		const allClassesWithSameRank = await ClassModel.find({
			rank: classToBeAdded.rank,
		});

		/**
		 * Add all classes with the same rank to the course.
		 * Update the rank of the course.
		 */
		await CourseModel.findOneAndUpdate(
			{
				_id: courseId,
			},
			{
				$pull: {
					schoolClasses: { $in: course.schoolClasses },
					students: { $in: course.students },
				},
			},
		);

		await CourseModel.findOneAndUpdate(
			{
				_id: courseId,
			},
			{
				$addToSet: {
					schoolClasses: classId,
					students: {
						$each: classToBeAdded.students.map((student) => student._id),
					},
				},
				$set: {
					rank: classToBeAdded.rank,
				},
			},
			{ new: true }, // Return the modified document
		);

		/**
		 * Assign course to all students in the class.
		 * Add course to all students in the class.
		 */
		await StudentModel.updateMany(
			{
				class: {
					$in: allClassesWithSameRank.map((classModel) => classModel._id),
				},
			},
			{
				$pull: {
					courses: courseId,
				},
			},
		);

		await StudentModel.updateMany(
			{
				class: classId,
			},
			{
				$push: {
					courses: courseId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: Message.CLASS_SUCCESSFULLY_ADDED_TO_COURSE,
		});
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.CLASS_COULD_NOT_BE_ADDED_TO_COURSE,
		});
	}
};

export default addOneClassToCourse;
