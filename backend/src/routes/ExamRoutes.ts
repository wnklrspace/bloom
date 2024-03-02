import router from 'express';
import ExamController from '../controller/Exam';
import { Response } from '../types/EventsMap';

const route = router.Router();

route.route('/').get((req, res) => {
	ExamController.getAllExams((response: Response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

route.route('/').post((req, res) => {
	ExamController.createExam(
		{
			name: req.body.name,
			weight: req.body.weight,
			type: req.body.type,
			courseId: req.body.courseId,
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

route.route('/getAllExamsWithCourseKeys').get((req, res) => {
	ExamController.getAllExamsWithCourseKeys((response: Response) => {
		if (response.isSuccess) {
			res.status(200).send(response.res);
		} else {
			res.status(400).send(response.message);
		}
	});
});

route.route('/:id').get((req, res) => {
	ExamController.getOneExam(
		{
			examId: req.params.id,
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

export default route;
