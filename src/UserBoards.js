import React, { Component } from 'react';
import { getBoards } from './mosaic-api.js';
import { Link } from 'react-router-dom';
import TopDrawer from './TopDrawer.js'

export default class UserBoards extends Component {
    state = {
        boardsArray: [],
    }

    componentDidMount = async () => {
        const boardsData = await getBoards(this.props.user)
        this.setState({boardsArray: boardsData.body})
    }
    render() {
        const boardNodes = this.state.boardsArray.map(board => {
            return <Link to={`/gameboard/${board.id}`}> {board.board_name} </Link>
        })
        return (
            <div id="userboards-app">
                <TopDrawer />
                
                <h1 className="title">Mosaic</h1>
                <ul id="userboards-container">
                    {boardNodes}
                </ul>
                
            </div>
        )
    }
}

