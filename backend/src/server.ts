import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { createServer } from 'http';

import corsConfig from './controller/server';
import connectDB from './config/dbConfig';

import UserRoutes from './routes/UserRoutes';
import StudentRoutes from './routes/StudentRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import ClassRoutes from './routes/ClassRoutes';
import CourseRoutes from './routes/CourseRoutes';
import ExamRoutes from './routes/ExamRoutes';
import GradeRoutes from './routes/GradeRoutes';
import RoomRoutes from './routes/RoomRoutes';

const app: Application = express();
const server = createServer(app);
const apiSlug = '/api/v1';

dotenv.config();

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use(apiSlug + '/auth', (req, res) => {
	res.send('Auth');
});

app.use(apiSlug + '/user', UserRoutes);
app.use(apiSlug + '/student', StudentRoutes);
app.use(apiSlug + '/teacher', TeacherRoutes);
app.use(apiSlug + '/class', ClassRoutes);
app.use(apiSlug + '/course', CourseRoutes);
app.use(apiSlug + '/exam', ExamRoutes);
app.use(apiSlug + '/grade', GradeRoutes);
app.use(apiSlug + '/room', RoomRoutes);

app.get(apiSlug + '/', (req, res) => {
	res.send('API is running...');
});

export default server;
