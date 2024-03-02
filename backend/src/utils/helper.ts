import { TIMESLOTS } from '../types/enums';

function findTimeSlotKey(timeslot: string | undefined) {
	if (!timeslot) {
		return null;
	}

	switch (timeslot) {
		case TIMESLOTS.ONE:
			return 'one';
		case TIMESLOTS.TWO:
			return 'two';
		case TIMESLOTS.THREE:
			return 'three';
		case TIMESLOTS.FOUR:
			return 'four';
		case TIMESLOTS.FIVE:
			return 'five';
		case TIMESLOTS.SIX:
			return 'six';
		default:
			return null;
	}
}

export default {
	findTimeSlotKey,
};
