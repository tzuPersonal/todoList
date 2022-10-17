<template>
  <div
    class="
      todo
      relative
      flex
      flex-row
      items-center
      px-[10px]
      py-[30px]
      w-[300px]
      border
      border-solid
      border-black
      rounded-[10px]
    ">
    <div
      class="
        id
        mr-[10px]
      "
      v-text="`${id}.`"
    />
    <div>{{ content }}</div>
    <div
      class="
        edit
        px-[5px]
        py-[2px]
        ml-auto
        border
        border-solid
        border-black
        rounded-[5px]
        cursor-pointer
      "
      @click="edit"
      v-text="'edit'"
    />
    <div
      class="
        time
        absolute
        right-[5px]
        bottom-[5px]
        text-stone-400
      "
      v-text="time"
    />
    <div
      class="
        checkbox
        w-[10px]
        h-[10px]
        ml-[10px]
        border
        border-solid
        border-black
        cursor-pointer
      "
      :class="done ? 'bg-green-400' : ''"
      @click="complete"
    />
    <div
      class="
        remove
        ml-[10px]
        cursor-pointer
      "
      @click="remove"
      v-text="'X'"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: number
  content: string
  time: string
  done: boolean
}>();
const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'complete'): void
  (e: 'edit'): void
}>();

const remove = () => {
  emit('remove');
};
const complete = () => {
  emit('complete');
};
const edit = () => {
  emit('edit');
};
</script>
