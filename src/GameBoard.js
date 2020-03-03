import React, { Component } from 'react'
import { getInitGameState } from './helper.js';
import { getScheme } from './mosaic-api.js';
import BottomDrawer from './BottomDrawer.js';


export default class GameBoard extends Component {
    state = { 
        startColor: "#000000", 
        gameboard: getInitGameState(),
        schemeArray: []
    }

    componentDidMount = async () => {
        const schemeArray = await getScheme(this.props.startColor, 'analogic-complement')
        this.setState({
            schemeArray: schemeArray,
            gameboard: getInitGameState(), 
            startColor: this.props.startColor
        })
    }
    handleClick = (e) => {
        const cellId = e.target.id
        if (!cellId.includes('cell')) return;
        
        const idArray = cellId.split('_')[1].split('-');
        const newBoard = this.state.gameboard.slice()
        console.log('initial state', this.state.startColor)
       
        newBoard[Number(idArray[0])][Number(idArray[1])] = this.state.startColor

        const randomColor = Math.floor(Math.random() * this.state.schemeArray.length)
        this.setState({
            startColor: this.state.schemeArray[randomColor],
            gameboard: newBoard
        })
    }

    // handleChangeScheme = (e) =>

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
                <div id="preview-container">
                    <div id="tile-preview" style={{backgroundColor: this.state.startColor}}>

                    </div>
                </div>
                <BottomDrawer></BottomDrawer>
                
            </div>
        )
    }
}
