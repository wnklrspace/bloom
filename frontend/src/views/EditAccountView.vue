<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Account settings',
        path: '/settings',
      },
    ]"
  />
  <div class="wrapper">
    <b-container class="edit-view">
      <b-row>
        <b-col>
          <h1>Edit Account</h1>
          <Space />
          <h3>Change your password</h3>
          <div class="form">
            <BForm @submit="editAccount()" class="edit-form">
              <BFormGroup
                class="edit-form-inputs"
                id="input-old-password"
                label="Old password:"
                label-for="password-input-field"
              >
                <BFormInput
                  id="old-password-input-field"
                  v-model="oldPassword"
                  type="password"
                  :placeholder="isEditing ? '' : '***********'"
                  :disabled="!isEditing"
                  required
                />
              </BFormGroup>
              <BFormGroup
                class="edit-form-inputs"
                id="input-new-password"
                label="New password:"
                label-for="password-input-field"
              >
                <BFormInput
                  id="password-input-field"
                  v-model="newPassword"
                  type="password"
                  :placeholder="isEditing ? '' : '***********'"
                  :disabled="!isEditing"
                  required
                />
              </BFormGroup>
              <BFormGroup
                class="edit-form-inputs"
                id="input-confirm-new-password"
                label="Confirm new password:"
                label-for="password-input-field"
              >
                <BFormInput
                  id="password-input-field"
                  v-model="confirmNewPassword"
                  type="password"
                  :placeholder="isEditing ? '' : '***********'"
                  :disabled="!isEditing"
                  required
                />
              </BFormGroup>
              <BFormGroup class="">
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
                    <b-button
                      v-else
                      @click="startEdit"
                      variant="dark"
                      class="mt-2"
                      >Edit</b-button
                    >
                  </b-col>
                </b-row>
              </BFormGroup>
            </BForm>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BACKEND_URL } from "@/config";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    let isEditing: any = ref(false);
    let oldPassword: any = ref("");
    let newPassword: any = ref("");
    let confirmNewPassword: any = ref("");
    const router = useRouter();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const startEdit = () => {
      isEditing.value = true;
    };

    const cancelEdit = () => {
      isEditing.value = false;
      window.location.reload();
    };

    const editAccount = async () => {
      if (oldPassword.value === newPassword.value) {
        alert("New password cannot be the same as the old password");
        oldPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
        return;
      }

      if (newPassword.value !== confirmNewPassword.value) {
        alert("Passwords do not match");
        oldPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
        return;
      }

      try {
        await axios
          .put(BACKEND_URL + `/api/v1/user/${user.userId}/credentials`, {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          })
          .then((response) => {
            alert("Password changed successfully. Please login again.");
            isEditing.value = false;
            localStorage.removeItem("user");
            console.info("User logged out");
            router.push("/login");
            window.location.reload();
          })
          .catch((error) => {
            alert(error.response);
            oldPassword.value = "";
            newPassword.value = "";
            confirmNewPassword.value = "";
            console.info(error);
          });
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    return {
      isEditing,
      oldPassword,
      newPassword,
      confirmNewPassword,
      startEdit,
      cancelEdit,
      editAccount
    };
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 2rem;
}
</style>
