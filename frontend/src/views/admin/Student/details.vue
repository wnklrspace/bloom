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
      {
        name: student.cName,
        path: `/admin/student/${student._id}`,
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
      <h1>{{ student.cName }}</h1>

      <b-form
        v-if="student && student.address && student.contact"
        @submit.prevent="saveChanges"
      >
        <b-form-group label="Name" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedStudent.cName"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="Street" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedStudent.address.street"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="Zip Code" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedStudent.address.zipCode"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="City" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedStudent.address.city"
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
              v-model="editedStudent.contact.phoneNumber"
              :disabled="!isEditing"
              class="mb-1"
            />
          </b-col>
        </b-form-group>

        <b-form-group label="Email" label-cols-md="3" label-align-md="right">
          <b-col cols="9">
            <b-form-input
              v-model="editedStudent.contact.email"
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

      <Space />

      <ClassConfiguration
        v-if="student._id"
        :studentId="student._id"
        :schoolClass="student.class"
      />

      <Space v-if="student._id" />

      <CourseConfiguration
        v-if="student._id"
        :studentId="student._id"
        :schoolClass="student.class"
        :assignedCourses="student.courses"
      />
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
  name: "StudentDetails",
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
    const student: any = ref({});
    let editedStudent: any = ref({});
    let isEditing: any = ref(false);
    let loading: any = ref(false);

    const fetchStudent = async () => {
      const response = await fetch(
        BACKEND_URL + "/api/v1/student/" + route.params.id
      );
      const data = await response.json();
      student.value = data;
      editedStudent.value = { ...data };
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchStudent();
      loading.value = false;
    });

    const startEdit = () => {
      isEditing.value = true;
    };

    const cancelEdit = () => {
      editedStudent.value = { ...student.value };
      isEditing.value = false;
      window.location.reload();
    };

    const saveChanges = async () => {
      console.log(editedStudent.value);
      const response = await fetch(
        BACKEND_URL + "/api/v1/user/" + route.params.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedStudent.value),
        }
      );
      const data = await response.json();
      student.value = data;
      editedStudent.value = { ...data };
      isEditing.value = false;
      window.location.reload();
    };

    return {
      loading,
      student,
      editedStudent,
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
