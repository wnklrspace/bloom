<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Overview',
        path: '/admin',
      },
      {
        name: 'Students',
        path: '/admin/student',
      },
    ]"
  />
  <div class="wrapper">
    <CreateButton title="Student" path="/admin/student/create" />

    <template v-if="loading">
      <div class="spinner">
        <BSpinner />
        <p class="loader">Loading students...</p>
      </div>
    </template>
    <template v-else>
      <List
        title="Available Students"
        :items="
          students.map((student: any) => {
            return {
              link: `/admin/student/${student._id}`,
              title: student.cName,
              handlers: [
                {
                  name: 'Edit',
                  handler: () => {
                    $router.push(`/admin/student/${student._id}`);
                  },
                },
              ],
            };
          })
        "
      />
    </template>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { BACKEND_URL } from "@/config";
import Header from "@/components/admin/Header.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import CreateButton from "@/components/common/CreateButton.vue";
import List from "@/components/admin/List.vue";

export default {
  name: "StudentOverview",
  components: {
    Header,
    Breadcrumbs,
    CreateButton,
    List,
  },
  setup() {
    const students: any = ref([]);
    let loading: any = ref(false);

    const fetchStudents = async () => {
      const response = await fetch(BACKEND_URL + "/api/v1/student");
      const data = await response.json();
      students.value = data;
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchStudents();
      loading.value = false;
    });

    return {
      loading,
      students,
    };
  },
};
</script>

<style scoped>
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
