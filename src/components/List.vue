<template>
  <div
    class="
      list
      flex
      flex-col
      h-600
      p-[30px]
      border
      border-solid
      border-black
      rounded-[10px]
    "
  >
    <h2
      class="
        text-center
        mb-[10px]
      "
      v-text="'TODO LIST'"
    />
    <Tabs
      :tabs="['未完成', '完成']"
      :currentIndex="currentIndex"
      @change="change"
    ></Tabs>
    <div
      class="
        todoItems
        min-w-lg-[400px]
        h-[500px]
        overflow-auto
      "
    >
      <Todo v-for="(item) in displayList" :key="item.id"
        class="
          m-auto
          mb-[10px]
          last:mb-0
        "
        :id="item.id"
        :content="item.content"
        :time="item.time"
        :done="item.done"
        @complete="complete(item.id)"
        @remove="remove(item.id)"
        @edit="edit(item.id)"
      />
    </div>
    <div
      class="
        add
        self-end
        px-[10px]
        py-[5px]
        border
        border-solid
        border-black
        rounded-[10px]
        cursor-pointer
      "
      @click="add"
    >新增</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '../store';
import Todo from './Todo.vue';
import Tabs from './Tabs.vue';

const store = useStore();
const complete = (id: number) => {
  store.toggleDone(id);
};
const remove = (id: number): void => {
  store.remove(id);
};
const edit = (id: number): void => {
  store.openPanel('edit', id);
};
const add = (): void => {
  store.openPanel('add');
};
const currentIndex = ref(0);
const change = (index: number) => {
  currentIndex.value = index
}
const isDone = computed(() => currentIndex.value === 1);
const displayList = computed(() => store.list.filter(({ done }) => done === isDone.value));
</script>
