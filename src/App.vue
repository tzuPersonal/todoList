<script setup lang="ts">
import { useStore, init } from './store';
import List from './components/List.vue';
import Panel from './components/Panel.vue';

const store = useStore();
const change = (payload: {key: 'time'|'content', value: string}) => {
  store.todo[payload.key] = payload.value;
}
const complete = () => {
  store.todo.done = !store.todo.done;
}
const confirm = () => {
  store.add();
}
const close = () => {
  store.closePanel();
}


init();
</script>

<template>
  <div class="max-w-lg m-auto mt-10">
    <List></List>
    <Panel v-if="store.visible"
      :content="store.todo.content"
      :time="store.todo.time"
      :done="store.todo.done"
      @complete="complete"
      @change="change"
      @confirm="confirm"
      @close="close"
    />
  </div>
</template>
