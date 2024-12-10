import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import useModalStore from '@/stores/useModalStore.js'
import { existingWords } from '@/words.js'

export default function useWordle() {
  const store = useModalStore()
  let roundIsOver = ref(false)
  let currentRowIndex = ref(0)
  let turn = ref(0)
  let rows = reactive(initRows())
  let mysteryWord = reactive([])
  let frequencies = reactive({})
  let wordExists = ref(true)

  function initRows() {
    return Array(5)
      .fill(null)
      .map(() =>
        Array(5)
          .fill(null)
          .map(() => ({
            letter: '',
            evaluation: '',
          })),
      )
  }

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
      handleTryAgain,
    )
  }

  function openLoserModal() {
    store.openInfoModal(
      '🙈',
      "Oops! Though Luck, But Don't Give Up!",
      `The word was: '${mysteryWord.join('')}'!`,
      "You didn't quite make it this time, but hey no worries! Give it another shot, and whoknows, the next round might be your moment of glory! Keep going champ! 💪🎮 ",
      'Try Again',
      handleTryAgain,
    )
  }

  function getCurrentGuess() {
    return rows[turn.value].map((tile) => tile.letter).join('')
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
      wordExists.value = true
      currentRowIndex.value = currentRowIndex.value - 1
      removeLetterFromTile()
    }

    if (e.key === 'Enter' && currentRowIndex.value === 5) {
      const lookUpWord = new Promise((resolve, reject) => {
        if (existingWords.includes(getCurrentGuess())) {
          resolve('Word is in dictionary')
        } else {
          wordExists.value = false
          reject('Word is not in dictionary')
        }
      })
      lookUpWord
        .then(() => {
          setFrequencies()
          currentRowIndex.value = 0
          evaluateGuess()
          turn.value++
        })
        .catch(() => {
          console.log('word does not exist')
        })
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
      roundIsOver.value = true
      openWinnerModal()
    } else if (!userHasWon && turn.value === 4) {
      roundIsOver.value = true
      openLoserModal()
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
        row.forEach((tile) => {
          // only loop over rows that contain input
          tile.letter = ''
          tile.evaluation = ''
        })
      }
    })
  }

  const handleTryAgain = () => {
    roundIsOver.value = false
    store.closeModal()
    turn.value = 0
    currentRowIndex.value = 0
    clearRows()
    fetchWordDataMuse()
  }

  console.log('hook word exists', wordExists);

  return {
    rows,
    fetchWordDataMuse,
    handleTryAgain,
    wordExists,
    turn
  }
}
