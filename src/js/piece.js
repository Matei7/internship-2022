import { resetHighlightedCells, isCellOccupied } from "./fn";

export class Piece {
	constructor( element, type, color ) {
		this.type = type;
		this.color = color;
		this.element = element;
		this.rowIndex = parseInt( this.element.dataset.row );
		this.columnIndex = parseInt( this.element.dataset.column );

		this.bindEvents();
	}

	bindEvents() {
		this.element.addEventListener( 'click', () => {
			resetHighlightedCells()
			this.highlightMoves();
		} );
	}

	highlightMoves() {
		const moves = this.getMoves();

		moves.forEach( move => {
			if ( move.rowIndex && move.columnIndex && move.rowIndex <= 8 && move.columnIndex <= 8 ) {
				const cell = document.querySelector( `.chess-row-${move.rowIndex}.chess-column-${move.columnIndex}` );
				cell.classList.add( 'highlighted' );
			}
		} );
	}

	getMoves() {
		switch ( this.type ) {
			case 'pawn':
				return this.getPawnMoves();
			case 'rook':
				return this.getRookMoves();
			case 'knight':
				return this.getKnightMoves();
			case 'bishop':
				return this.getBishopMoves();
			case 'queen':
				return this.getQueenMoves();
			case 'king':
				return this.getKingMoves();
		}
	}

	getQueenMoves() {
		return this.getBishopMoves().concat( this.getRookMoves() );
	}

	getBishopMoves() {
		const moves = [];
		let rowIndex = this.rowIndex;
		let columnIndex = this.columnIndex;
		while ( rowIndex > 1 && columnIndex > 1 ) {
			rowIndex --;
			columnIndex --;
			if ( ! isCellOccupied( rowIndex, columnIndex ) ) {
				moves.push( {rowIndex, columnIndex} );
			} else {
				break;
			}
		}
		rowIndex = this.rowIndex;
		columnIndex = this.columnIndex;
		while ( rowIndex < 8 && columnIndex < 8 ) {
			rowIndex ++;
			columnIndex ++;
			if ( ! isCellOccupied( rowIndex, columnIndex ) ) {
				moves.push( {rowIndex, columnIndex} );
			} else {
				break;
			}
		}
		rowIndex = this.rowIndex;
		columnIndex = this.columnIndex;
		while ( rowIndex > 1 && columnIndex < 8 ) {
			rowIndex --;
			columnIndex ++;
			if ( ! isCellOccupied( rowIndex, columnIndex ) ) {
				moves.push( {rowIndex, columnIndex} );
			} else {
				break;
			}
		}
		rowIndex = this.rowIndex;
		columnIndex = this.columnIndex;
		while ( rowIndex < 8 && columnIndex > 1 ) {
			rowIndex ++;
			columnIndex --;
			if ( ! isCellOccupied( rowIndex, columnIndex ) ) {
				moves.push( {rowIndex, columnIndex} );
			} else {
				break;
			}
		}
		return moves;
	}

	getKingMoves() {
		const moves = [];
		if ( this.rowIndex > 1 ) {
			if ( ! isCellOccupied( this.rowIndex - 1, this.columnIndex ) ) {
				moves.push( {rowIndex: this.rowIndex - 1, columnIndex: this.columnIndex} );
			}
			if ( this.columnIndex > 1 && ! isCellOccupied( this.rowIndex - 1, this.columnIndex - 1 ) ) {
				moves.push( {rowIndex: this.rowIndex - 1, columnIndex: this.columnIndex - 1} );
			}
			if ( this.columnIndex < 8 && ! isCellOccupied( this.rowIndex - 1, this.columnIndex + 1 ) ) {
				moves.push( {rowIndex: this.rowIndex - 1, columnIndex: this.columnIndex + 1} );
			}
		}
		if ( this.rowIndex < 8 ) {
			if ( ! isCellOccupied( this.rowIndex + 1, this.columnIndex ) ) {
				moves.push( {rowIndex: this.rowIndex + 1, columnIndex: this.columnIndex} );
			}
			if ( this.columnIndex > 1 && ! isCellOccupied( this.rowIndex + 1, this.columnIndex - 1 ) ) {
				moves.push( {rowIndex: this.rowIndex + 1, columnIndex: this.columnIndex - 1} );
			}
			if ( this.columnIndex < 8 && ! isCellOccupied( this.rowIndex + 1, this.columnIndex + 1 ) ) {
				moves.push( {rowIndex: this.rowIndex + 1, columnIndex: this.columnIndex + 1} );
			}
		}
		if ( this.columnIndex > 1 && ! isCellOccupied( this.rowIndex, this.columnIndex - 1 ) ) {
			moves.push( {rowIndex: this.rowIndex, columnIndex: this.columnIndex - 1} );
		}
		if ( this.columnIndex < 8 && ! isCellOccupied( this.rowIndex, this.columnIndex + 1 ) ) {
			moves.push( {rowIndex: this.rowIndex, columnIndex: this.columnIndex + 1} );
		}
		return moves;
	}


