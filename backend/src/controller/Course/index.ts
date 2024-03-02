import createCourse from './actions/createCourse';
import editCourse from './actions/editCourse';
import getOneCourse from './actions/getOneCourse';
import getAllCourses from './actions/getAllCourses';
import getCoursesForStudent from './actions/getCoursesForStudent';
import getCoursesForTeacher from './actions/getCoursesForTeacher';
import addClassToCourse from './actions/addClassToCourse';
import addOneClassToCourse from './actions/addOneClassToCourse';
import addStudentToCourse from './actions/addStudentToCourse';
import addTeacherToCourse from './actions/addTeacherToCourse';
import removeStudentFromCourse from './actions/removeStudentFromCourse';
import removeClassFromCourse from './actions/removeClassFromCourse';
import removeTeacherFromCourse from './actions/removeTeacherFromCourse';
import addManyClassesToCourse from './actions/addManyClassesToCourse';

export default {
	createCourse,
	editCourse,
	getOneCourse,
	getAllCourses,
	getCoursesForStudent,
	getCoursesForTeacher,
	addClassToCourse,
	addOneClassToCourse,
	addManyClassesToCourse,
	addStudentToCourse,
	addTeacherToCourse,
	removeStudentFromCourse,
	removeClassFromCourse,
	removeTeacherFromCourse,
};
