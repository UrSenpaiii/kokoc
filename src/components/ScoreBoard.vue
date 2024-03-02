<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useItemsStore } from "@/store/ItemsStore";

const { score } = storeToRefs(useItemsStore());
</script>

<template>
  <div
    class="flex items-center justify-between border-4 rounded-2xl border-gray-500"
  >
    <div class="m-5">
      <img alt="Rock Paper Scissors" src="@/assets/images/logos/logo.svg" />
    </div>
    <div class="m-5">
      <div class="flex flex-col bg-white text-gray-800 py-2.5 px-10 rounded">
        <h2 class="text-xl font-bold text-blue-800">СЧЕТ</h2>
        <div class="text-5xl font-bold text-blue-950">
          {{ score }}
        </div>
      </div>
    </div>
  </div>
</template>
