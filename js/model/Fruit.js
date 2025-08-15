/* Aydouni Chadi - 43729 - B111 */

/**
 * Un Fruit est désigné par une position sur le plateau de jeu.
 */
class Fruit {

    constructor(position) {
        this._position = position;
    }

    get position() {
        return this._position;
    }
}