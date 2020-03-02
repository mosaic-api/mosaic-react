import React, { Component } from 'react'
import { getInitGameState } from './helper.js';


export default class GameBoard extends Component {
    state = { gameboard: getInitGameState()}

    componentDidMount = () => {
        this.setState({gameboard: getInitGameState()})
    }
    render() {
        console.log('gameboard', this.state.gameboard)
        
        const rowNodes = getInitGameState().map((rows, i) => {
            const cellNodes = getInitGameState()[0].map((cell, j) => {
                return <div className="cell" id={`cell_${i}-${j}`}></div>
            })

            return (<div className="row" id={`row_${i}`}>{cellNodes}</div>)
        })
        console.log(rowNodes)
        return (
            <div>
                <h2 className="title">Mosaic</h2>
                <div id="gameboard-container">
                    {rowNodes}
                </div>
                <div id="tile-preview">preview</div>
                <div> back button</div>
                <div>bottom drawer</div>
                
            </div>
        )
    }
}
