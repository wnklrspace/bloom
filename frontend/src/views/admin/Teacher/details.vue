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
      {
        name: teacher.cName,
        path: `/admin/teacher/${teacher._id}`,
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
      <h1>{{ teacher.cName }}</h1>

      <b-form
        v-if="teacher && teacher.address && teacher.contact"
        @submit.prevent="saveChanges"
      >
        <b-form-group label="Name" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedTeacher.cName"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="Street" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedTeacher.address.street"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="Zip Code" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedTeacher.address.zipCode"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="City" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedTeacher.address.city"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group
          label="Phone Number"
          label-cols-md="3"
          label-align-md="right"
        >
          <b-col cols="9">
            <b-form-input
              v-model="editedTeacher.contact.phoneNumber"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="Email" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedTeacher.contact.email"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-row>
          <b-col class="mt-3" cols="12">
            <b-button
              v-if="isEditing"
              type="submit"
              variant="success"
              class="mt-2 mr-3"
              >Save Changes</b-button
            >
            <b-button
              v-if="isEditing"
              type="button"
              @click="cancelEdit"
              variant="outline-secondary"
              class="mt-2 ml-3"
              >Cancel</b-button
            >
            <b-button v-else @click="startEdit" variant="dark" class="mt-2"
              >Edit</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </div>
  </template>
</template>

<script lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { BACKEND_URL } from "@/config";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import Header from "@/components/admin/Header.vue";
import Space from "@/components/common/Space.vue";
import ClassConfiguration from "@/components/admin/Students/Classes/index.vue";
import CourseConfiguration from "@/components/admin/Students/Courses/index.vue";
import DangerZone from "@/components/admin/DangerZone.vue";

export default {
  name: "TeacherDetails",
  components: {
    Breadcrumbs,
    Header,
    Space,
    ClassConfiguration,
    CourseConfiguration,
    DangerZone,
  },

  setup() {
    const route = useRoute();
    const teacher: any = ref({});
    let editedTeacher: any = ref({});
    let isEditing: any = ref(false);
    let loading: any = ref(false);

    const fetchTeacher = async () => {
      const response = await fetch(
        BACKEND_URL + "/api/v1/teacher/" + route.params.id
      );
      const data = await response.json();
      teacher.value = data;
      editedTeacher.value = { ...data };
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchTeacher();
      loading.value = false;
    });

    const startEdit = () => {
      isEditing.value = true;
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editedTeacher.value = { ...teacher.value };
      window.location.reload();
    };

    const saveChanges = async () => {
      const response = await fetch(
        BACKEND_URL + "/api/v1/user/" + route.params.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTeacher.value),
        }
      );
      const data = await response.json();
      teacher.value = data;
      editedTeacher.value = { ...data };
      isEditing.value = false;
      window.location.reload();
    };

    return {
      loading,
      teacher,
      editedTeacher,
      isEditing,
      startEdit,
      cancelEdit,
      saveChanges,
    };
  }
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
