<template>
  <div class="list-container">
    <p>
      <strong>{{ title }} ({{ items!.length.toString() }})</strong>
    </p>
    <div v-if="items?.length === 0">
      <p><i> No {{ title?.toLocaleLowerCase() }} available</i></p>
    </div>
    <div v-else>
      <ul class="list">
        <li
          class="list-item"
          v-for="(item, index) in items"
          :class="{ first: index === 0, last: index === items!.length - 1 }"
          :key="item!.title"
        >
          <a class="list-item-link" :href="`${item.link}`">
            <p>
              <strong>{{ item.title }}</strong>
            </p>
          </a>
          <ul v-if="item.handlers !== null" class="cta-list">
            <li v-for="(itemHandler, index) in item.handlers">
              <Button
                :text="itemHandler.name"
                :type="itemHandler.type"
                :onClick="() => itemHandler.handler()"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/components/common/Button.vue";

export default {
  name: "List",
  props: {
    title: {
      type: String,
    },
    items: {
      type: Array<{
        title: string;
        link: string;
        handlers:
          | [
              {
                name: string;
                type: string;
                handler: () => void;
              },
            ]
          | null;
      }>,
    },
  },
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  padding: 10px !important;
}

.list-item-link {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #000;
}

.list-item-link:hover {
  background-color: transparent !important;
  text-decoration: underline;
}

.cta-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.cta-list li {
  list-style: none;
}

h3,
p {
  margin: 0;
}

.first {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.last {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom: 1px solid #ccc;
}
</style>
