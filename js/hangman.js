$(document).ready(function(){
const words = ['chat', 'chien', 'elephant', 'voiture', 'ordinateur'];
let chosenWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
let maxGuesses = 6;

// Fonction pour choisir un mot au hasard
function chooseWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    chosenWord = words[randomIndex];
}

// Fonction pour afficher le mot avec des tirets pour les lettres non devinées
function displayWord() {
    let display = '';
    for (let i = 0; i < chosenWord.length; i++) {
        if (guessedLetters.includes(chosenWord[i])) {
            display += chosenWord[i] + ' ';
        } else {
            display += '_ ';
        }
    }
    document.getElementById('word').textContent = display.trim();
}

// Fonction pour afficher l'image du pendu en fonction des erreurs
function updateHangman() {
    const imagePath = `pic/hangman${wrongGuesses}.png`;

    // Créer une grille d'images avec un conteneur
    const hangmanGrid = document.getElementById('hangmanGrid');
    const imageElement = document.createElement('img');
    imageElement.src = imagePath;
    imageElement.alt = `Image du pendu ${wrongGuesses}`;
    imageElement.style.width = "100px";  // Taille des images
    imageElement.style.height = "auto";

    // Ajouter l'image à la grille de hangman
    hangmanGrid.appendChild(imageElement);
}

// Fonction pour afficher les lettres proposées
function displayGuessedLetters() {
    document.getElementById('guessed').textContent = guessedLetters.join(', ');
}

// Fonction pour vérifier si la lettre proposée est correcte
function checkGuess(letter) {
    document.getElementById('hangman').style.display="none";
    if (validateGuess(letter)) {
        if (chosenWord.includes(letter)) {
            guessedLetters.push(letter);
            if (!chosenWord.split('').some(letter => !guessedLetters.includes(letter))) {
                document.getElementById('message').textContent = 'Vous avez gagné !';
            }
        } else {
            wrongGuesses++;
            updateHangman();
            if (wrongGuesses >= maxGuesses) {
                document.getElementById('message').textContent = `Vous avez perdu ! Le mot était : ${chosenWord}`;
            }
        }
        displayWord();
        displayGuessedLetters();
    }
}

// Fonction pour valider la lettre entrée
function validateGuess(letter) {
    const alphabet = /^[a-zA-Z]$/;  // Vérifie que c'est une lettre
    if (!alphabet.test(letter)) {
        alert("Veuillez entrer une lettre valide.");
        return false;
    }
    if (guessedLetters.includes(letter)) {
        alert("Vous avez déjà proposé cette lettre.");
        return false;
    }
    return true;
}

// Initialiser le jeu
function initGame() {
    chosenWord = '';
    guessedLetters = [];
    wrongGuesses = 0;
    // Vider la grille d'images pour recommencer le jeu
    document.getElementById('hangmanGrid').innerHTML = '';
    chooseWord();
    displayWord();
    document.getElementById('message').textContent = '';
}

// Event listener pour la soumission de la lettre
document.getElementById('submitGuess').addEventListener('click', function() {
    const letterInput = document.getElementById('letter');
    const letter = letterInput.value.toLowerCase();
    
    if (letter) {
        checkGuess(letter);
    }
    
    letterInput.value = '';  // Clear input field
    letterInput.focus();     // Focus on input for the next guess
});
$('#toggleButton').click(function() {
    $('#rules').toggle(); 
    if ($('#rules').is(':visible')) {
        $('#toggleButton').text('Masquer les Règles');
    } else {
        $('#toggleButton').text('Afficher les Règles');
    }})

initGame();
});
