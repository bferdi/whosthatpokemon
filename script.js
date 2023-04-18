const apiUrl = 'https://pokeapi.co/api/v2';
const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');
const streakCount = document.getElementById('streak-count');

let pokemonName;
let streak = 0;

function getRandomPokemon() {
  const pokemonId = Math.floor(Math.random() * 898) + 1; // There are currently 898 Pokemon in the PokeAPI
  return fetch(`${apiUrl}/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(data => {
      pokemonImage.src = data.sprites.front_default;
      return data.name;
    });
}

function checkGuess() {
  const guess = guessInput.value.toLowerCase();
  if (guess === pokemonName) {
    alert('Congratulations! You guessed correctly.');
    streak++;
    streakCount.textContent = streak;
    if (confirm('Would you like to play again?')) {
      resetGame();
    }
  } else {
    alert('Try again!');
    streak = 0;
    streakCount.textContent = streak;
  }
}

function resetGame() {
  guessInput.value = '';
  getRandomPokemon().then(name => {
    pokemonName = name;
  });
}

function handleResetClick() {
  resetGame();
  streak = 0;
  streakCount.textContent = streak;
}

guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', handleResetClick);

resetGame();
