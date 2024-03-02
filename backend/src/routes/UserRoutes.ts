import router from 'express';
import { UserController } from '../controller';
import { ClientUserProps } from '../types/interfaces/userInterface';

const route = router.Router();

route.route('/').get((req, res) => {});

route.route('/login').post((req, res) => {
	const { userName, password } = req.body;

	UserController.loginUser(
		{
			userName: userName,
			password: password,
		},
		(response: {
			isSuccess: boolean;
			message?: string;
			res?: ClientUserProps;
		}) => {
			if (response.isSuccess) {
				res.status(200).send(response.res);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/').post((req, res) => {
	UserController.createUser(
		{
			userName: req.body.userName,
			password: req.body.password,
			cName: req.body.cName,
			address: req.body.address,
			contact: req.body.contact,
			role: req.body.role,
		},
		(response: { isSuccess: boolean; res?: any; message?: string }) => {
			if (response.isSuccess) {
				res.status(200).send(response.res);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id').get((req, res) => {});

route.route('/:id').put((req, res) => {
	UserController.editUser(
		{
			userId: req.params.id,
		},
		req,
		(response: { isSuccess: boolean; res?: any; message?: string }) => {
			if (response.isSuccess) {
				res.status(200).send(response.res);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id/credentials').put((req, res) => {
	UserController.editCredentials(
		{
			userId: req.params.id,
		},
		req,
		(response: { isSuccess: boolean; res?: any; message?: string }) => {
			if (response.isSuccess) {
				res.status(200).send(response.res);
			} else {
				res.status(400).send(response.message);
			}
		},
	);
});

route.route('/:id').delete((req, res) => {});

export default route;

