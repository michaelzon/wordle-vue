<script setup>
import ModalWindow from '@/components/Modals/ModalWindow.vue'


</script>

<template>
  <div class="grid">
    <div class="grid__row" v-for="row in rows" :key="row">
      <div
        class="grid__tile"
        v-for="tile in row"
        :key="tile"
        :class="{
          'grid__tile--filled': tile.letter !== '',
          'letter-present': tile.evaluation === 'present',
          'letter-correct': tile.evaluation === 'correct',
        }"
      >
        {{ tile.letter }}
      </div>
    </div>
  </div>
  <ModalWindow/>
</template>

<style scoped>
button {
  font-weight: bold;
}

.grid {
  display: flex;
  flex-direction: column;
  min-width: 25rem;
  max-width: 30rem;
  min-height: 25rem;
  max-height: 30rem;
  align-self: center;
  margin-top: 1.2rem;
}

.grid__row {
  display: flex;
  justify-content: center;
  min-width: 25rem;
  max-width: 30rem;
}

.grid__tile {
  border: 2px solid #3b3b3c;
  border-radius: 0.4rem;
  color: white;
  padding: 1px;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.6rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0.3rem;
}

.grid__tile--filled {
  background-color: #333335;
  animation: fadeInAnimation 0.2s;
}

.letter-correct {
  background-color: #498245;
}

.letter-present {
  background-color: #b59535;
}

/* Add the keyframes for the fadeInAnimation if needed */
@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
