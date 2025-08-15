/* Aydouni Chadi - 43729 - B111 */

/* ----------- VARIABLES ----------- */

/* Création des directions */
let north = new Position(-1, 0);
let south = new Position(1, 0);
let west = new Position(0, -1);
let east = new Position(0, 1);

/* Création du serpent */
let startPos = new Position(randomInteger(0, nbRows - 1), randomInteger(0, nbColumns - 1));
let snake = new Snake(startPos, north);
let grows = false;
// Permet d'éviter un changement de direction
let moveRegistered = false;

/* Création du tableau de fruits */
let fruits = [];

/* Création du score et du meilleur score */
let actualScore = 0;
let bestScore = localStorage.getItem("bestScore");
let bestScoreBeaten = false;

/* Création des gains */
let naturalGrowthScore = 10;
let fruitGrowthScore = 50;

/* Création des timers */
let gameSpeed = 150;
let snakeGrowthSpeed = 5000;

/* ----------- METHODES ----------- */

/**
 * Chargement du document et lancement du jeu.
 */
$(document).ready(function () {
    createBoard(nbRows, nbColumns);
    updateBoard();
    checkScore();
    $(document).keydown(changeDirection);
    game();
})

/**
 * Joue un mouvement et mets à jour le plateau.
 */
function game() {
    let gameLoop = setInterval(function () {
        
        snake.move();
        checkGrows();
        checkScore();
        generateFruit();
        updateBoard();

        if (isGameOver()) {
            // Le serpent arrête de grossir, le score également.
            clearInterval(growsLoop);

            // La boucle s'arrête : le jeu est terminé.
            clearInterval(gameLoop);

            // Le serpent clignote.
            showDeadSnake();

            // On affiche le message de fin.
            showEndMessage();

            // On sauvegarde le meilleur score.
            saveBestScore();
        }

    }, gameSpeed);

    /*  Toutes les 5 secondes, peu importe ce qu'il se passe, le serpent grandira d'une case.
        Quand il grandit, le joueur gagne 10 points. */
    let growsLoop = setInterval(function () {
        grows = true;
        actualScore = actualScore + naturalGrowthScore;
    }, snakeGrowthSpeed);
}

/**
 * Génère un entier aléatoire situé entre min et max (inclus).
 * @param {int} min le minimum
 * @param {int} max le maximum
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Permet de changer la direction du serpent, sauf dans la direction opposée à son mouvement.
 * @param {*} event l'évènement keydown. 
 */
function changeDirection(event) {
    if(!moveRegistered){
        switch (event.key) {
            case "ArrowLeft":
                if (snake.direction != east) {
                    snake.direction = west;
                }
                break;
            case "ArrowUp":
                if (snake.direction != south) {
                    snake.direction = north;
                }
                break;
            case "ArrowRight":
                if (snake.direction != west) {
                    snake.direction = east;
                }
                break;
            case "ArrowDown":
                if (snake.direction != north) {
                    snake.direction = south;
                }
                break;
        }
    }
    moveRegistered = true;
}

/**
 * Vérifie si le serpent a mangé un fruit et le supprime si c'est le cas.
 */
function checkGrows() {
    for (let i = 0; i < fruits.length; i++) {
        /*  Si la position de la tête et celle du fruit sont les même, on indique que le serpent doit grandir et on supprime le fruit de la liste.
            Le joueur gagne 50 points. */
        if (snake.head.row == fruits[i].position.row && snake.head.column == fruits[i].position.column) {
            grows = true;
            fruits.splice(i, 1);
            actualScore = actualScore + fruitGrowthScore;
        }
    }
}

/**
 * Vérifie si le meilleur score a été battu et le modifie en conséquence.
 */
function checkScore() {
    // On vérifie également si bestScore a bien été initialisé (ex. première partie).
    if (bestScore == null) {
        bestScore = 0;
    }

    if (actualScore > bestScore) {
        bestScore = actualScore;
        bestScoreBeaten = true;
    }
}

/**
 * Vérifie si le jeu est fini, c'est à dire si la tête du serpent est entrée en contact avec son corps.
 */
function isGameOver() {
    for (let tail of snake.tail) {
        if (snake.head.row == tail.row && snake.head.column == tail.column) {
            return true;
        }
    }
    return false;
}

/**
 * Sauvegarde le meilleur score.
 */
function saveBestScore() {
    if (bestScoreBeaten) {
        localStorage.setItem("bestScore", bestScore);
    }
}
