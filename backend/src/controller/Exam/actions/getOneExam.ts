import ExaminationModel from '../../../models/ExaminationModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

const getOneExam = async (params: { examId: string }, callback: Callback) => {
	try {
		const { examId } = params;

		const exam = await ExaminationModel.findById(examId);

		if (!exam) {
			callback({
				isSuccess: false,
				message: ErrorMessage.EXAM_COULD_NOT_BE_FOUND,
			});
			return;
		}

		callback({
			isSuccess: true,
			message: Message.EXAM_SUCCESSFULLY_FETCHED,
			res: exam,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.EXAM_COULD_NOT_BE_FOUND,
		});
	}
};

export default getOneExam;
