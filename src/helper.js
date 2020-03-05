const maxRows = 6;
const maxColumns = 11;


export function getInitGameState() {
    let gameState = [];

    for (let i = 0; i < maxRows; i++) {
        //make new array for every row in grid array
        gameState.push([]);
        //make null placeholder for each cell in grid
        for (let j = 0; j < maxColumns; j++) {
            gameState[i].push('rgba(128, 128, 128, 0.199)');
        }
    } 
    return gameState
}