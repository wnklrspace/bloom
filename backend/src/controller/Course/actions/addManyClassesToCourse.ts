import ClassModel from '../../../models/ClassModel';
import CourseModel from '../../../models/CourseModel';
import StudentModel from '../../../models/StudentModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { ClassProps } from '../../../types/interfaces';
import { DatabaseClassProps } from '../../../types/interfaces/classInterface';
import { DatabaseCourseProps } from '../../../types/interfaces/courseInterface';

const addManyClassesToCourse = async (
	params: {
		courseId: DatabaseCourseProps['_id'];
		classes: DatabaseCourseProps['schoolClasses'];
	},
	callback: Callback,
) => {
	try {
		const { courseId, classes } = params;

		/**
		 * Check if course is already assinged to class.
		 */
		const course = await CourseModel.findOne({
			_id: courseId,
		});

		if (!course) {
			callback({
				isSuccess: false,
				message: ErrorMessage.COURSE_COULD_NOT_BE_FOUND,
			});
			return;
		}

		const databaseClasses = await ClassModel.find({
			_id: classes[0],
		});

		if (!databaseClasses) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
			});
			return;
		}

		const classesWithTheSameRank = await ClassModel.find({
			rank: databaseClasses[0].rank,
		});

		const students = await StudentModel.find({
			class: { $in: classesWithTheSameRank.map((c) => c._id) },
		});

		if (!students) {
			callback({
				isSuccess: false,
				message: ErrorMessage.STUDENT_COULD_NOT_BE_FOUND,
			});
			return;
		}

		await CourseModel.updateOne(
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

		await CourseModel.updateOne(
			{
				_id: courseId,
			},
			{
				$addToSet: {
					schoolClasses: {
						$each: classesWithTheSameRank.map((classModel) => classModel._id),
					},
					students: {
						$each: students.map((student) => student._id),
					},
				},
				$set: {
					rank: databaseClasses[0].rank,
				},
			},
			{
				new: true,
			},
		);

		await StudentModel.updateMany(
			{
				class: {
					$in: classesWithTheSameRank.map((classModel) => classModel._id),
				},
			},
			{
				$addToSet: {
					courses: courseId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: Message.COURSE_SUCCESSFULLY_UPDATED,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_COULD_NOT_BE_UPDATED,
		});
	}
};

export default addManyClassesToCourse;
