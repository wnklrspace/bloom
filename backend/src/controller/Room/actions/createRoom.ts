import RoomModel from '../../../models/RoomModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { TIMESLOTS, WEEKDAYS } from '../../../types/enums';
import { RoomProps } from '../../../types/interfaces/roomInterface';

/**
 *
 * @param name
 * @returns {Promise<void>}
 */
const createRoom = async (
	params: {
		name: RoomProps['name'];
	},
	callback: Callback,
) => {
	try {
		const { name } = params;
		const room = await RoomModel.findOne({ name });

		if (room !== undefined && room !== null) {
			callback({
				isSuccess: false,
				message: ErrorMessage.ROOM_WITH_NAME_ALREADY_EXISTS,
			});

			return;
		}

		await RoomModel.create({
			name,
			timetable: {
				[WEEKDAYS.MONDAY]: {
					one: {
						timeslot: TIMESLOTS.ONE,
						course: null,
					},
					two: {
						timeslot: TIMESLOTS.TWO,
						course: null,
					},
					three: {
						timeslot: TIMESLOTS.THREE,
						course: null,
					},
					four: {
						timeslot: TIMESLOTS.FOUR,
						course: null,
					},
					five: {
						timeslot: TIMESLOTS.FIVE,
						course: null,
					},
					six: {
						timeslot: TIMESLOTS.SIX,
						course: null,
					},
				},
				[WEEKDAYS.TUESDAY]: {
					one: {
						timeslot: TIMESLOTS.ONE,
						course: null,
					},
					two: {
						timeslot: TIMESLOTS.TWO,
						course: null,
					},
					three: {
						timeslot: TIMESLOTS.THREE,
						course: null,
					},
					four: {
						timeslot: TIMESLOTS.FOUR,
						course: null,
					},
					five: {
						timeslot: TIMESLOTS.FIVE,
						course: null,
					},
					six: {
						timeslot: TIMESLOTS.SIX,
						course: null,
					},
				},
				[WEEKDAYS.WEDNESDAY]: {
					one: {
						timeslot: TIMESLOTS.ONE,
						course: null,
					},
					two: {
						timeslot: TIMESLOTS.TWO,
						course: null,
					},
					three: {
						timeslot: TIMESLOTS.THREE,
						course: null,
					},
					four: {
						timeslot: TIMESLOTS.FOUR,
						course: null,
					},
					five: {
						timeslot: TIMESLOTS.FIVE,
						course: null,
					},
					six: {
						timeslot: TIMESLOTS.SIX,
						course: null,
					},
				},
				[WEEKDAYS.THURSDAY]: {
					one: {
						timeslot: TIMESLOTS.ONE,
						course: null,
					},
					two: {
						timeslot: TIMESLOTS.TWO,
						course: null,
					},
					three: {
						timeslot: TIMESLOTS.THREE,
						course: null,
					},
					four: {
						timeslot: TIMESLOTS.FOUR,
						course: null,
					},
					five: {
						timeslot: TIMESLOTS.FIVE,
						course: null,
					},
					six: {
						timeslot: TIMESLOTS.SIX,
						course: null,
					},
				},
				[WEEKDAYS.FRIDAY]: {
					one: {
						timeslot: TIMESLOTS.ONE,
						course: null,
					},
					two: {
						timeslot: TIMESLOTS.TWO,
						course: null,
					},
					three: {
						timeslot: TIMESLOTS.THREE,
						course: null,
					},
					four: {
						timeslot: TIMESLOTS.FOUR,
						course: null,
					},
					five: {
						timeslot: TIMESLOTS.FIVE,
						course: null,
					},
					six: {
						timeslot: TIMESLOTS.SIX,
						course: null,
					},
				},
			},
		});

		callback({
			isSuccess: true,
			message: Message.ROOM_SUCCESSFULLY_CREATED,
		});
	} catch (err) {
		console.error(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.ROOM_COULD_NOT_BE_CREATED,
		});
	}
};

export default createRoom;
