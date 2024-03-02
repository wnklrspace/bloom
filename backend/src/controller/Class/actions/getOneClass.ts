import ClassModel from '../../../models/ClassModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns a class.
 *
 *
 * @param _id - The _id of one class.
 * @returns A class object for the client.
 *
 * @beta
 */

const getOneClass = async (
	params: {
		_id: string;
	},
	callback: Callback,
) => {
	ClassModel.findOne({
		_id: params._id,
	})
		.then((course) => {
			if (!course) {
				callback({
					isSuccess: false,
					message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
				});
				return;
			}

			callback({
				isSuccess: true,
				message: Message.CLASS_SUCCESSFULLY_FETCHED,
				res: course,
			});
		})
		.catch((err) => {
			console.log(err);
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
			});
		});
};

export default getOneClass;
