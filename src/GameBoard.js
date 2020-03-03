import React, { Component } from 'react'
import { getInitGameState } from './helper.js';
import { getScheme } from './mosaic-api.js';


export default class GameBoard extends Component {
    state = { 
        startColor: "#000000", 
        gameboard: getInitGameState(),
        schemeArray: []
    }

    componentDidMount = async () => {
        const schemeArray = await getScheme(this.state.startColor)
        this.setState({
            schemeArray: schemeArray,
            gameboard: getInitGameState(), 
            startColor: this.props.startColor
        })
        console.log('look', this.props.startColor)
        console.log('lookyloo', schemeArray)
    }
    handleClick = (e) => {
        const cellId = e.target.id
        const idArray = cellId.split('_')[1].split('-');
        console.log(cellId)
        const newBoard = this.state.gameboard.slice()
       
        newBoard[Number(idArray[0])][Number(idArray[1])] = this.state.startColor

        const randomColor = Math.floor(Math.random() * this.state.schemeArray.length)
        this.setState({
            startColor: this.state.schemeArray[randomColor],
            gameboard: newBoard
        })
    }

    render() {
        console.log('gameboard', this.state.gameboard)
        
        const rowNodes = getInitGameState().map((rows, i) => {
            const cellNodes = getInitGameState()[0].map((cell, j) => {
                return <div className="cell" style={{backgroundColor: this.state.gameboard[i][j]}} id={`cell_${i}-${j}`}></div>
            })

            return (<div className="row" id={`row_${i}`}>{cellNodes}</div>)
        })
        console.log(rowNodes)
        return (
            <div>
                <h2 className="title">Mosaic</h2>
                <div id="gameboard-container" onClick= { this.handleClick }>
                    {rowNodes}
                </div>
                <div id="tile-preview">preview</div>
                <div> back button</div>
                <div>bottom drawer</div>
                
            </div>
        )
    }
}
