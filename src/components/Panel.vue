<template>
  <div
    class="
      panel
      flex
      flex-col
      items-center
      absolute
      left-1/2
      top-1/2
      translate-x-[-50%]
      translate-y-[-50%]
      w-[400px]
      h-[300px]
      border
      border-solid
      border-black
      rounded-[10px]
      bg-white
    "
  >
    <div
      class="
        close
        absolute
        right-[10px]
        top-[10px]
        cursor-pointer
      "
      @click="close"
      v-text="'X'"
    />
    <h2
      class="my-[10px]"
      v-text="'新增/修改'"
    />
    <div class="content">
      content:
      <input
        :placeholder="'todo'"
        :value="content"
        @change="(e) => change(e, 'content')"
      />
    </div>
    <div class="time">
      time:
      <input
        type="date"
        :placeholder="'time'"
        :value="time"
        @change="(e) => change(e, 'time')"
      />
    </div>
    <div
      class="
        complete
        flex
        flex-row
        items-center
      "
    >
      done:
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
    </div>
    <div
      class="
        confirm
        border
        px-[10px]
        py-[5px]
        mt-auto
        mb-[10px]
        border-solid
        border-black
        rounded-[10px]
        cursor-pointer
      "
      @click="confirm"
      v-text="'確認'"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  content?: string
  time?: string
  done?: boolean
};

const props = withDefaults(defineProps<Props>(), {
  content: '',
  time: '',
  done: false,
});
const emit = defineEmits<{
  (e: 'complete'): void
  (e: 'change', payload: {key: 'time'|'content', value: string}, ): void
  (e: 'confirm'): void
  (e: 'close'): void
}>();
const complete = (): void => {
  emit('complete');
}
const change = (e: Event, key: 'time'|'content'): void => {
  const target = e.target as HTMLInputElement; // 轉型
  // const target = <HTMLInputElement>e.target // 泛型
  const payload = {
    value: target.value,
    key,
  };
  emit('change', payload);
}
const confirm = () => {
  emit('confirm');
}
const close = () => {
  emit('close');
}
</script>
