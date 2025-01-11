$(document).ready(function(){
    let grid = [];
let score = 0;
const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

// Touchpad Buttons
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

// Fonction pour initialiser la grille et l'afficher
function initGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    score = 0;
    addNewTile();
    addNewTile();
    updateGrid();
}

// Fonction pour ajouter une nouvelle tuile (2 ou 4) à une position vide
function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ i, j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.i][randomCell.j] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Fonction pour mettre à jour l'affichage de la grille
function updateGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            const value = grid[i][j];
            cell.textContent = value !== 0 ? value : '';
            if (value > 0) {
                cell.style.backgroundColor = getTileColor(value);
            }

            gridContainer.appendChild(cell);
            cell.setAttribute("data-i", i);
            cell.setAttribute("data-j", j);
        }
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

// Fonction pour déterminer la couleur des tuiles en fonction de leur valeur
function getTileColor(value) {
    const colors = {
        2: '#eee4da',
        4: '#ede0c8',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#edcf72',
        256: '#edcc61',
        512: '#edc850',
        1024: '#edc53f',
        2048: '#edc22e',
    };
    return colors[value] || '#cdc1b4';
}

// Fonction pour déplacer et combiner les tuiles
function move(direction) {
    let moved = false;
    switch (direction) {
        case 'up':
            moved = moveUp();
            break;
        case 'down':
            moved = moveDown();
            break;
        case 'left':
            moved = moveLeft();
            break;
        case 'right':
            moved = moveRight();
            break;
    }
    if (moved) {
        addNewTile();
        updateGrid();
    }
}

// Fonction pour déplacer les tuiles vers le haut
function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let newColumn = grid.map(row => row[col]).filter(val => val);
        let mergedColumn = [];
        let i = 0;

        while (i < newColumn.length) {
            if (newColumn[i] === newColumn[i + 1]) {
                mergedColumn.push(newColumn[i] * 2);
                score += newColumn[i] * 2;
                i += 2;
            } else {
                mergedColumn.push(newColumn[i]);
                i++;
            }
        }

        while (mergedColumn.length < 4) mergedColumn.push(0);
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== mergedColumn[row]) moved = true;
            grid[row][col] = mergedColumn[row];
        }
    }
    return moved;
}

// Fonction pour déplacer les tuiles vers le bas
function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let newColumn = grid.map(row => row[col]).filter(val => val).reverse();
        let mergedColumn = [];
        let i = 0;

        while (i < newColumn.length) {
            if (newColumn[i] === newColumn[i + 1]) {
                mergedColumn.push(newColumn[i] * 2);
                score += newColumn[i] * 2;
                i += 2;
            } else {
                mergedColumn.push(newColumn[i]);
                i++;
            }
        }

        while (mergedColumn.length < 4) mergedColumn.push(0);
        mergedColumn.reverse();
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== mergedColumn[row]) moved = true;
            grid[row][col] = mergedColumn[row];
        }
    }
    return moved;
}

// Fonction pour déplacer les tuiles vers la gauche
function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(val => val);
        let mergedRow = [];
        let i = 0;

        while (i < newRow.length) {
            if (newRow[i] === newRow[i + 1]) {
                mergedRow.push(newRow[i] * 2);
                score += newRow[i] * 2;
                i += 2;
            } else {
                mergedRow.push(newRow[i]);
                i++;
            }
        }

        while (mergedRow.length < 4) mergedRow.push(0);
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== mergedRow[col]) moved = true;
            grid[row][col] = mergedRow[col];
        }
    }
    return moved;
}

// Fonction pour déplacer les tuiles vers la droite
function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let newRow = grid[row].filter(val => val).reverse();
        let mergedRow = [];
        let i = 0;

        while (i < newRow.length) {
            if (newRow[i] === newRow[i + 1]) {
                mergedRow.push(newRow[i] * 2);
                score += newRow[i] * 2;
                i += 2;
            } else {
                mergedRow.push(newRow[i]);
                i++;
            }
        }

        while (mergedRow.length < 4) mergedRow.push(0);
        mergedRow.reverse();
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== mergedRow[col]) moved = true;
            grid[row][col] = mergedRow[col];
        }
    }
    return moved;
}

// Fonction readKey() pour détecter les touches du clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        move('up');
    } else if (e.key === 'ArrowDown') {
        move('down');
    } else if (e.key === 'ArrowLeft') {
        move('left');
    } else if (e.key === 'ArrowRight') {
        move('right');
    }
});

// Contrôles du touchpad
upBtn.addEventListener('click', () => move('up'));
downBtn.addEventListener('click', () => move('down'));
leftBtn.addEventListener('click', () => move('left'));
rightBtn.addEventListener('click', () => move('right'));

// Bouton pour recommencer le jeu
restartBtn.addEventListener('click', initGame);

// Démarrer le jeu au chargement de la page
initGame();

    
    
});
