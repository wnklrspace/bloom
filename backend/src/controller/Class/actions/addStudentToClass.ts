import ClassModel from '../../../models/ClassModel';
import CourseModel from '../../../models/CourseModel';
import StudentModel from '../../../models/StudentModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { DatabaseStudentProps } from '../../../types/interfaces/studentInterface';

/**
 * Adds a student to a class.
 *
 * @param params
 * @param classId
 * @param studentId
 * @param callback
 */

const addStudentToClass = async (
	params: {
		classId: string;
		studentId: DatabaseStudentProps['userId'];
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
		const studentIsAlreadyInClass = await ClassModel.findOne({
			_id: classId,
			students: studentId,
		});

		if (studentIsAlreadyInClass) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_ALREADY_IN_CLASS,
			});
			return;
		}

		/**
		 * Check if student is already assigned to a class.
		 */

		const studentIsAlreadyAssignedToClass = await StudentModel.findOne({
			userId: studentId,
			class: { $ne: null },
		});

		if (studentIsAlreadyAssignedToClass) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_IS_ALREADY_ASSIGNED_TO_CLASS,
			});
			return;
		}

		/**
		 * Find all mandatory courses for the class.
		 * For each course, add the student to the course.
		 */

		const classObject = await ClassModel.findOne({ _id: classId });

		if (!classObject) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
			});
			return;
		}

		const mandatoryCourses = await CourseModel.find({
			schoolClasses: classObject._id,
			mandatory: true,
		});

		/**
		 * Update the class object with the new student.
		 * Update the student object with the new class.
		 * Update each mandatory course with the a student.
		 */
		await ClassModel.updateOne(
			{ _id: classId },
			{ $push: { students: studentId } },
		);

		await StudentModel.updateOne(
			{ userId: studentId },
			{
				$set: {
					class: classId,
					courses: mandatoryCourses.map((course) => course._id),
				},
			},
		);

		await CourseModel.updateMany(
			{ _id: { $in: mandatoryCourses.map((course) => course._id) } },
			{ $push: { students: studentId } },
		);

		callback({
			isSuccess: true,
			message: Message.STUDENT_SUCCESSFULLY_ADDED_TO_CLASS,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.STUDENT_COULD_NOT_BE_ADDED_TO_CLASS,
		});
	}
};

export default addStudentToClass;
