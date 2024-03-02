import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { ClassProps } from '../../../types/interfaces';
import ClassModel from '../../../models/ClassModel';

/**
 * Creates a new class.
 *
 * @param params
 * @param name
 * @param rank
 * @param callback
 */

const createClass = async (
	params: {
		name: ClassProps['name'];
		rank: ClassProps['rank'];
	},
	callback: Callback,
) => {
	try {
		const { name, rank } = params;
		const generatedName = rank.toString() + name;

		// Check if class already exists
		const alreadyExists = await ClassModel.findOne({ name: generatedName });

		if (!alreadyExists) {
			const newClass = {
				name: generatedName,
				rank,
				classTeacher: null,
				students: [],
				announcements: [],
			};

			await ClassModel.create(newClass);
			callback({
				isSuccess: true,
				message: Message.CLASS_SUCCESSFULLY_CREATED,
			});
		} else {
			callback({
				isSuccess: false,
				message: ErrorMessage.CLASS_ALREADY_EXISTS,
			});
		}
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.CLASS_COULD_NOT_BE_CREATED,
		});
	}
};

export default createClass;
