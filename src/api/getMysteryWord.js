export async function getMysteryWord() {
  try {
    const response = await fetch(`https://api.datamuse.com/words?sp=?????`)
    const words = await response.json()
    return words[Math.floor(Math.random() * 100)].word
  } catch (error) {
    console.error('Error fetching wordle data', error)
  }
}
