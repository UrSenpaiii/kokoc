<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import ChosenItem from "@/components/ChosenItem.vue";
import { storeToRefs } from "pinia";
import { useItemsStore } from "@/store/ItemsStore";
import { useRoute } from "vue-router";
import { Item } from "@/Types";
import { Ref } from "vue/dist/vue";

const route = useRoute();
const gameType = ref<string | string[]>(route.params.gameType);

const { items }: { items: Ref<Item[]> } = storeToRefs(useItemsStore());
const defaultItems = ref<Item[]>(items.value.filter((el) => !el.bonusGame));

const token = ref<HTMLElement | null>(null);
const tokenCoords = ref<Array<Array<number>>>([]);
const halfTokenSize = ref<number>(0);

const isBonusGame = computed((): boolean => gameType.value === "bonus");

const setDefaultItems = (newGameType: string | string[]): void => {
  gameType.value = newGameType;

  defaultItems.value = isBonusGame.value
    ? items.value
    : items.value.filter((el) => !el.bonusGame);
};

onMounted(() => {
  setDefaultItems(gameType.value);
});

watch(
  () => route.params.gameType,
  (value) => setDefaultItems(value),
  { deep: true },
);

const tokensDrawCoords = (
  sidesNumber: number,
  width: number,
  height: number,
  isLookingDown: boolean,
  halfTokenWidth: number,
): Array<Array<number>> => {
  const res = [];
  const angle = (180 * (sidesNumber - 2)) / sidesNumber;
  const angleToRotate = 180 - angle;
  const radius = width / (2 * Math.sin((angleToRotate * Math.PI) / 180.0));

  let currentAngle = sidesNumber % 2 == 0 ? angleToRotate / 2 : 0;
  let baseRotation = 0;
  const baseOffsetX = width / 2;
  let baseOffsetY = height - radius;

  if (isLookingDown) {
    baseRotation = 180;
    baseOffsetY = radius;
  }

  while (currentAngle < 360) {
    const radians = ((baseRotation + currentAngle) * Math.PI) / 180.0;
    res.push([
      baseOffsetX + Math.sin(radians) * radius - halfTokenWidth,
      baseOffsetY + Math.cos(radians) * radius - halfTokenWidth,
    ]);
    currentAngle += angleToRotate;
  }

  return res;
};

onMounted(() => {
  halfTokenSize.value = token.value[0].clientHeight / 2;
});

const getImagePath = (): string => {
  const img: HTMLImageElement = new Image();
  img.src = require(`@/assets/images/bg/bg-${gameType.value}.svg`);

  const { width, height } = img;

  tokenCoords.value = tokensDrawCoords(
    defaultItems.value.length,
    width,
    height,
    isBonusGame.value,
    halfTokenSize.value,
  );

  return img.src;
};
</script>

<template>
  <div class="relative m-10">
    <div class="flex justify-center">
      <img :src="getImagePath()" alt="bg" />
    </div>
    <div
      ref="token"
      v-for="(item, i) in defaultItems"
      class="absolute"
      :style="{ left: tokenCoords[i][0] + 'px', top: tokenCoords[i][1] + 'px' }"
      :key="i"
    >
      <router-link :to="`/results/${item.id}`">
        <chosen-item
          class="cursor-pointer hover:shadow-[0_0_50px_10px_rgba(69,131,255,1)] transition"
          :color-class="item.colorClass"
          :id="item.id"
        />
      </router-link>
    </div>
  </div>
</template>
