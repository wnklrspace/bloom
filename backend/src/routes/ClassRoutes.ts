import router from 'express';
import { Response } from '../types/EventsMap';
import ClassController from '../controller/Class';

const route = router.Router();

/**
 * Fetches all classes from the database.
 */

route.route('/').get((req, res) => {
	ClassController.getAllClasses((response: Response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

/**
 * Creates a new class in the database.
 */

route.route('/').post((req, res) => {
	ClassController.createClass(
		{
			name: req.body.name,
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
 * Fetches a single class from the database.
 */

route.route('/:id').get((req, res) => {
	ClassController.getOneClass(
		{
			_id: req.params.id,
		},
		(response: Response) => {
			if (response.isSuccess) {
				res.status(200).send(response.res);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

/**
 * Adds a student to a class.
 */

route.route('/:id/addStudent').put((req, res) => {
	ClassController.addStudentToClass(
		{
			classId: req.params.id,
			studentId: req.body.studentId,
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
 * Removes a student from a class.
 */

route.route('/:id/removeStudent').put((req, res) => {
	ClassController.removeStudentFromClass(
		{
			classId: req.params.id,
			studentId: req.body.studentId,
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

route.route('/:id/addTeacher').put((req, res) => {
	ClassController.addClassTeacher(
		{
			classId: req.params.id,
			teacherId: req.body.teacherId,
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

route.route('/:id').put((req, res) => {});

export default route;
