'use strict';
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currScore0 = document.getElementById('current--0');
const currScore1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//start the game
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const finalScores = [0, 0];
let currScore = 0;
let player = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = 0;
  currScore = 0;
  player = player === 0 ? 1 : 0;
  //switch visual effect
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate Random num
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    //select photo
    diceEl.src = `dice-${dice}.png`;
    //check the number
    if (dice !== 1) {
      currScore += dice;
      document.getElementById(`current--${player}`).textContent = currScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

///hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to the current player
    finalScores[player] += currScore;
    document.getElementById(`score--${player}`).textContent =
      finalScores[player];
    //finish the Game && if the score >=100
    if (finalScores[player] >= 100) {
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    }
    //switch to next player
    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  finalScores[0] = 0;
  finalScores[1] = 0;
  currScore = 0;
  player = 0;
  playing = true;
});
