import router from 'express';
import TeacherController from '../controller/Teacher';

const route = router.Router();

/**
 * Fetches all teacher from the database.
 */

route.route('/').get((req, res) => {
	TeacherController.getAllTeacher((response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

/**
 * Creates a new teacher in the database.
 */

route.route('/').post((req, res) => {
	const { cName, address, contact, role } = req.body;

	TeacherController.createTeacher(
		{
			cName,
			address,
			contact,
			role,
		},
		(response) => {
			if (response.isSuccess) {
				res.status(200).send(response.message);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id').get((req, res) => {
	TeacherController.getOneTeacher(
		{
			_id: req.params.id,
		},
		(response) => {
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
