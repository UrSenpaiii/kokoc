<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ id: string; colorClass: string }>();

const imgPath = computed((): string =>
  require(`@/assets/images/icons/icon-${props.id}.svg`),
);
</script>

<template>
  <div :class="[colorClass, 'p-5', 'rounded-full', 'max-w-fit']">
    <div
      class="bg-white p-10 rounded-full shadow-[inset_0_6px_0_0_rgba(204,204,204,1)]"
    >
      <div class="w-16 h-16 flex justify-center align-middle">
        <img :src="imgPath" alt="token icon" />
      </div>
    </div>
  </div>
</template>
