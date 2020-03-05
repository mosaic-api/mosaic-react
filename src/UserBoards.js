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
            return <div>
                <div className="board-links">
                    <Link to={`/gameboard/${board.id}`}> {board.board_name} </Link>
                    <DeleteOutlineIcon onClick={e => this.handleDelete(board.id)}/> 
                </div>
                <hr />       

            </div>
                
        })
        return (
            <div id="userboards-app">
                
                <MosaicTitle />
                <ul id="userboards-container">
                    {boardNodes}
                </ul>
                <TopDrawer user={this.props.user}/>
            </div>
        )
    }
}

