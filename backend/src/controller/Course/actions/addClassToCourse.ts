import CourseModel from '../../../models/CourseModel';
import ClassModel from '../../../models/ClassModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import StudentModel from '../../../models/StudentModel';
import Student from '../../Student';

/**
 * Adds a student to a course.
 *
 * @param params
 * @param courseId
 * @param classId
 * @param callback
 */
const addClassToCourse = async (
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
		const courseAlreadyAssignedToClass = await CourseModel.findOne({
			_id: courseId,
			schoolClasses: {
				$in: [classId],
			},
		});

		if (courseAlreadyAssignedToClass) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_IS_ALREADY_ASSIGNED_TO_COURSE,
			});
			return;
		}

		/**
		 * Find all classes with the same rank as the class to be added.
		 */
		const classToBeAdded: any = await ClassModel.findOne({
			_id: classId,
		});
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
				$push: {
					schoolClasses: {
						$each: allClassesWithSameRank.map((classModel) => classModel._id),
					},
					students: {
						// @ts-ignore
						$each: allClassesWithSameRank
							.map((classModel) => classModel.students)
							.flat()
							.map((student) => {
								return student._id;
							}),
					},
				},
				$set: {
					rank: classToBeAdded.rank,
				},
			},
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
				$push: {
					courses: courseId,
				},
			},
		).catch((err) => {
			console.log(err);
		});

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

export default addClassToCourse;
