<template>
  <div class="container">
    <header>
      <div class="wrapper">
        <Header msg="Wordle" />
      </div>
    </header>
    <ModalWindow />
    <main>
      <TheGrid />
      <button @click="openInfoModal">Open info modal</button>
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import TheGrid from './components/TheGrid.vue';

import ModalWindow from './components/Modals/ModalWindow.vue';
import useModalStore from "./stores/useModalStore";
import InfoModalWindow from '@/components/Modals/InfoModalWindow.vue'
const store = useModalStore();

// Make a function that opens modal with our inner component
function openInfoModal() {
  store.openModal({ component: InfoModalWindow });
}

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
