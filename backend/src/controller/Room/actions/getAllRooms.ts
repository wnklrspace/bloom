import RoomModel from '../../../models/RoomModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

const getAllRooms = async (callback: Callback) => {
	await RoomModel.find()
		.then((res) => {
			if (!res) {
				callback({
					isSuccess: false,
					message: ErrorMessage.ROOMS_COULD_NOT_BE_FOUND,
				});
				return;
			}

			callback({
				isSuccess: true,
				message: Message.ROOMS_SUCCESSFULLY_FETCHED,
				res: res,
			});
		})
		.catch((err) => {
			console.log(err);
			callback({
				isSuccess: false,
				message: ErrorMessage.ROOMS_COULD_NOT_BE_FOUND,
			});
			return;
		});
};

export default getAllRooms;
