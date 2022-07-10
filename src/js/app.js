import '../css/styles.scss';

let app;

const onLoad = () => {
	const counterElement = document.createElement( 'span' ), counterMessageElement = document.createElement( 'span' ), countdownElement = document.createElement( 'div' );
	let counter = 5, updateInterval;

	app = document.getElementById( 'app' );

	counterElement.innerText = counter;
	counterMessageElement.innerText = 'Timer: ';

	countdownElement.appendChild( counterMessageElement );
	countdownElement.appendChild( counterElement );

	countdownElement.classList.add( 'countdown' );
	app.appendChild( countdownElement );

	updateInterval = setInterval( () => {
		if ( counter > 0 ) {
			counterElement.innerHTML = counter;
			counter --;
		} else {
			clearInterval( updateInterval );
			counterElement.innerHTML = 'Gone!';
			initChessTable();
		}
	}, 1000 );
};

function initChessTable() {
	const chessTable = document.createElement( 'div' );
	chessTable.classList.add( 'chess-table' );
	app.appendChild( chessTable );

	for ( let i = 0; i < 64; i ++ ) {
		const cell = document.createElement( 'div' );
		cell.classList.add( ...[ 'chess-cell', `chess-row-${Math.floor( i / 8 ) + 1}` ] );
		chessTable.appendChild( cell );
	}
	initChessPieces();
}

function initChessPieces() {

	const pawns = new Array( 8 ).fill( 'pawn' ),
		firstRowPieces = [ 'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook' ],
		insertPieces = ( pieces, color, rowIndex ) => {
			let insertedIndex = 0,
				insertInterval;

			const spaces = document.querySelectorAll( `.chess-row-${rowIndex}` ),
				insertByIndex = indexToInsert => {
					const space = spaces[ indexToInsert ];
					const piece = document.createElement( 'div' );
					piece.classList.add( ...[ 'chess-piece', `${color}-${pieces[ indexToInsert ]}` ] );
					space.appendChild( piece );
					insertedIndex ++;
				}

			insertByIndex( 0 );

			insertInterval = setInterval( () => {
				if ( insertedIndex < spaces.length ) {
					insertByIndex( insertedIndex );
				} else {
					clearInterval( insertInterval );
				}
			}, 500 );
		};

	insertPieces( firstRowPieces, 'black', 1 );
	setTimeout( () => insertPieces( pawns, 'black', 2 ), 8 * 500 );
	setTimeout( () => insertPieces( pawns, 'white', 7 ), 2 * 8 * 500 );
	setTimeout( () => insertPieces( firstRowPieces, 'white', 7 ), 3 * 8 * 500 );
}

window.addEventListener( 'load', onLoad );
