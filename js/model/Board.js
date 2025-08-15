/* Aydouni Chadi - 43729 - B111 */

/* Taille du plateau */
let nbRows = 15;
let nbColumns = 15;

/**
 *  Crée un plateau de nbRows et nbColumns où chaque case possède un ID indiquant sa position au format "ligne-colonne".
 *  Les lignes et colonnes vont de 0 à nbRows/nbColumns-1.
 * @param {*} nbRows le nombre de lignes du plateau.
 * @param {*} nbColumns le nombre de colonnes du plateau.
 */
function createBoard(nbRows, nbColumns) {
    for (let i = 0; i < nbRows; i++) {
        for (let j = 0; j < nbColumns; j++) {
            $("#board").append($("<div>").addClass("cell").attr("id", `${i}-${j}`));
        }
    }
    // On modifie le CSS en accordance.
    $("#board").css("grid-template-columns", `repeat(${nbColumns},1fr)`);
    $("#board").css("grid-template-rows", `repeat(${nbRows},1fr)`);
}

/**
 * Génère aléatoirement des fruits de façon irrégulière.
 */
function generateFruit() {
    if (randomInteger(1, 40) == 20) {
        let fruitPosition;

        // Tant que la position du fruit n'est pas bonne, on génère une nouvelle position.
        do {
            fruitPosition = new Position(randomInteger(0, nbRows - 1), randomInteger(0, nbColumns - 1));
        } while (!cellIsFree(fruitPosition));

        fruits.push(new Fruit(fruitPosition));
    }
}

/**
 * Vérifie si la position entrée est celle d'une case libre.
 * @param {*} position une position sur le plateau.
 * @returns vrai si la case est libre, faux sinon. 
 */
function cellIsFree(position) {
    // Si la case est celle de la tête
    if (position.row == snake.head.row && position.column == snake.head.column) {
        return false;
    }

    // Si la case est celle de la queue
    for (let tail of snake.tail) {
        if (position.row == tail.row && position.column == tail.column) {
            return false;
        }
    }

    // Si la case est celle d'un fruit
    for (let fruit of fruits) {
        if (position.row == fruit.position.row && position.column == fruit.position.column) {
            return false;
        }
    }
    return true;
}
