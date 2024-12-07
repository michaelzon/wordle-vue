<template>
  <div class="container">
    <header>
      <div class="wrapper">
        <Header msg="Wordle" />
      </div>
    </header>
    <main>
      <TheGrid />
    </main>
  </div>
</template>

<script setup>

import Header from './components/Header.vue'
import TheGrid from './components/TheGrid.vue';

</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  place-items: center;
}

header {
  display: flex;
  place-items: center;
  line-height: 1.5;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
