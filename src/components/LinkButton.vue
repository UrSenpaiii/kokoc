<script setup lang="ts">
defineProps<{
  caption: string;
  to: string;
  isSecondary?: boolean;
}>();
</script>

<template>
  <router-link
    :class="[
      { 'bg-white text-blue-700 font-light px-8 py-3': isSecondary },
      'border-white border-2 rounded-xl px-6 py-2 hover:text-gray-400 hover:border-gray-400 transition-all ease-out',
    ]"
    :to="to"
  >
    {{ caption.toUpperCase() }}
  </router-link>
</template>
