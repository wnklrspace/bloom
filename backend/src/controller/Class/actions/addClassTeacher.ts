import ClassModel from '../../../models/ClassModel';
import { Callback, ErrorMessage } from '../../../types/EventsMap';
import UserModel from '../../../models/UserModel';

const addTeacherToClass = async (
	params: {
		classId: string;
		teacherId: string;
	},
	callback: Callback,
) => {
	try {
		const classId = params.classId;
		const teacherId = params.teacherId;

		const teacher = await UserModel.findOne({
			_id: teacherId,
		});

		if (!teacher) {
			callback({
				isSuccess: false,
				message: ErrorMessage.TEACHER_DOES_NOT_EXIST,
			});
			return;
		}

		const classExists = await ClassModel.findOne({
			_id: classId,
		});

		if (!classExists) {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
			});
			return;
		}

		await ClassModel.updateOne(
			{
				_id: classId,
			},
			{
				$set: {
					classTeacher: teacherId,
				},
			},
		);

		callback({
			isSuccess: true,
			message: ErrorMessage.TEACHER_SUCCESSFULLY_ADDED_TO_CLASS,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.TEACHER_COULD_NOT_BE_ADDED_TO_CLASS,
		});
	}
};

export default addTeacherToClass;
