const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.querySelector('.btn__reset');
let missed = 0;
const score = document.querySelector('#scoreboard ol');
let createdLI = document.createElement('li');
let image = document.createElement('img');
let letters;
let show = document.querySelectorAll('.show');
const title = document.querySelector('#overlay .title');
const overlay = document.getElementById('overlay');
const hearts = document.querySelectorAll('.tries img'); 

start.addEventListener('click', () => {
    overlay.style.display = 'none';
    game();
});

const phrases = [
    'a foregone conclusion',
    'a friend in need is a friend indeed',
    'a little knowledge is a dangerous thing',
    'a miss is as good as a mile',
    'a penny for your thoughts',
];

function getRandomPhraseAsArray(array) {
    const randomPhrase = Math.floor(Math.random() * array.length);
    return array[randomPhrase].split("");
}

function addPhrasesToDisplay(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        const list = document.createElement('li');
        list.textContent = arr[i];
        if (arr[i] !== " ") {
            list.className = 'letter';
        } else {
            list.className = 'space';
        }
        const phraseUL = document.querySelector('#phrase ul');
        phraseUL.appendChild(list);
    }
    letters = document.querySelectorAll('.letter');
}

function game() {
    clearKeyboard();
    clearScoreboard();
    clearPhrase();
    missed = 0;
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasesToDisplay(phraseArray);
}

function clearPhrase(){
    phrase.removeChild(phrase.firstElementChild);
    let newUl = document.createElement('ul');
    phrase.append(newUl);
  }
  
  function clearKeyboard(){
    let keyboardLetters = document.querySelectorAll('#qwerty button');
    for (i=0; i<keyboardLetters.length; i++){
      keyboardLetters[i].disabled = false;
      keyboardLetters[i].classList.remove('chosen');
    }
  }
  
  function clearScoreboard(){
    const hearts = document.querySelectorAll('.tries img');
    for (let i=0; i<5; i++){
      hearts[i].src = "images/liveHeart.png";
    }
  }
  
function checkLetter(button) {
    let result = null;
    for (let i = 0; i < letters.length; i += 1) {
        if (letters[i].textContent.toUpperCase() == button.textContent.toUpperCase()) {
            letters[i].classList.add("show");
            result = button;
        }
     }
     return result;
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.className = "chosen";
        e.target.disabled = true;
        let letterFound = checkLetter(e.target);
        if (letterFound === null) {
            missed ++;
            hearts[hearts.length - missed].src = 'images/lostHeart.png';
        }
        checkWin();
    }
});

function checkWin () {
    if (missed === 5) {
        overlay.className = 'lose';
        title.textContent = "You Lose";
        start.textContent = "Play Again";
        overlay.style.display = 'flex';
    }
    let show = document.querySelectorAll('.show');
    let letters = document.querySelectorAll('.letter');
    if (show.length === letters.length) {
        overlay.className = 'win';
        title.textContent = "you Win";
        start.textContent = "Play Again";
        overlay.style.display = 'flex';
    }
    
}