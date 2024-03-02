import router from 'express';
import { GradeController } from '../controller/';
import { STATUS } from '../types/enums';

const route = router.Router();

route.route('/').get((req, res) => {});

route.route('/').post((req, res) => {});

route.route('/:id').get((req, res) => {});

route.route('/:id').put((req, res) => {});

export default route;
