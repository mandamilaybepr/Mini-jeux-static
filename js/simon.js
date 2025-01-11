
const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let userSequence = [];
let isGameOver = false;
let isUserTurn = false;

// Sélectionner les éléments DOM
const buttons = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue')
};
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');

// Fonction pour démarrer le jeu
function startGame() {
    gameSequence = [];
    userSequence = [];
    isGameOver = false;
    isUserTurn = false;
    message.textContent = "Bonne chance !";
    addColorToSequence();
}

// Fonction pour ajouter une couleur à la séquence du jeu
function addColorToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    userSequence = [];
    displaySequence();
}

// Fonction pour afficher la séquence au joueur
function displaySequence() {
    let i = 0;
    const interval = setInterval(() => {
        const color = gameSequence[i];
        flashColor(color);
        i++;
        if (i === gameSequence.length) {
            clearInterval(interval);
            isUserTurn = true;
            message.textContent = "À vous de jouer !";
        }
    }, 1000); // Intervalle de 1 seconde entre chaque couleur
}

// Fonction pour faire clignoter un bouton de couleur
function flashColor(color) {
    buttons[color].style.opacity = 0.3;
    setTimeout(() => {
        buttons[color].style.opacity = 1;
    }, 500);
}

// Fonction pour gérer la saisie du joueur
function handleUserInput(color) {
    if (isGameOver || !isUserTurn) return;

    userSequence.push(color);
    flashColor(color);

    // Vérifier si la séquence du joueur est correcte
    if (userSequence[userSequence.length - 1] !== gameSequence[userSequence.length - 1]) {
        gameOver();
    } else {
        // Si la séquence est correcte, vérifier si le joueur a fini
        if (userSequence.length === gameSequence.length) {
            isUserTurn = false;
            message.textContent = "Correct ! Préparez-vous au prochain tour.";
            setTimeout(addColorToSequence, 1000);
        }
    }
}

// Fonction pour afficher le message de fin de jeu
function gameOver() {
    isGameOver = true;
    message.textContent = `Game Over ! Séquence : ${gameSequence.join(', ')}`;
}

// Ajouter des écouteurs d'événements pour les boutons
buttons.green.addEventListener('click', () => handleUserInput('green'));
buttons.red.addEventListener('click', () => handleUserInput('red'));
buttons.yellow.addEventListener('click', () => handleUserInput('yellow'));
buttons.blue.addEventListener('click', () => handleUserInput('blue'));

// Démarrer le jeu lorsque le bouton est cliqué
startButton.addEventListener('click', startGame);
