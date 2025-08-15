/* Aydouni Chadi - 43729 - B111 */

/**
 * Une position est désignée par une abscisse et une ordonnée.
 */
class Position {

    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    /**
     * Accesseur de la ligne.
     */
    get row() {
        return this._row;
    }

    /**
     * Mutateur de la ligne.
     */
    set row(value) {
        this._row = value;
    }

    /**
    * Accesseur de la colonne.
    */
    get column() {
        return this._column;
    }

    /**
     * Mutateur de la colonne.
     */
    set column(value) {
        this._column = value;
    }
}





