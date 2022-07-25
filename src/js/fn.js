export function resetHighlightedCells() {
	[ ...document.getElementsByClassName( 'highlighted' ) ].forEach( piece => piece.classList.remove( 'highlighted' ) );
}

export function isCellOccupied( rowIndex, columnIndex ) {
	return rowIndex && columnIndex && rowIndex <= 8 && columnIndex <= 8 && document.querySelector( `.chess-row-${rowIndex}.chess-column-${columnIndex}` ).childNodes.length > 0;
}
