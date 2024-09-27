'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
//const current0 = document.getElementById('current--0')
const current0El = document.querySelector('#current--0');
//const current1 = document.getElementById('current--1')
const current1El = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');
const btnHelp = document.querySelector('.btn-help');
score0.textContent = 0;
score1.textContent = 0;

diceEl.classList.add('hidden');
let scores = [0, 0];
let currentScore = 0;

let activePlayer = 0;

let playing = true;

// an initializing function

const init = function () {
  diceEl.classList.add('hidden');

  current0El.textContent = 0;
  current1El.textContent = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;
};

// switch player function

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice
    const dice = Math.trunc(Math.random() * 6 + 1);

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = ` dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next play
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // if score = 100 active player win
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

btnHelp.addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});

document.querySelector('.close-modal').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});
