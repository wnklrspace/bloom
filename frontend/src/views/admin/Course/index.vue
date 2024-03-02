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
    ]"
  />
  <div class="wrapper">
    <CreateButton title="Course" path="/admin/course/create" />

    <template v-if="loading">
      <div class="spinner">
        <BSpinner />
        <p class="loader">Loading courses...</p>
      </div>
    </template>
    <template v-else>
      <ul class="course-list">
        <li v-for="(sortedCourse, index) in sortedCourseList">
          <p class="class-number">
            {{ sortedCourse.key }}
          </p>
          <List
            title="Available Courses"
            :items="
              sortedCourse.data.map((course: any) => {
                return {
                  title: course.name,
                  link: `/admin/course/${course._id}`,
                  handlers: [
                    {
                      name: 'Edit',
                      handler: () => {
                        $router.push(`/admin/course/${course._id}`);
                      },
                    },
                  ],
                };
              })
            "
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import Header from "@/components/admin/Header.vue";
import CreateButton from "@/components/common/CreateButton.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import List from "@/components/admin/List.vue";

export default {
  name: "CourseOverview",
  components: {
    Header,
    CreateButton,
    Breadcrumbs,
    List,
  },
  setup() {
    const courses: any = ref([]);
    const sortedCourseList: any = ref([]);
    const loading = ref(false);

    const fetchCourses = async () => {
      await axios
        .get(BACKEND_URL + "/api/v1/course")
        .then((response) => {
          courses.value = response.data.sort(
            (a: any, b: any) => a.rank - b.rank
          );
          const listOfRanks = courses.value.reduce((acc: any, curr: any) => {
            if (!acc.includes(curr.rank)) {
              acc.push(curr.rank);
            }
            return acc;
          }, []);

          console.log(listOfRanks);

          sortedCourseList.value = listOfRanks.map((rank: any) => {
            return {
              key: rank,
              data: courses.value.filter(
                (schoolClass: any) => schoolClass.rank === rank
              ),
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchCourses();
      loading.value = false;
    });

    return {
      loading,
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
