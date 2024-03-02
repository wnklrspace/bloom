import { createRouter, createWebHistory } from 'vue-router';
import AdminView from '../views/admin/index.vue';
import LoginView from '../views/LoginView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import ClassView from '../views/ClassView.vue';
import CoursesView from '../views/CoursesView.vue';
import EditAccountView from '../views/EditAccountView.vue';
import GradesViewVue from '../views/GradesView.vue';

import CourseOverview from '@/views/admin/Course/index.vue';
import CourseDetails from '@/views/admin/Course/details.vue';
import CourseCreate from '@/views/admin/Course/create.vue';

import StudentOverview from '@/views/admin/Student/index.vue';
import StudentDetails from '@/views/admin/Student/details.vue';
import StudentCreate from '@/views/admin/Student/create.vue';

import ClassOverview from '@/views/admin/Class/index.vue';
import ClassDetails from '@/views/admin/Class/details.vue';
import ClassCreate from '@/views/admin/Class/create.vue';

import TeacherOverview from '@/views/admin/Teacher/index.vue';
import TeacherDetails from '@/views/admin/Teacher/details.vue';
import TeacherCreate from '@/views/admin/Teacher/create.vue';

import ExamOverview from '@/views/admin/Exam/index.vue';
import ExamDetails from '@/views/admin/Exam/details.vue';
import ExamCreate from '@/views/admin/Exam/create.vue';

import RoomOverview from '@/views/admin/Room/index.vue';
import RoomDetails from '@/views/admin/Room/details.vue';
import RoomCreate from '@/views/admin/Room/create.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/admin',
			name: 'admin',
			component: AdminView,
		},

		{ path: '/admin/course', component: CourseOverview },
		{ path: '/admin/course/:id', component: CourseDetails },
		{ path: '/admin/course/create', component: CourseCreate },

		{ path: '/admin/student', component: StudentOverview },
		{ path: '/admin/student/:id', component: StudentDetails },
		{ path: '/admin/student/create', component: StudentCreate },

		{ path: '/admin/class', component: ClassOverview },
		{ path: '/admin/class/:id', component: ClassDetails },
		{ path: '/admin/class/create', component: ClassCreate },

		{ path: '/admin/teacher', component: TeacherOverview },
		{ path: '/admin/teacher/:id', component: TeacherDetails },
		{ path: '/admin/teacher/create', component: TeacherCreate },

		{ path: '/admin/exam', component: ExamOverview },
		{ path: '/admin/exam/:id', component: ExamDetails },
		{ path: '/admin/exam/create', component: ExamCreate },

		{ path: '/admin/room', component: RoomOverview },
		{ path: '/admin/room/:id', component: RoomDetails },
		{ path: '/admin/room/create', component: RoomCreate },

		{
			path: '/',
			redirect: { path: '/login' },
			name: 'login',
			component: LoginView,
			children: [
				{
					path: '/login',
					name: 'login',
					component: LoginView,
				},
			],
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/schedule',
			name: 'schedule',
			component: ScheduleView,
		},
		{
			path: '/class',
			name: 'class',
			component: ClassView,
		},
		{
			path: '/courses',
			name: 'courses',
			component: CoursesView,
		},
		{
			path: '/grades',
			name: 'grades',
			component: GradesViewVue,
		},
		{
			path: '/settings',
			name: 'settings',
			component: EditAccountView,
		},
	],
});

export default router;
