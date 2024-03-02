<script setup lang="ts">
import LinkButton from "@/components/LinkButton.vue";
</script>

<template>
  <div class="flex flex-col">
    <link-button class="my-4" caption="Классический" to="/classic" />
    <link-button class="my-4" caption="Бонус" to="/bonus" />
    <link-button class="my-4" caption="Правила" to="/rules" />
  </div>
</template>
