<template>
  <Breadcrumbs
    :links="[
      {
        name: 'Overview',
        path: '/admin',
      },
      {
        name: 'Classes',
        path: '/admin/class',
      },
    ]"
  />
  <div class="wrapper">
    <CreateButton title="Class" path="/admin/class/create" />

    <template v-if="loading">
      <div class="spinner">
        <BSpinner />
        <p class="loader">Loading classes...</p>
      </div>
    </template>
    <template v-else>
      <ul class="class-list">
        <li v-for="(sortedClass, index) in sortedClassList">
          <p class="class-number">
            {{ sortedClass.key }}
          </p>
          <List
            title="Classes for this rank"
            :items="
              sortedClass.data.map((schoolClass: any) => {
                return {
                  link: `/admin/class/${schoolClass._id}`,
                  title: schoolClass.name,
                  handlers: [
                    {
                      name: 'Edit',
                      handler: () => {
                        $router.push(`/admin/class/${schoolClass._id}`);
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
import { BACKEND_URL } from "@/config";
import Header from "@/components/admin/Header.vue";
import CreateButton from "@/components/common/CreateButton.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import List from "@/components/admin/List.vue";

export default {
  name: "ClassOverviewView",
  components: {
    Header,
    CreateButton,
    Breadcrumbs,
    List,
  },
  setup() {
    const classes: any = ref([]);
    const sortedClassList: any = ref([]);
    let loading: any = ref(false);

    const fetchCourses = async () => {
      const response = await fetch(BACKEND_URL + "/api/v1/class");
      const data = await response.json();
      classes.value = data.sort((a: any, b: any) => a.rank - b.rank);
      const listOfRanks = classes.value.reduce((acc: any, curr: any) => {
        if (!acc.includes(curr.rank)) {
          acc.push(curr.rank);
        }
        return acc;
      }, []);

      sortedClassList.value = listOfRanks.map((rank: any) => {
        return {
          key: rank,
          data: classes.value.filter(
            (schoolClass: any) => schoolClass.rank === rank
          ),
        };
      });
    };

    onBeforeMount(async () => {
      loading.value = true;
      await fetchCourses();
      loading.value = false;
    });

    return {
      loading,
      classes,
      sortedClassList,
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

.class-list {
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
