//variáveis
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');
var endGame = false

//botoes
const btnNG = document.getElementById('btn-new'); // botão de novo jogo
const btnRD = document.getElementById('btn-roll'); //botão de girar o dado de novo
const btnHold = document.getElementById('btn-hold'); //botão de salvar a pontuação e passar a vez

score1.innerHTML = 0;
score2.innerHTML = 0;

document.querySelector(".dice").classList.add('hidden');

//rodar o dado = roll
//ouvindo o botão, se clicar executa a func roll, para rodar o dado
btnRD.addEventListener('click', roll);



//função para aleatorizar o número e aparecer a imagem do dado correspondente ao número
function roll() {

  document.querySelector(".dice").classList.remove('hidden');
  if (endGame) return; 
  //número aleatório de 1 a 6
  const numberDice = Math.trunc(Math.random() * 6) + 1;
  document.getElementsByClassName('dice')[0].src = `./dice-${numberDice}.png`;
  if (numberDice === 1) {
      player1.classList.toggle('player--active');
      player2.classList.toggle('player--active');
      current1.innerHTML = 0;
      current2.innerHTML = 0;
  }

  if (numberDice > 1) {
    if (player1.classList.contains("player--active")) {
      current1.innerHTML = parseInt(current1.innerHTML) + numberDice;
    }else{
      current2.innerHTML = parseInt(current2.innerHTML) + numberDice;
    }
  }

}

//passar a vez e somar o current com o score
//ouvindo o botão, se clicar executa a func hold, para somar o current com o score e passar para o próximo
btnHold.addEventListener('click', hold);

//função para trocar o player, e atualizar o score
function hold() {
  if (endGame) return;
  if (player1.classList.contains("player--active")) {
    score1.innerHTML = parseInt(score1.innerText) + parseInt(current1.innerText)
    current1.innerHTML = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
  }else{
    score2.innerHTML = parseInt(score2.innerText) + parseInt(current2.innerText)
    current2.innerHTML = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
  }

  winner()

}

//resetar o jogo = New Game
//ouvindo o botão, se clicar executa a func reset, para new game
btnNG.addEventListener('click', newGame);

//função de resetar tudo quando apertar em new game
function newGame() {
  document.querySelector(".dice").classList.add('hidden');
  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  player1.classList.remove("player--winner");
  current2.textContent = 0;
  player2.classList.remove("player--winner");

  endGame = false;
}

//função de winner
function winner() {
  if (parseInt(score1.innerHTML) >= 100) {
    player1.classList.add("player--winner");
    const name = document.getElementById('name--0')
    name.innerHTML = "Player 1 ganhou"
    endGame = true;
  }else if (parseInt(score2.innerHTML) >= 100) {
    player2.classList.add("player--winner");
    const name2 = document.getElementById('name--1')
    name2.innerHTML = "Player 2 ganhou"
    endGame = true;
  }
}