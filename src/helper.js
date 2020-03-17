const maxRows = 6;
const maxColumns = 11;

// seems like these two function could have been merged into one with some params, since they're so similar
export function getGameState(isGame) {
    const evenRgb = isGame ? 'rgba(140, 140, 140, 0.2)' : 'rgba(0, 0, 0, 0)';
    const oddRgb = isGame ? 'rgba(120, 120, 120, 0.2)' : 'rgba(0, 0, 0, 0)';

    let gameState = [];

    for (let i = 0; i < maxRows; i++) {
        //make new array for every row in grid array
        gameState.push([]);
        //make null placeholder for each cell in grid
        for (let j = 0; j < maxColumns; j++) {
            if (j % 2 === 0) {
                gameState[i].push(evenRgb);
            } else {
                gameState[i].push(oddRgb)
            }
        }
    } 
    return gameState
}