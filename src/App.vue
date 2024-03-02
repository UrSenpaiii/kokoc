<script setup lang="ts">
import ScoreBoard from "@/components/ScoreBoard.vue";
import PageFooter from "@/components/PageFooter.vue";
</script>

<template>
  <div class="flex flex-col justify-center items-center h-fit">
    <header class="my-10">
      <score-board />
    </header>
    <main class="my-10">
      <router-view />
    </main>
    <footer class="mt-5 flex justify-end w-full px-10"><page-footer /></footer>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: radial-gradient(#1e3554, #131639);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  height: 100%;
}
</style>
