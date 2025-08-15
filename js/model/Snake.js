/* Aydouni Chadi - 43729 - B111 */

/**
 * Head correspond à la position de la tête du serpent sur le plateau de jeu.
 * Direction correspond à un déplacement vers une position.
 * Tail correspond à un tableau de positions représentant le reste du corps du serpent.
 */
class Snake {

    constructor(head, direction) {
        this._head = head;
        this._direction = direction;
        this._tail = [];

        // Permet de changer la taille de départ du serpent.
        let startingSize = 1;
        for (let i = 0; i < startingSize; i++) {
            this._tail.push(new Position());
        }
    }

    /**
     * Accesseur de la tête.
     */
    get head() {
        return this._head;
    }

    /**
     * Accesseur de la direction.
     */
    get direction() {
        return this._direction;
    }

    /**
     * Accesseur du corps.
     */
    get tail() {
        return this._tail;
    }

    /**
     * Mutateur de la direction.
     */
    set direction(value) {
        this._direction = value;
    }

    /**
     *  Permet de déplacer le serpent d'une case en fonction de sa direction.
     */
    move() {

        /* Pour pouvoir facilement avancer le serpent : 
            1) on ajoute la position actuelle de la tête à la queue du serpent
            2) on efface le dernier élément de la queue du serpent
            3) on déplace la tête du serpent
        
            Après le tout premier mouvement de la tête, la queue va se créer, en prenant
            la position de l'ancienne tête.

            Si on souhaite que la queue soit crée dès le départ, il faudra utiliser 
            nextPosition(this._head,posOpposéeACelleDeDepart) dans le constructeur.

            De plus, le booléen grows permet d'indiquer si le serpent doit grandir.
            Si ce booléen est sur vrai, alors on ne supprimera pas le dernier élément de la queue.
        */

        this._tail.unshift(this._head);
        if (!grows) {
            this._tail.pop()
        }
        this._head = this.nextPosition(this._head, this._direction);
        grows = false;
        moveRegistered = false;
    }

    /**
     * Donne une nouvelle position dans la direction indiquée.
     * Si elle dépasse un bord, elle est adaptée pour devenir la position opposée sur le plateau.
     * @param {*} startPos la position de départ.
     * @param {*} direction la direction souhaitée.
     */
    nextPosition(startPos, direction) {
        let nextPosition = new Position(startPos.row + direction.row, startPos.column + direction.column);

        // Cas où l'on arrive à gauche
        if (nextPosition.column < 0) {
            nextPosition.column = nbColumns - 1;
        }

        // Cas où l'on arrive à droite
        if (nextPosition.column > nbColumns - 1) {
            nextPosition.column = 0;
        }

        // Cas où l'on arrive en haut
        if (nextPosition.row < 0) {
            nextPosition.row = nbRows - 1;
        }

        // Cas où l'on arrive en bas
        if (nextPosition.row > nbRows - 1) {
            nextPosition.row = 0;
        }

        return nextPosition;
    }

}






