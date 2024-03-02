import RoomController from '../controller/Room';
import router from 'express';

const route = router.Router();

/**
 * Fetches all rooms from the database.
 */
route.route('/').get((req, res) => {
	RoomController.getAllRooms((response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

/**
 * Fetches a single room from the database.
 */

route.route('/:id').get((req, res) => {
	RoomController.getOneRoom(
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

/**
 * Creates a new room in the database.
 */
route.route('/').post((req, res) => {
	const { name } = req.body;

	RoomController.createRoom(
		{
			name,
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

/**
 * Get available rooms for a specific day and timeframe
 */

route.route('/availableRooms').post((req, res) => {
	const { day, time, courseId } = req.body;

	RoomController.getAvailableRooms(
		{
			day,
			time,
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

/**
 * Add a course to a room
 */
route.route('/:id/addCourseToRoom').put((req, res) => {
	const roomId = req.params.id;
	const { courseId } = req.body;

	RoomController.addCourseToRoom(
		{
			roomId,
			courseId,
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

export default route;
