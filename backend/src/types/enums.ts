enum ROLES {
	ADMIN = 'admin',
	TEACHER = 'teacher',
	STUDENT = 'student',
}

enum RANKS {
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
	NINE = 9,
	TEN = 10,
	ELEVEN = 11,
	TWELVE = 12,
}

enum GRADES {
	ONE = 1,
	ONE_THREE = 1.3,
	ONE_SEVEN = 1.7,
	TWO = 2,
	TWO_THREE = 2.3,
	TWO_SEVEN = 2.7,
	THREE = 3,
	THREE_THREE = 3.3,
	THREE_SEVEN = 3.7,
	FOUR = 4,
	FOUR_THREE = 4.3,
	FOUR_SEVEN = 4.7,
	FIVE = 5,
	FIVE_THREE = 5.3,
	FIVE_SEVEN = 5.7,
	SIX = 6,
}

type RankEnums = {
	[key: string]: RANKS;
};

enum STATUS {
	SUCCESS = 'success',
	ERROR = 'error',
}

type StatusEnums = {
	[key: string]: STATUS;
};

enum EXAMINATION_TYPES {
	EXCERCISE = 'excercise',
	PRESENTATION = 'presentation',
	EXAM = 'exam',
	PROJECT = 'project',
}

enum TIMESLOTS {
	ONE = '08:15 - 09:45',
	TWO = '10:00 - 11:30',
	THREE = '11:45 - 13:15',
	FOUR = '14:15 - 15:45',
	FIVE = '16:00 - 17:30',
	SIX = '17:45 - 19:15',
}

enum WEEKDAYS {
	MONDAY = 'monday',
	TUESDAY = 'tuesday',
	WEDNESDAY = 'wednesday',
	THURSDAY = 'thursday',
	FRIDAY = 'friday',
}

export { RANKS, STATUS, EXAMINATION_TYPES, GRADES, ROLES, TIMESLOTS, WEEKDAYS };
export type { RankEnums, StatusEnums };
