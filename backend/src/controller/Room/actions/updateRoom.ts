import RoomModel from '../../../models/RoomModel';
import { Callback, ErrorMessage } from '../../../types/EventsMap';
import { TIMESLOTS, WEEKDAYS } from '../../../types/enums';
import { DatabaseCourseProps } from '../../../types/interfaces/courseInterface';
import { DatabaseRoomProps } from '../../../types/interfaces/roomInterface';

/**
 *
 * @param params
 * @param timetable
 * @param day
 * @param timeslot
 * @param course
 * @param callback
 * @returns {Promise<void>}
 */
const updateRoom = async (
	params: {
		_id: DatabaseRoomProps['_id'];
		timetable: {
			day: WEEKDAYS;
			timeslot: TIMESLOTS;
			course: DatabaseCourseProps['_id'];
		};
	},
	callback: Callback,
) => {
	try {
		const {
			_id,
			timetable: { day, timeslot, course },
		} = params;

		const room = await RoomModel.findById(_id);

		if (!room) {
			callback({
				isSuccess: false,
				message: ErrorMessage.ROOM_COULD_NOT_BE_FOUND,
			});
			return;
		}
	} catch (err) {
		console.error(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.ROOM_COULD_NOT_BE_UPDATED,
		});
	}
};

export default updateRoom;
