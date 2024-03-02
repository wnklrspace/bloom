<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Overview',
        path: '/admin',
      },
      {
        name: 'Courses',
        path: '/admin/course',
      },
      {
        name: course.name,
        path: `/admin/course/${course._id}`,
      },
    ]"
  />

  <template v-if="loading">
    <div class="spinner">
      <BSpinner />
      <p class="loader">Loading...</p>
    </div>
  </template>
  <template v-else>
    <div class="wrapper">
      <GeneralConfiguration :course="course" />

      <Space />

      <ClassConfiguration
        :courseId="course._id"
        :assignedClasses="course.schoolClasses"
        :mandatory="course.mandatory"
      />

      <Space />

      <StudentConfiguration
        :courseId="course._id"
        :assignedStudents="course.students"
        :assignedClasses="course.schoolClasses"
        :mandatory="course.mandatory"
      />

      <Space />

      <ExamConfiguration :courseId="course._id" />
    </div>
  </template>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import Header from "@/components/admin/Header.vue";
import ClassConfiguration from "@/components/admin/Courses/Classes/index.vue";
import StudentConfiguration from "@/components/admin/Courses/Students/index.vue";
import GeneralConfiguration from "@/components/admin/Courses/General/index.vue";
import ExamConfiguration from "@/components/admin/Courses/Exams/index.vue";
import Space from "@/components/common/Space.vue";

export default {
  name: "CourseDetails",
  components: {
    Breadcrumbs,
    Header,
    GeneralConfiguration,
    ClassConfiguration,
    StudentConfiguration,
    ExamConfiguration,
    Space,
  },
  setup() {
    const route = useRoute();
    const course: any = ref({});
    const rank = ref("");
    let loading: any = ref(false);

    const fetchCourse = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/course/${route.params.id}`)
        .then((response) => {
          course.value = response.data;

          axios
            .get(
              `http://localhost:4000/api/v1/class/${response.data.schoolClasses[0]}`
            )
            .then((response) => {
              rank.value = response.data.rank;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchCourse();
      loading.value = false;
    });

    return {
      loading,
      course,
      rank,
    };
  },
};
</script>

<style scoped>
p {
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2rem;
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
