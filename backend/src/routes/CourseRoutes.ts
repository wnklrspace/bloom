import router from 'express';
import CourseController from '../controller/Course';
import { Response } from '../types/EventsMap';

const route = router.Router();

/**
 * Fetches all courses from the database.
 */

route.route('/').get((req, res) => {
	CourseController.getAllCourses((response: Response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

/**
 * Creates a new course in the database.
 */

route.route('/').post((req, res) => {
	CourseController.createCourse(
		{
			name: req.body.name,
			mandatory: req.body.mandatory,
			room: req.body.room,
			time: {
				weekday: req.body.time.weekday,
				timeslot: req.body.time.timeslot,
			},
			courseTeacher: req.body.courseTeacher,
			schoolClass: req.body.class,
			rank: req.body.rank,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

/**
 * Fetches a single course from the database.
 */

route.route('/:id').get((req, res) => {
	CourseController.getOneCourse(
		{
			_id: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.res);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

/**
 * Edits a single course in the database.
 */

route.route('/:id').put((req, res) => {
	CourseController.editCourse(
		{
			courseId: req.params.id,
			name: req.body.name,
			mandatory: req.body.mandatory,
			room: req.body.room,
			time: req.body.time,
			courseTeacher: req.body.courseTeacher,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/addStudent').put((req, res) => {
	CourseController.addStudentToCourse(
		{
			studentId: req.body.studentId,
			classId: req.body.classId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/removeStudent').put((req, res) => {
	CourseController.removeStudentFromCourse(
		{
			studentId: req.body.studentId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				console.log(response.message);
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/addTeacher').put((req, res) => {
	CourseController.addTeacherToCourse(
		{
			teacherId: req.body.teacherId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/removeTeacher').put((req, res) => {
	CourseController.removeTeacherFromCourse(
		{
			teacherId: req.body.teacherId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/addClass').put((req, res) => {
	CourseController.addClassToCourse(
		{
			classId: req.body.classId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/addOneClass').put((req, res) => {
	CourseController.addOneClassToCourse(
		{
			classId: req.body.classId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/addManyClasses').put((req, res) => {
	CourseController.addManyClassesToCourse(
		{
			courseId: req.params.id,
			classes: req.body.classes,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/removeClass').put((req, res) => {
	CourseController.removeClassFromCourse(
		{
			classId: req.body.classId,
			courseId: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				console.log(response.message);
				res.status(400).send(response.message);
			}
		},
	);
});

export default route;
