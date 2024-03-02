import RoomModel from '../../../models/RoomModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';

/**
 * Returns a room.
 *
 *
 * @param _id - The first input _id
 * @returns A room object for the client.
 */

const getOneRoom = async (
	params: {
		_id: string;
	},
	callback: Callback,
) => {
	await RoomModel.findOne({
		_id: params._id,
	})
		.then((room) => {
			callback({
				isSuccess: true,
				message: Message.ROOM_SUCCESSFULLY_FETCHED,
				res: room!,
			});
		})
		.catch((err) => {
			console.log(err);
			callback({
				isSuccess: false,
				message: ErrorMessage.ROOM_COULD_NOT_BE_FOUND,
			});
			return;
		});
};

export default getOneRoom;
