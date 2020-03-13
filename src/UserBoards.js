import React, { Component } from 'react';
import { getBoards, deleteBoard } from './mosaic-api.js';
import { Link } from 'react-router-dom';
import TopDrawer from './TopDrawer.js';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MosaicTitle from './MosaicTitle.js';

export default class UserBoards extends Component {
    state = {
        boardsArray: [],
    }

    componentDidMount = async () => {
        const boardsData = await getBoards(this.props.user)
        this.setState({boardsArray: boardsData.body})
    }

    handleDelete = async (id) => {
        await deleteBoard(id, this.props.user)
        const boardsData = await getBoards(this.props.user)
        this.setState({boardsArray: boardsData.body})
    }

    render() {
        const boardNodes = this.state.boardsArray.map(board => {
            return <div key={Math.random() + board.board_name}>
                <div className="board-links">
                    <Link to={`/gameboard/${board.id}`}> {board.board_name} </Link>
                    <DeleteOutlineIcon onClick={e => this.handleDelete(board.id)}/> 
                </div>
                <hr />       
            </div>
                
        })
        const background = {backgroundColor: this.props.bgColor}
        return (
            <div style={background} id="userboards-app">
                
                <MosaicTitle />
                <div id="userboards-container">
                    {boardNodes}
                </div>
                <TopDrawer user={this.props.user} setAppState={this.props.setAppState} />
            </div>
        )
    }
}

