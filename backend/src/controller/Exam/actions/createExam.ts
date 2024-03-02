import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { ExaminationProps } from '../../../types/interfaces/examinationInterface';
import ExaminationModel from '../../../models/ExaminationModel';
import CourseModel from '../../../models/CourseModel';

const createExam = async (
	params: {
		name: ExaminationProps['name'];
		weight: ExaminationProps['weight'];
		type: ExaminationProps['type'];
		courseId: ExaminationProps['courseId'];
	},
	callback: Callback,
) => {
	try {
		const { name, weight, type, courseId } = params;

		const potentialExam = await ExaminationModel.findOne({
			name,
			courseId,
		});

		if (potentialExam) {
			callback({
				isSuccess: false,
				message: ErrorMessage.EXAM_ALREADY_EXISTS,
			});
			return;
		}

		const exam = await ExaminationModel.create({
			name: name,
			weight: weight,
			type: type,
			courseId: courseId,
		}).catch((error) => {
			callback({
				isSuccess: false,
				message: ErrorMessage.EXAM_COULD_NOT_BE_CREATED,
			});
			console.log(error);
		});

		if (!exam) {
			callback({
				isSuccess: false,
				message: ErrorMessage.EXAM_COULD_NOT_BE_CREATED,
			});
			return;
		}

		await CourseModel.updateOne(
			{ _id: courseId },
			{ $push: { exams: exam._id } },
		).catch((error) => {
			callback({
				isSuccess: false,
				message: ErrorMessage.EXAM_COULD_NOT_BE_CREATED,
			});
		});

		callback({
			isSuccess: true,
			message: Message.EXAM_SUCCESSFULLY_CREATED,
		});
	} catch (error) {
		console.log(error);
		callback({
			isSuccess: false,
			message: ErrorMessage.EXAM_COULD_NOT_BE_CREATED,
		});
	}
};

export default createExam;
