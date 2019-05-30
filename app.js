/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
    After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his entire score when he rolls two 6 in a row and is next player turn
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//fuction to hide the dice in the beginning
function hideDice(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}
 
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('currentScore-0').textContent = '0';
    document.getElementById('currentScore-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//next player function 
function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //set the round score back to zero before change the player
    roundScore = 0;

    document.getElementById('currentScore-0').textContent = '0';
    document.getElementById('currentScore-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); // too change between players
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice(); 
}

//funciton to generate dice rolls
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // random number
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        // display de resul

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2; 
            document.querySelector('#currentScore-' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();
        }

    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        // update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winnigScore;
        //undefined, o, null or "" are coerced to false
        //anything else is coersed to true
        if (input) {
            winnigScore = input;

        } else {
            winnigScore = 100;
        }

        //check if the player won the game
        if (scores[activePlayer] >= winnigScore) {
            // won the game
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();

        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);









