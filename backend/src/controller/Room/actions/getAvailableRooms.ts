import RoomModel from '../../../models/RoomModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { TIMESLOTS, WEEKDAYS } from '../../../types/enums';
import helper from '../../../utils/helper';

const getAvailableRooms = async (
	params: {
		day: WEEKDAYS;
		time: TIMESLOTS;
	},
	callback: Callback,
) => {
	const { day, time } = params;

	if (!day || !time) {
		callback({
			isSuccess: false,
			message: ErrorMessage.DAY_OR_TIME_NOT_PROVIDED,
		});
		return;
	}

	/**
	 * Find all rooms that are available at the given time.
	 * Meaning that the room is not already assigned to a course at the given time.
	 */
	const rooms = await RoomModel.find({
		[`timetable.${day}.${helper.findTimeSlotKey(time)}.course`]: null,
	});

	if (!rooms) {
		callback({
			isSuccess: false,
			message: ErrorMessage.ROOMS_COULD_NOT_BE_FETCHED,
		});
		return;
	}

	callback({
		isSuccess: true,
		message: Message.ROOMS_SUCCESSFULLY_FETCHED,
		res: rooms,
	});
};

export default getAvailableRooms;
