/* Aydouni Chadi - 43729 - B111 */

/**
 * Affiche la tête du serpent.
 */
function showSnakeHead() {
    // on récupère l'id correspondant à la ligne et la colonne de la position de départ, on rajoute ensuite la classe associée.
    $(`#${snake.head.row}-${snake.head.column}`).addClass("snakeHead");
}

/**
 * Affiche le corps du serpent.
 */
function showSnakeBody() {
    for (let pos of snake.tail) {
        $(`#${pos.row}-${pos.column}`).addClass("snakeBody");
    }
}

/**
 * Affichage spécial du serpent lors de sa mort (clignote).
 */
function showDeadSnake() {
    let timing = 500;

    setInterval(function () {
        $(".snakeHead").removeClass("snakeHead");
        $(".snakeBody").removeClass("snakeBody");
    }, timing);

    setInterval(function () {
        showSnakeHead();
        showSnakeBody();
    }, 2 * timing);
}

/**
 * Affiche les fruits sur le plateau.
 */
function showFruits() {
    for (let fruit of fruits) {
        $(`#${fruit.position.row}-${fruit.position.column}`).addClass("fruit");
    }
}

/**
 * Affiche les scores sur la page.
 */
function showScore() {
    $(".actualScoreValue").text(`${actualScore}`);
    $("#bestScoreValue").text(`${bestScore}`);
}

/**
 * Affiche le message de fin de partie
 */
function showEndMessage() {
    $("#endMessage").show();
    if (bestScoreBeaten) {
        $("#bestScoreMessage").show();
    }
    $("#restartButton").show();
}

/**
 * Mets à jour l'affichage du plateau.
 */
function updateBoard() {
    $(".snakeHead").removeClass("snakeHead");
    $(".snakeBody").removeClass("snakeBody");
    $(".fruit").removeClass("fruit");

    showSnakeHead();
    showSnakeBody();
    showFruits();
    showScore();
}


