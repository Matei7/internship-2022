import { Piece } from "./piece";
import { resetHighlightedCells } from "./fn";

export class Board {

	#app;

	#pieces = {};

	constructor() {
		this.#app = document.getElementById( 'app' );
		this.initBoard();
	}

	clearBoard() {
		[ ...document.getElementsByClassName( 'chess-piece' ) ].forEach( piece => piece.remove() );
		resetHighlightedCells()
		this.renderPieces();
	}

	initBoard() {
		const chessTable = document.createElement( 'div' );
		chessTable.classList.add( 'chess-table' );
		this.#app.appendChild( chessTable );

		for ( let i = 0; i < 64; i ++ ) {
			const cell = document.createElement( 'div' );
			cell.classList.add( ...[ 'chess-cell', `chess-row-${Math.floor( i / 8 ) + 1}`, `chess-column-${i % 8 + 1}` ] );
			chessTable.appendChild( cell );
		}

		this.renderPieces();
	}

	renderPieces() {
		const pawns = new Array( 8 ).fill( 'pawn' ),
			firstRowPieces = [ 'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook' ];

		this.insertPieces( firstRowPieces, 'black', 1 );
		this.insertPieces( pawns, 'black', 2 );

		this.insertPieces( firstRowPieces, 'white', 8 );
		this.insertPieces( pawns, 'white', 7 );
	}

	insertPieces( pieces, color, rowIndex ) {
		let insertedIndex = 0;
		const spaces = document.querySelectorAll( `.chess-row-${rowIndex}` );

		while ( insertedIndex < spaces.length ) {
			this.initPiece( spaces[ insertedIndex ], {
				type: pieces[ insertedIndex ],
				columnIndex: insertedIndex + 1,
				rowIndex,
				color
			} );
			insertedIndex ++;
		}
	}

	initPiece( place, pieceInfo ) {
		const piece = document.createElement( 'div' );
		piece.classList.add( ...[ 'chess-piece', `${pieceInfo.color}-${pieceInfo.type}` ] );

		piece.dataset.row = pieceInfo.rowIndex;
		piece.dataset.column = pieceInfo.columnIndex;
		piece.dataset.moved = false;

		this.#pieces[ `${pieceInfo.color}-${pieceInfo.type}-${pieceInfo.columnIndex}` ] = new Piece( piece, pieceInfo.type, pieceInfo.color );

		place.appendChild( piece );
	}
}
