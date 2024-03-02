<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Overview',
        path: '/admin',
      },
      {
        name: 'Teacher',
        path: '/admin/teacher',
      },
    ]"
  />
  <div class="wrapper">
    <CreateButton title="Teacher" path="/admin/teacher/create" />

    <template v-if="loading">
      <div class="spinner">
        <BSpinner />
        <p class="loader">Loading teachers...</p>
      </div>
    </template>
    <tempplate v-else>
      <List
        title="Available Teacher"
        :items="
          teacher.map((teacherItem: any) => {
            return {
              link: `/admin/teacher/${teacherItem._id}`,
              title: teacherItem.cName,
              handlers: [
                {
                  name: 'Edit',
                  handler: () => {
                    $router.push(`/admin/teacher/${teacherItem._id}`);
                  },
                },
              ],
            };
          })
        "
      />
    </tempplate>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { BACKEND_URL } from "@/config";
import Header from "@/components/admin/Header.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import CreateButton from "@/components/common/CreateButton.vue";

export default {
  name: "TeacherOverview",
  components: {
    Header,
    Breadcrumbs,
    CreateButton,
  },
  setup() {
    const teacher: any = ref([]);
    let loading: any = ref(false);

    const fetchTeacher = async () => {
      const response = await fetch(BACKEND_URL + "/api/v1/teacher");
      const data = await response.json();
      teacher.value = data;
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchTeacher();
      loading.value = false;
    });

    return {
      loading,
      teacher,
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
