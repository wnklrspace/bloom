import { Types } from 'mongoose';
import { TIMESLOTS, WEEKDAYS } from '../enums';

interface RoomProps {
	name: string;
	timetable: {
		[WEEKDAYS.MONDAY]: {
			one: {
				timeslot: TIMESLOTS.ONE;
				course: Types.ObjectId;
			};
			two: {
				timeslot: TIMESLOTS.TWO;
				course: Types.ObjectId;
			};
			three: {
				timeslot: TIMESLOTS.THREE;
				course: Types.ObjectId;
			};
			four: {
				timeslot: TIMESLOTS.FOUR;
				course: Types.ObjectId;
			};
			five: {
				timeslot: TIMESLOTS.FIVE;
				course: Types.ObjectId;
			};
			six: {
				timeslot: TIMESLOTS.SIX;
				course: Types.ObjectId;
			};
		};
		[WEEKDAYS.TUESDAY]: {
			one: {
				timeslot: TIMESLOTS.ONE;
				course: Types.ObjectId;
			};
			two: {
				timeslot: TIMESLOTS.TWO;
				course: Types.ObjectId;
			};
			three: {
				timeslot: TIMESLOTS.THREE;
				course: Types.ObjectId;
			};
			four: {
				timeslot: TIMESLOTS.FOUR;
				course: Types.ObjectId;
			};
			five: {
				timeslot: TIMESLOTS.FIVE;
				course: Types.ObjectId;
			};
			six: {
				timeslot: TIMESLOTS.SIX;
				course: Types.ObjectId;
			};
		};
		[WEEKDAYS.WEDNESDAY]: {
			one: {
				timeslot: TIMESLOTS.ONE;
				course: Types.ObjectId;
			};
			two: {
				timeslot: TIMESLOTS.TWO;
				course: Types.ObjectId;
			};
			three: {
				timeslot: TIMESLOTS.THREE;
				course: Types.ObjectId;
			};
			four: {
				timeslot: TIMESLOTS.FOUR;
				course: Types.ObjectId;
			};
			five: {
				timeslot: TIMESLOTS.FIVE;
				course: Types.ObjectId;
			};
			six: {
				timeslot: TIMESLOTS.SIX;
				course: Types.ObjectId;
			};
		};
		[WEEKDAYS.THURSDAY]: {
			one: {
				timeslot: TIMESLOTS.ONE;
				course: Types.ObjectId;
			};
			two: {
				timeslot: TIMESLOTS.TWO;
				course: Types.ObjectId;
			};
			three: {
				timeslot: TIMESLOTS.THREE;
				course: Types.ObjectId;
			};
			four: {
				timeslot: TIMESLOTS.FOUR;
				course: Types.ObjectId;
			};
			five: {
				timeslot: TIMESLOTS.FIVE;
				course: Types.ObjectId;
			};
			six: {
				timeslot: TIMESLOTS.SIX;
				course: Types.ObjectId;
			};
		};
		[WEEKDAYS.FRIDAY]: {
			one: {
				timeslot: TIMESLOTS.ONE;
				course: Types.ObjectId;
			};
			two: {
				timeslot: TIMESLOTS.TWO;
				course: Types.ObjectId;
			};
			three: {
				timeslot: TIMESLOTS.THREE;
				course: Types.ObjectId;
			};
			four: {
				timeslot: TIMESLOTS.FOUR;
				course: Types.ObjectId;
			};
			five: {
				timeslot: TIMESLOTS.FIVE;
				course: Types.ObjectId;
			};
			six: {
				timeslot: TIMESLOTS.SIX;
				course: Types.ObjectId;
			};
		};
	};
}

interface DatabaseRoomProps extends RoomProps {
	_id: Types.ObjectId;
}

export type { RoomProps, DatabaseRoomProps };
