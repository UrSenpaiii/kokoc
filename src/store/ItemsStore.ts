import { defineStore } from "pinia";
import { ref } from "vue";
import { Item } from "@/Types";

export const useItemsStore = defineStore("items", () => {
  const items = ref<Item[]>([
    {
      id: "rock",
      name: "Камень",
      colorClass: "bg-[#DC2E4E]",
      beats: ["scissors", "lizard"],
      bonusGame: false,
    },
    {
      id: "paper",
      name: "Бумага",
      colorClass: "bg-[#4865F4]",
      beats: ["rock", "spock"],
      bonusGame: false,
    },
    {
      id: "scissors",
      name: "Ножницы",
      colorClass: "bg-[#EC9E0E]",
      beats: ["paper", "lizard"],
      bonusGame: false,
    },
    {
      id: "spock",
      name: "Спок",
      colorClass: "bg-[#DC2EC1]",
      beats: ["scissors", "rock"],
      bonusGame: true,
    },
    {
      id: "lizard",
      name: "Ящерица",
      colorClass: "bg-[#0EF134]",
      beats: ["paper", "spock"],
      bonusGame: true,
    },
  ]);

  const lsKey = "gameScore";

  const score = ref<number>(Number(localStorage.getItem(lsKey)) || 0);

  const onWin = (): void => {
    score.value += 1;
    localStorage.setItem(lsKey, score.value.toString());
  };
  const onLoose = (): void => {
    score.value -= 1;
    localStorage.setItem(lsKey, score.value.toString());
  };

  return { items, score, onWin, onLoose };
});
