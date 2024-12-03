<script setup>
import Header from './components/Header.vue'
import TheGrid from './components/TheGrid.vue'
</script>

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

<style scoped>

.container {
  display: flex;
  flex-direction: column;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

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
