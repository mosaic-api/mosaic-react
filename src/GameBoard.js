import React, { Component } from 'react'
import { getInitGameState } from './helper.js';
import { getScheme } from './mosaic-api.js';
import BottomDrawer from './BottomDrawer.js';


export default class GameBoard extends Component {
    state = { 
        startColor: "#100000", 
        gameboard: getInitGameState(),
        schemeArray: [],
        mode: "analogic-complement"
    }

    componentDidMount = async () => {
        const schemeArray = await getScheme(this.props.startColor, this.state.mode)
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
       
        newBoard[Number(idArray[0])][Number(idArray[1])] = this.state.startColor

        const randomColor = Math.floor(Math.random() * this.state.schemeArray.length)
        this.setState({
            startColor: this.state.schemeArray[randomColor],
            gameboard: newBoard
        })
    }

    handleChangeScheme = async (e) =>  {
        const schemeArray = await getScheme(this.state.startColor, e.target.value)
        this.setState({
            schemeArray: schemeArray,
            mode: e.target.value
        })
    }

    render() {
       
        const rowNodes = getInitGameState().map((rows, i) => {
            const cellNodes = getInitGameState()[0].map((cell, j) => {
                return <div className="cell" style={{backgroundColor: this.state.gameboard[i][j]}} id={`cell_${i}-${j}`}></div>
            })

            return (<div className="row" id={`row_${i}`}>{cellNodes}</div>)
        })
     
        return (
            <div id="gameboard-parent">
                <h1 className="title">Mosaic</h1>
                <div id="gameboard-container" onClick= { this.handleClick }>
                    {rowNodes}
                </div>
                <div id="preview-container">
                    <div id="tile-preview" style={{backgroundColor: this.state.startColor}}>

                    </div>
                </div>
                <BottomDrawer handleChangeScheme={this.handleChangeScheme} gameState={this.state.gameboard} user={this.props.user}></BottomDrawer>
                
            </div>
        )
    }
}
