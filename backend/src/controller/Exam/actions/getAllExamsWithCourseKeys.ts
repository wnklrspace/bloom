import CourseModel from '../../../models/CourseModel';
import ExaminationModel from '../../../models/ExaminationModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { ExaminationProps } from '../../../types/interfaces/examinationInterface';

const getAllExamsWithCourseKeys = async (callback: Callback) => {
	try {
		const courses = await CourseModel.find();
		const ranks = courses.map((course: any) => course.rank);

		const ranksWithCorrespondingCourses = ranks
			.sort((a, b) => a - b)
			.map((rank: number) => {
				return {
					rank: rank,
					courses: courses.filter((course: any) => course.rank === rank),
				};
			});

		// I want to create a function that returns an array in the shape like this:
		// [{rank, courses: [{name, exams: [{name, weight, type}]}]}]
		interface GroupedRanks {
			[rank: number]: {
				rank: number;
				courses: any[]; // Adjust the type of courses accordingly
			};
		}

		async function createListOfExams() {
			const groupedRanks: GroupedRanks = {};

			// Grouping ranks
			for (const o of ranksWithCorrespondingCourses) {
				if (!groupedRanks[o.rank]) {
					groupedRanks[o.rank] = {
						rank: o.rank,
						courses: [],
					};
				}

				const courses = await Promise.all(
					o.courses.map(async (course: any) => {
						if (!course.exams || course.exams.length === 0)
							return { name: course.name, exams: [] };
						const exams = await Promise.all(
							course.exams.map(async (exam: ExaminationProps) => {
								if (!exam) return null;

								try {
									const fetchedExam = await ExaminationModel.findById(exam);
									return fetchedExam;
								} catch (error) {
									console.error('Error fetching exam:', error);
									return null; // Handle error case
								}
							}),
						);
						return {
							name: course.name,
							exams: exams.filter((exam) => exam !== null), // Filter out null values
						};
					}),
				);

				// Add courses to the corresponding rank, avoiding duplicates
				courses.forEach((course) => {
					const existingCourseIndex = groupedRanks[o.rank].courses.findIndex(
						(c) => c.name === course.name,
					);
					if (existingCourseIndex === -1) {
						groupedRanks[o.rank].courses.push(course);
					}
				});
			}

			// Convert the grouped ranks object into an array
			const listOfExams = Object.values(groupedRanks);
			return listOfExams;
		}

		const List = await createListOfExams();

		callback({
			isSuccess: true,
			message: Message.EXAM_SUCCESSFULLY_FETCHED,
			res: List,
		});
	} catch (err) {
		console.log(err);
		callback({
			isSuccess: false,
			message: ErrorMessage.EXAM_COULD_NOT_BE_FOUND,
		});
	}
};

export default getAllExamsWithCourseKeys;
