<script setup lang="ts">
import ChosenItem from "@/components/ChosenItem.vue";
import { useItemsStore } from "@/store/ItemsStore";
import { storeToRefs } from "pinia";
import LinkButton from "@/components/LinkButton.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, Ref, ref } from "vue";
import { Item } from "@/Types";

const itemsStore = useItemsStore();
const { items }: { items: Ref<Item[]> } = storeToRefs(itemsStore);

const playerItem = ref<Item | undefined>(
  items.value.find((el: Item) => el.id == useRoute().params.pick),
);
const randomItem = ref(
  items.value[Math.floor(Math.random() * items.value.length)],
);

const isBeaten = playerItem.value?.beats.includes(randomItem.value.id);

onMounted(() => {
  if (playerItem.value !== randomItem.value)
    isBeaten ? itemsStore.onWin() : itemsStore.onLoose();
});

const resultText = computed(() => {
  let res = isBeaten ? "ВЫ ПОБЕДИЛИ" : "ВЫ ПРОИГРАЛИ";
  if (playerItem.value === randomItem.value) res = "НИЧЬЯ";

  return res;
});
</script>

<template>
  <div class="flex justify-between">
    <div class="m-3 flex flex-col">
      <div class="mb-6 font-bold text-xl">ВЫ ВЫБРАЛИ</div>
      <chosen-item :id="playerItem.id" :color-class="playerItem.colorClass" />
    </div>
    <div class="m-8 flex flex-col justify-center">
      <div class="mb-6 font-bold text-3xl align-middle">{{ resultText }}</div>
      <link-button to="/" caption="играть снова" is-secondary />
    </div>
    <div class="m-3 flex flex-col">
      <div class="mb-6 font-bold text-xl">КОМПЬЮТЕР ВЫБРАЛ</div>
      <chosen-item :id="randomItem.id" :color-class="randomItem.colorClass" />
    </div>
  </div>
</template>
