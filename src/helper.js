const maxRows = 5;
const maxColumns = 5;


export function getInitGameState() {
    let gameState = [];

    for (let i = 0; i < maxRows; i++) {
        //make new array for every row in grid array
        gameState.push([]);
        //make null placeholder for each cell in grid
        for (let j = 0; j < maxColumns; j++) {
            gameState[i].push('#FFFFFF');
        }
    } 
    return gameState
}