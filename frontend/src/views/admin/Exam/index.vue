<template>
	<Breadcrumbs
		:links="[
			{
				name: 'Overview',
				path: '/admin',
			},
			{
				name: 'Exams',
				path: '/admin/student',
			},
		]"
	/>
	<div class="wrapper">
		<CreateButton
			title="Exams"
			path="/admin/exam/create"
		/>

    <template v-if="loading">
      <div class="spinner">
        <BSpinner />
        <p class="loader">Loading exams...</p>
      </div>
    </template>
    <template v-else>
      <ul class="course-list">
        <li v-for="(sortedCourse, index) in sortedCourseList" :key="index">
          <p class="class-number">
            {{ sortedCourse.rank }}
          </p>
          <template
            v-for="(course, courseIndex) in sortedCourse.courses"
            :key="courseIndex"
          >
            <h3>{{ course.name }}</h3>
            <List
              title="Exams"
              :items="
                course.exams.map((exam: any) => {
                  return {
                    title: exam.name,
                    link: `/admin/exam/${exam._id}`,
                    handlers: [
                      {
                        name: 'Edit',
                        handler: () => {
                          $router.push(`/admin/exam/${exam._id}`);
                        },
                      },
                    ],
                  };
                })
              "
            />
          </template>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { BACKEND_URL } from '@/config';
import Header from '@/components/admin/Header.vue';
import Breadcrumbs from '@/components/common/Breadcrumbs.vue';
import CreateButton from '@/components/common/CreateButton.vue';
import List from '@/components/admin/List.vue';

export default {
  name: "ExamOverview",
  components: {
    Header,
    Breadcrumbs,
    CreateButton,
    List,
  },
  setup() {
    let exams: any = ref([]);
    const courses: any = ref([]);
    const sortedCourseList: any = ref([]);
    let loading = ref(false);

    const fetchCoursesWithExams = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/exam/getAllExamsWithCourseKeys`
        );
        sortedCourseList.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchCoursesWithExams();
      loading.value = false;
    });

    return {
      loading,
      exams,
      courses,
      sortedCourseList,
    };
  },
};
</script>

<style scoped>
p,
ul,
li {
	list-style: none;
	padding: 0;
	margin: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2rem;
}

.course-list {
	display: flex;
	flex-direction: column;
	gap: 40px;
}

.class-number {
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: #222;
	color: #fff;
	margin-bottom: 10px;

	display: flex;
	align-items: center;
	justify-content: center;
}

.spinner {
  display: flex;
  justify-content: center;
}

.loader {
  margin-left: 10px;
  vertical-align: middle;
}
</style>
