<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import ModalWindow from './Modals/ModalWindow.vue'
import useModalStore from '../stores/useModalStore'

const store = useModalStore()

const initRows = () => {
  return Array(5)
    .fill(null)
    .map(() =>
      Array(5)
        .fill(null)
        .map(() => ({
          letter: '',
          evaluation: '',
        })),
    );
}

let rows = reactive(initRows());
let currentRowIndex = ref(0);
let turn = ref(0);
let mysteryWord = reactive([]);
let frequencies = reactive({});

async function fetchWordDataMuse() {
  try {
    const response = await fetch(`https://api.datamuse.com/words?sp=?????`)
    const words = await response.json()
    const word = words[Math.floor(Math.random() * 100)].word
    mysteryWord = word.split('')
    console.log('mw in fetch', mysteryWord)
  } catch (error) {
    console.error('Error fetching wordle data', error)
  }
}

fetchWordDataMuse()

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
})

// Make a function that opens modal with our inner component
function openWinnerModal() {
  store.openInfoModal(
    '🏆',
    "You're a Winner, Champ!",
    `You guessed the word: '${mysteryWord.join('')}'!`,
    "Congrats! You've crushed it and won the game. Now, bask in your glory and celebrate like a boss! 🎉",
    'Try Again',
    handleTryAgain
  )
}

function openLoserModal() {
  store.openInfoModal(
    '🙈',
    "Oops! Though Luck, But Don't Give Up!",
    `The word was: '${mysteryWord.join('')}'!`,
    "You didn't quite make it this time, but hey no worries! Give it another shot, and whoknows, the next round might be your moment of glory! Keep going champ! 💪🎮 ",
    'Try Again',
    handleTryAgain
  )
}

const handleKeyPress = (e) => {
  if (e.metaKey || e.ctrlKey) {
    return // Allow the default behavior for shortcuts like Cmd+R or Ctrl+R
  }

  if (/^[a-z]$/i.test(e.key) && currentRowIndex.value < 5 && turn.value < 5) {
    e.preventDefault()
    addLetterToTile(e.key)
    currentRowIndex.value++
  }

  if (e.key === 'Backspace' && currentRowIndex.value > 0) {
    currentRowIndex.value = currentRowIndex.value - 1
    removeLetterFromTile()
  }

  if (e.key === 'Enter' && currentRowIndex.value === 5) {
    setFrequencies()
    currentRowIndex.value = 0
    evaluateGuess()
    turn.value++
  }
}

function addLetterToTile(key) {
  rows[turn.value][currentRowIndex.value].letter = key
}

function removeLetterFromTile() {
  rows[turn.value][currentRowIndex.value].letter = ''
}

// this will help to mark a tile yellow if the same letter is correct at a higher index of a word
// and will lead to more expected behaviour as opposed to out of te box functions like filter and includes
function setFrequencies() {
  frequencies = {}
  mysteryWord.forEach((letter) => {
    if (frequencies[letter]) {
      frequencies[letter] += 1
    } else {
      frequencies[letter] = 1
    }
  })
}

function markCorrectLetters() {
  rows[turn.value].map((tile, index) => {
    if (tile.letter === mysteryWord[index]) {
      tile.evaluation = 'correct'
      if (frequencies[tile.letter] > 0) {
        frequencies[tile.letter]--
      }
    }
  })
}

function markPresentLetters() {
  rows[turn.value].map((tile) => {
    if (
      mysteryWord.includes(tile.letter) &&
      tile.evaluation !== 'correct' &&
      frequencies[tile.letter] > 0
    ) {
      tile.evaluation = 'present'
      frequencies[tile.letter]--
    }
  })
}

function checkIfGuessIsCorrect() {
  const userHasWon = rows[turn.value].every((tile) => tile.evaluation === 'correct')
  if (userHasWon) {
    openWinnerModal();
  } else if (!userHasWon && turn.value === 4) {
    openLoserModal();
  }
}

function evaluateGuess() {
  setFrequencies()
  markCorrectLetters()
  markPresentLetters()
  checkIfGuessIsCorrect()
}

function clearRows() {
  rows.forEach((row) => {
    if (row.some((tile) => tile.letter)) {
      row.forEach((tile) => { // only loop over rows that contain input
        tile.letter = '';
        tile.evaluation = '';
      });
    }
  });
}

const handleTryAgain = () => {
  store.closeModal();
  turn.value = 0;
  currentRowIndex.value = 0;
  clearRows();
  fetchWordDataMuse();
}
</script>

<template>
  <div class="grid">
    <div class="grid__row" v-for="row in rows" :key="row">
      <div
        class="grid__item"
        v-for="item in row"
        :key="item"
        :class="{
          'grid__item--filled': item.letter !== '',
          'letter-present': item.evaluation === 'present',
          'letter-correct': item.evaluation === 'correct',
        }"
      >
        {{ item.letter }}
      </div>
    </div>
  </div>
  <p>the word is {{ mysteryWord }}</p>
  <button @click="handleTryAgain">Try again</button>
  <ModalWindow />
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

.grid__item {
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

.grid__item--filled {
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
