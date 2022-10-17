<template>
  <div
    class="
      tabs
      flex
      flex-row
      justify-center
    "
  >
    <div v-for="(tab, index) in tabs" :key="index"
      class="
        tab
        text-black
        mr-[10px]
        mb-[10px]
        border-b
        border-solid
        border-black
        cursor-pointer
        opacity-50
        last:mr-0
      "
      :class="currentIndex === index ? 'opacity-100' : ''"
      @click="change(index)"
    >
      {{ tab }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  tabs?: Array<string>
  currentIndex?: number
};

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  currentIndex: 0,
});
const emit = defineEmits<{
  (e: 'change', index: number): void
}>();
const change = (index: number) => {
  emit('change', index);
}
</script>