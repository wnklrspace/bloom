import ClassModel from '../../../models/ClassModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Gets all classes.
 *
 * @param callback
 */

const getAllClasses = async (callback: Callback) => {
	await ClassModel.find()
		.then((res) => {
			if (!res) {
				callback({
					isSuccess: false,
					message: ErrorMessage.CLASSES_COULD_NOT_BE_RETURNED,
				});
				return;
			}

			const sortedList = res
				.sort((a: any, b: any) => {
					return a.name.localeCompare(b.name);
				})
				.sort((a: any, b: any) => {
					return a.rank - b.rank;
				});

			callback({
				isSuccess: true,
				message: Message.CLASS_SUCCESSFULLY_CREATED,
				res: sortedList,
			});
		})
		.catch((err) => {
			console.log(err);
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASSES_COULD_NOT_BE_RETURNED,
			});
			return;
		});
};

export default getAllClasses;
