<script setup>
import Header from './components/Header.vue'
import TheGrid from './components/TheGrid.vue';
import useWordle from '@/hooks/useWordle.js'
import { onMounted } from 'vue'

const { rows, fetchWordDataMuse, handleTryAgain, wordExists, turn } = useWordle();

onMounted(fetchWordDataMuse);

</script>

<template>
  <div class="container">
    <header>
      <div class="wrapper">
        <Header msg="Wordle" />
      </div>
    </header>
    <main>
      <TheGrid :rows="rows" :word-exists="wordExists" :turn="turn" />
      <button class="button" @click="handleTryAgain">Try again</button>
    </main>
    <footer class="footer">
      <p class="author">
        Made by: Michael Zonneveld. <a class="link" href="https://github.com/michaelzon/wordle-vue">View on GitHub</a>
      </p>
    </footer>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: space-between;
  height: 100vh;
}

header {
  display: flex;
  place-items: center;
  line-height: 1.5;
  margin-top: 0.4rem;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

footer p {
  margin-bottom: 1rem;
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


.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 60%;
  border-radius: 0.4rem;
  outline: none;
  border: none;
  color: black;
  font-size: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

</style>
