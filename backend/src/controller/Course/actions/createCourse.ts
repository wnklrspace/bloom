import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { CourseProps } from '../../../types/interfaces';
import { DatabaseStudentProps } from '../../../types/interfaces/studentInterface';
import { RANKS } from '../../../types/enums';
import { DatabaseClassProps } from '../../../types/interfaces/classInterface';
import CourseModel from '../../../models/CourseModel';
import ClassModel from '../../../models/ClassModel';
import StudentModel from '../../../models/StudentModel';
import helper from '../../../utils/helper';
import RoomModel from '../../../models/RoomModel';

/**
 * Creates a new course in the database.
 * @param name - Name of the course
 * @param mandatory - Is the course mandatory?
 * @param room - Room of the course
 * @param time - Time of the course
 * 		@param weekday - Weekday of the course
 * 		@param timeslot - Timeslot of the course
 * @param courseTeacher - Teacher of the course
 * @param rank - Rank of all school classes that should be added
 * @param callback - Callback function
 * @returns {Promise<void>}
 */
const createCourse = async (
	params: {
		name: CourseProps['name'];
		mandatory: CourseProps['mandatory'];
		room: CourseProps['room'];
		time: CourseProps['time'];
		courseTeacher: CourseProps['courseTeacher'];
		schoolClass: CourseProps['schoolClasses'][0];
		rank: RANKS;
	},
	callback: Callback,
) => {
	try {
		const {
			name,
			mandatory,
			room,
			time: { weekday, timeslot },
			courseTeacher,
			schoolClass,
			rank,
		} = params;

		const shortName = name.charAt(0).toUpperCase() + name.charAt(1);
		const studentsToUpdate: DatabaseStudentProps['_id'][] = [];
		const schoolClasses: DatabaseClassProps['_id'][] = [];
		const selectedSchoolClass = await ClassModel.findById(schoolClass);
		const fetchedRank = selectedSchoolClass?.rank;

		if (schoolClass) {
			schoolClasses.push(schoolClass);
		}

		if (rank) {
			const classes = await ClassModel.find({ rank: rank });
			classes.map((schoolClass) => {
				schoolClasses.push(schoolClass._id);
			});
		}

		const potentialCourse = await CourseModel.findOne({
			name,
			schoolClasses: schoolClasses,
		});

		if (potentialCourse) {
			callback({
				isSuccess: false,
				message: ErrorMessage.COURSE_ALREADY_EXISTS,
			});
			return;
		}

		if (mandatory) {
			schoolClasses.map(async (schoolClass) => {
				const classX = await ClassModel.findById(schoolClass);
				if (!classX) {
					callback({
						isSuccess: false,
						message: ErrorMessage.CLASS_COULD_NOT_BE_FOUND,
					});
					return;
				}
				studentsToUpdate.push(...classX.students);
			});
		}

		const course: any = await CourseModel.create({
			name: name,
			shortName: shortName,
			mandatory: mandatory,
			courseTeacher: courseTeacher ? courseTeacher : null,
			room: room ? room : null,
			students: studentsToUpdate,
			time: {
				weekday: weekday,
				timeslot: timeslot,
			},
			rank: rank ? rank : fetchedRank,
			schoolClasses: schoolClasses,
		}).catch((error) => {
			console.log(error);
			callback({
				isSuccess: false,
				message: ErrorMessage.COURSE_COULD_NOT_BE_CREATED,
			});
		});

		if (mandatory && studentsToUpdate.length > 0) {
			await StudentModel.updateMany(
				{ userId: { $in: studentsToUpdate } },
				{ $push: { courses: course._id } },
			);
		}

		/**
		 * Update Room with the new course and it's timeslot
		 */
		if (room) {
			await RoomModel.findOneAndUpdate(
				{
					_id: room,
				},
				{
					$set: {
						[`timetable.${weekday}.${helper.findTimeSlotKey(timeslot)}.course`]:
							course._id,
					},
				},
				{ new: true },
			).catch((error) => {
				console.error('ERROR = ', error);

				return callback({
					isSuccess: false,
					message: ErrorMessage.ROOM_COULD_NOT_BE_UPDATED,
				});
			});
		}

		callback({
			isSuccess: true,
			message: Message.COURSE_SUCCESSFULLY_CREATED,
		});
	} catch (error) {
		callback({
			isSuccess: false,
			message: ErrorMessage.COURSE_COULD_NOT_BE_CREATED,
		});
	}
};

export default createCourse;
