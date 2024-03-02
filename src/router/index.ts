import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RulesView from "@/views/RulesView.vue";
import ResultsView from "@/views/ResultsView.vue";
import PlayBoardView from "@/views/PlayBoardView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    redirect: "/classic",
  },
  {
    path: "/:gameType",
    name: "home",
    component: PlayBoardView,
  },
  {
    path: "/results/:pick",
    name: "results",
    component: ResultsView,
  },
  {
    path: "/rules",
    name: "rules",
    component: RulesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
