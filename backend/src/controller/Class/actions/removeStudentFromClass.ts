import ClassModel from '../../../models/ClassModel';
import StudentModel from '../../../models/StudentModel';
import CourseModel from '../../../models/CourseModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Adds a student to a class.
 *
 * @param classId
 * @param studentId
 * @param callback
 */

const removeStudentFromClass = async (
	params: {
		classId: string;
		studentId: string;
	},
	callback: Callback,
) => {
	try {
		const classId = params.classId;
		const studentId = params.studentId;

		/**
		 * Check if class exists.
		 * If it does, check if student is already in the class.
		 */
		const studentIsInClass = await ClassModel.findOne({
			_id: classId,
			students: studentId,
		});

		if (!studentIsInClass) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_IS_NOT_IN_CLASS,
			});
			return;
		}

		/**
		 * Check if student is still assigned to the class.
		 */

		const studentIsAssignedToClass = await StudentModel.findOne({
			userId: studentId,
			class: classId,
		});

		if (!studentIsAssignedToClass) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_IS_NOT_IN_CLASS,
			});
			return;
		}

		/**
		 * Update the class object and remove the student from the class.
		 * Update the student object and set the class to null.
		 */

		await StudentModel.updateOne(
			{
				userId: studentId,
			},
			{
				class: null,
			},
		);

		await ClassModel.updateOne(
			{
				_id: classId,
			},
			{
				$pull: {
					students: studentId,
				},
			},
		);

		/**
		 * Remove student from courses since courses are bound to classes.
		 */

		const allClassesWithSameRanks = await ClassModel.find({
			rank: studentIsInClass.rank,
		});

		await StudentModel.updateOne(
			{
				userId: studentId,
			},
			{
				courses: allClassesWithSameRanks.map((classObject) => classObject._id),
			},
		);

		allClassesWithSameRanks.forEach(async (classObject) => {
			try {
				await CourseModel.updateOne(
					{
						schoolClasses: classObject._id,
						students: studentId,
					},
					{
						$pull: {
							students: studentId,
						},
					},
				);
			} catch (error) {
				callback({
					isSuccess: false,
					message: ErrorMessage.STUDENT_COULD_NOT_BE_REMOVED_FROM_CLASS,
				});
				console.log(error);
				return;
			}
		});

		callback({
			isSuccess: true,
			message: Message.STUDENT_SUCCESSFULLY_REMOVED_FROM_CLASS,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_REMOVED_FROM_CLASS,
		});
	}
};

export default removeStudentFromClass;
