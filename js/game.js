const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.Player');
const timer = document.querySelector('.timer');
const record = document.querySelector('.record');
const characters = [
    'naruto1',
    'naruto2',
    'naruto3',
    'naruto4',
    'naruto5',
    'naruto6',
    'naruto7',
    'naruto8',
    'naruto9',
    'naruto10',
];
const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
let firstCard = '';
let secondCard = '';
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.desable-card');
    if(disabledCards.length == 20){
        clearInterval(this.loop);
        document.getElementsByClassName('gameOver')[0].style.display = 'block';
        record.innerHTML = `parabens! ${spanPlayer.innerHTML}! seu tempo foi de: ${timer.innerHTML} segundos`
    }
}
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('desable-card');
        secondCard.firstChild.classList.add('desable-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
    } 
    else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
}
const revealCard = ({ target }) => {
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstCard ===''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    }
    checkCards();
}
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    front.style.backgroundImage = `url('../imagens/${character}.jpg')`;
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    return card;
}
const loadGame = () => {
    const dublicateCharacter = [...characters, ...characters];
    const shuffledArrey = dublicateCharacter.sort(() => Math.random() - 0.5);
    shuffledArrey.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}
const startTime = () => {
    this.loop = setInterval(() => {
        const correntTime = +timer.innerHTML;
        timer.innerHTML = correntTime + 1;
    },1000);
}
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime()
    loadGame();
}
function reinicia(){ 
    document.location.reload();
}