	getKnightMoves() {
		const moves = [];
		if ( this.rowIndex > 1 && this.columnIndex > 1 ) {
			if ( ! isCellOccupied( this.rowIndex - 2, this.columnIndex - 1 ) ) {
				moves.push( {rowIndex: this.rowIndex - 2, columnIndex: this.columnIndex - 1} );
			}
			if ( ! isCellOccupied( this.rowIndex - 1, this.columnIndex - 2 ) ) {
				moves.push( {rowIndex: this.rowIndex - 1, columnIndex: this.columnIndex - 2} );
			}
		}

		if ( this.rowIndex < 8 && this.columnIndex > 1 ) {
			if ( ! isCellOccupied( this.rowIndex + 2, this.columnIndex - 1 ) ) {
				moves.push( {rowIndex: this.rowIndex + 1, columnIndex: this.columnIndex - 2} );
			}
			if ( ! isCellOccupied( this.rowIndex + 1, this.columnIndex - 2 ) ) {
				moves.push( {rowIndex: this.rowIndex + 2, columnIndex: this.columnIndex - 1} );
			}
		}

		if ( this.rowIndex > 1 && this.columnIndex < 8 ) {
			if ( ! isCellOccupied( this.rowIndex - 2, this.columnIndex + 1 ) ) {
				moves.push( {rowIndex: this.rowIndex - 2, columnIndex: this.columnIndex + 1} );
			}
			if ( ! isCellOccupied( this.rowIndex - 1, this.columnIndex + 2 ) ) {
				moves.push( {rowIndex: this.rowIndex - 1, columnIndex: this.columnIndex + 2} );
			}
		}

		if ( this.rowIndex < 8 && this.columnIndex < 8 ) {
			if ( ! isCellOccupied( this.rowIndex + 2, this.columnIndex + 1 ) ) {
				moves.push( {rowIndex: this.rowIndex + 1, columnIndex: this.columnIndex + 2} );
			}
			if ( ! isCellOccupied( this.rowIndex + 1, this.columnIndex + 2 ) ) {
				moves.push( {rowIndex: this.rowIndex + 2, columnIndex: this.columnIndex + 1} );
			}
		}
		return moves;
	}

	getRookMoves() {
		const moves = [];

		for ( let i = this.rowIndex + 1; i < 8; i ++ ) {
			if ( isCellOccupied( i, this.columnIndex ) ) {
				break;
			}
			moves.push( {rowIndex: i, columnIndex: this.columnIndex} );
		}
		for ( let i = this.rowIndex - 1; i > 0; i -- ) {
			if ( isCellOccupied( i, this.columnIndex ) ) {
				break;
			}
			moves.push( {rowIndex: i, columnIndex: this.columnIndex} );
		}
		for ( let i = this.columnIndex + 1; i < 8; i ++ ) {

			if ( isCellOccupied( this.rowIndex, i ) ) {
				break;
			}
			moves.push( {rowIndex: this.rowIndex, columnIndex: i} );
		}
		for ( let i = this.columnIndex - 1; i > 0; i -- ) {
			if ( isCellOccupied( this.rowIndex, i ) ) {
				break;
			}
			moves.push( {rowIndex: this.rowIndex, columnIndex: i} );
		}
		return moves;
	}

	getPawnMoves() {
		const moves = [];

		if ( this.color === 'black' ) {
			if ( this.rowIndex < 8 ) {
				moves.push( {rowIndex: this.rowIndex + 1, columnIndex: this.columnIndex} );
				if ( this.rowIndex === 2 ) {
					moves.push( {rowIndex: this.rowIndex + 2, columnIndex: this.columnIndex} );
				}
			}
		} else {
			if ( this.rowIndex > 1 ) {
				moves.push( {rowIndex: this.rowIndex - 1, columnIndex: this.columnIndex} );
				if ( this.rowIndex === 7 ) {
					moves.push( {rowIndex: this.rowIndex - 2, columnIndex: this.columnIndex} );
				}
			}
		}

		return moves;
	}
}
