import router from 'express';
import StudentController from '../controller/Student';
import { Response } from '../types/EventsMap';

const route = router.Router();

/**
 * Fetches all students from the database.
 */
route.route('/').get((req, res) => {
	StudentController.getAllStudents((response: Response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

/**
 * Creates a new student in the database.
 */
route.route('/').post((req, res) => {
	const { cName, address, contact, role, selectedClass } = req.body;

	StudentController.createStudent(
		{
			cName,
			address,
			contact,
			role,
			selectedClass,
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

route.route('/getStudentsByIds').post((req, res) => {
	StudentController.getStudentsById(
		{
			ids: req.body.ids,
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
 * Fetches a single student from the database.
 */
route.route('/:id').get((req, res) => {
	const { id } = req.params;

	StudentController.getOneStudent(
		{
			_id: id,
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

route.route('/:id').put((req, res) => {});

route.route('/:id').delete((req, res) => {});

export default route;
