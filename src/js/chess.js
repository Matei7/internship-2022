import { Board } from "./board";

export class Chess {
	constructor() {
		this.board = new Board();

		this.bindEvents();
	}

	bindEvents() {
		document.getElementById( 'new-game' ).addEventListener( 'click', () => {
			this.board.clearBoard();
		} );
	}
}
