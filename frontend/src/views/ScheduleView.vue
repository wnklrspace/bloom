<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Schedule',
        path: '/schedule',
      },
    ]"
  />
  <div class="wrapper">
    <div>
      <h1>Hello, {{ user.cName }}!</h1>
      <p>
        Within this view, you can see your schedule and the available courses.
      </p>
    </div>
    <div class="schedule">
      <h4>My schedule</h4>
      <div class="schedule-table">
        <table class="table">
          <thead>
            <tr>
              <th>Time</th>
              <th v-for="weekday in weekdays" :key="weekday">
                {{ weekday }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeSlot in timeSlots" :key="timeSlot">
              <td>{{ timeSlot }}</td>
              <td v-for="weekday in weekdays" :key="weekday">
                <div v-if="getCourseNameAtTimeAndDay(timeSlot, weekday)">
                  <b-button @click="showDetails(timeSlot, weekday)">
                    {{ getCourseNameAtTimeAndDay(timeSlot, weekday) }}
                  </b-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal for Course Details -->
      <div class="modal">
        <b-modal
          v-if="selectedCourse"
          v-model="showModal"
          title="Course Details"
        >
          <div>
            <h3>{{ selectedCourse.name }}</h3>
            <ul>
              <li v-if="selectedCourseRoom">Room: {{ selectedCourseRoom }}</li>
              <li>
                Time Slot:
                {{
                  selectedCourse.time.weekday.charAt(0).toUpperCase() +
                  selectedCourse.time.weekday.slice(1)
                }}, {{ selectedCourse.time.timeslot }}
              </li>
            </ul>
          </div>
          <b-button @click="cancelCourse" variant="danger"
            >Cancel Course</b-button
          >
        </b-modal>
      </div>
      <div>
        <h4>Available Courses</h4>
        <b-card-group deck>
          <b-card v-if="!availableCourses || availableCourses.length === 0">
            <p>There are no available courses for you.</p>
          </b-card>
          <b-card
            v-else
            v-for="course in availableCourses"
            :key="course._id"
            :title="course.name"
          >
            <b-card-text>
              <li v-if="availableCoursesRoom">
                Room: {{ availableCoursesRoom[course._id] }}
              </li>
              <li>
                Time Slot:
                {{
                  course.time.weekday.charAt(0).toUpperCase() +
                  course.time.weekday.slice(1)
                }}, {{ course.time.timeslot }}
              </li>
            </b-card-text>
            <b-button
              @click="addSubjectToSchedule(course._id, user.userId)"
              class="addTo"
              >Add to schedule</b-button
            >
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface Student {
  _id: string;
  cName: string;
  class: string;
  courses: string[];
}

interface Course {
  _id: string;
  name: string;
  time: {
    weekday: string;
    timeslot: string;
  };
  room: string | null;
  class: string;
  schoolClasses: string[];
}

export default defineComponent({
  data() {
    return {
      currentStudent: {} as Student,
      courses: [] as Course[],
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timeSlots: [
        "08:15 - 09:45",
        "10:00 - 11:30",
        "11:45 - 13:15",
        "14:15 - 15:45",
        "16:00 - 17:30",
        "17:45 - 19:15",
      ],
      selectedCourse: null as Course | null,
      selectedCourseRoom: null,
      availableCoursesRoom: {} as { [key: string]: string},
      showModal: false,
      loading: false,
    };
  },
  computed: {
    filteredCourses(): Course[] {
      const studentCourses = this.currentStudent.courses;
      return this.courses.filter((course) =>
        studentCourses.includes(course._id)
      );
    },
    availableCourses(): Course[] {
      const studentCourses = this.currentStudent.courses;
      const studentClass = this.currentStudent.class;
      // Filter courses based on the student's class and exclude already selected courses
      const courses = this.courses.filter((course) => {
        return (
          course.schoolClasses.includes(studentClass) &&
          !studentCourses.includes(course._id)
        );
      });

	  for(const course of courses) {
		  this.fetchRoomNameForAvailableCourses(course);
	  }

	  return courses;

    },
  },
  setup() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return { user };
  },
  async mounted() {
    try {
      const userId = this.user.userId;
      const userResponse = await axios.get(
        `http://localhost:4000/api/v1/student/${userId}`
      );
      this.currentStudent = userResponse.data;

      const coursesResponse = await axios.get(
        "http://localhost:4000/api/v1/course"
      );
      this.courses = coursesResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    async fetchRoomName(course: Course) {
      try {
        const roomResponse = await axios.get(
          "http://localhost:4000/api/v1/room"
        );
        const rooms = roomResponse.data;

        const courseId = course._id;
		// Loop through all courses to find room for each course
        for (const room of rooms) {
          const timetable = room.timetable;
          for (const weekday in timetable) {
            const timeslots = timetable[weekday];
            for (const timeslot in timeslots) {
              const courseInTimeslot = timeslots[timeslot].course;
              if (courseInTimeslot === courseId) {
				// Set room for the course
                return room.name;
              }
            }
          }
        }
        return "Not yet assigned";
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    },

    async fetchRoomNameForAvailableCourses(course: Course) {
      try {
        const roomResponse = await axios.get(
          "http://localhost:4000/api/v1/room"
        );
        const rooms = roomResponse.data;

        // Loop through available courses to find room for each course
        for (course of this.availableCourses) {
          const courseId = course._id;

          for (const room of rooms) {
            const timetable = room.timetable;
            for (const weekday in timetable) {
              const timeslots = timetable[weekday];
              for (const timeslot in timeslots) {
                const courseInTimeslot = timeslots[timeslot].course;
                if (courseInTimeslot === courseId) {
                  // Set room for the course
                  this.$data.availableCoursesRoom[courseId] = room.name;
                }
              }
            }
          }
		  return "Not yet assigned";
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    },
    getCourseNameAtTimeAndDay(
      timeSlot: string,
      weekday: string
    ): string | null {
      const course = this.filteredCourses.find(
        (course) =>
          course.time.timeslot === timeSlot &&
          course.time.weekday.toLowerCase() === weekday.toLowerCase()
      );
      return course ? course.name : null;
    },
    async showDetails(timeSlot?: string, weekday?: string) {
      const course = this.courses.find(
        (course) =>
          course.time.timeslot === timeSlot &&
          course.time.weekday.toLowerCase() === weekday?.toLowerCase()
      );
      if (course) {
        this.selectedCourse = course;
        this.selectedCourseRoom = await this.fetchRoomName(course);
        this.showModal = true;
      }
    },
    hideModal(): void {
      this.selectedCourse = null;
      this.showModal = false;
    },
    async cancelCourse() {
      if (this.selectedCourse) {
        const courseId = this.selectedCourse._id;
        const studentId = this.currentStudent._id;

        await fetch(
          `http://localhost:4000/api/v1/course/${courseId}/removeStudent`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              studentId: studentId,
            }),
          }
        )
          .then((res) => {
            if (res.status === 200) {
              window.location.reload();
            }
          })
          .catch((err) => console.log(err));
        console.log(this.selectedCourse.name + " is canceled");
        this.selectedCourse = null;
        this.showModal = false;
      }
    },
    async addSubjectToSchedule(courseId: string, studentId: string) {
      await fetch(
        `http://localhost:4000/api/v1/course/${courseId}/addStudent`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: studentId,
            classId: this.currentStudent.class,
          }),
        }
      )
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  },
});
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 2rem;
}

.row {
  height: 100%;
}

.navbar {
  height: 100%;
}

.schedule-table {
  margin-bottom: 50px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.subject-link:hover {
  background-color: #f0f0f0;
}

.available-subjects ul {
  list-style: none;
  padding: 0;
}

.available-subjects li {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
}

.available-subjects li:hover {
  background-color: #f5f5f5;
}

.addTo {
  background-color: orange !important;
  border: none !important;
}
</style>
