import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { TIMESLOTS, WEEKDAYS } from '../types/enums';

const RoomModel = new Schema({
	name: {
		type: String,
		required: true,
	},
	timetable: {
		[WEEKDAYS.MONDAY]: {
			one: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.ONE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			two: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.TWO,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			three: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.THREE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			four: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FOUR,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			five: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FIVE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			six: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.SIX,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
		},
		[WEEKDAYS.TUESDAY]: {
			one: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.ONE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			two: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.TWO,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			three: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.THREE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			four: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FOUR,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			five: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FIVE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			six: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.SIX,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
		},
		[WEEKDAYS.WEDNESDAY]: {
			one: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.ONE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			two: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.TWO,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			three: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.THREE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			four: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FOUR,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			five: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FIVE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			six: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.SIX,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
		},
		[WEEKDAYS.THURSDAY]: {
			one: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.ONE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			two: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.TWO,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			three: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.THREE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			four: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FOUR,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			five: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FIVE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			six: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.SIX,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
		},
		[WEEKDAYS.FRIDAY]: {
			one: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.ONE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			two: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.TWO,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			three: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.THREE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			four: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FOUR,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			five: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.FIVE,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
			six: {
				timeslot: {
					type: String,
					enum: TIMESLOTS.SIX,
					required: true,
				},
				course: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					default: null,
				},
			},
		},
	},
});

export default mongoose.model('Room', RoomModel);
