import ExaminationModel from '../../../models/ExaminationModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

const getAllExams = async (callback: Callback) => {
	try {
		const allExams = await ExaminationModel.find({});

		if (!allExams) {
			callback({
				isSuccess: false,
				message: ErrorMessage.EXAM_COULD_NOT_BE_FOUND,
			});
			return;
		}

		callback({
			isSuccess: true,
			message: Message.EXAM_SUCCESSFULLY_FETCHED,
			res: allExams,
		});
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.EXAM_COULD_NOT_BE_FOUND,
		});
	}
};

export default getAllExams;
