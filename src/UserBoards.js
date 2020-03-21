import React, { Component } from 'react';
import { getBoards, deleteBoard } from './mosaic-api.js';
import { Link } from 'react-router-dom';
import TopDrawer from './TopDrawer.js';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MosaicTitle from './MosaicTitle.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class UserBoards extends Component {
    state = {
        boardsArray: [],
        loading: false
    }

    componentDidMount = async () => {
        try {
            const boardsData = await getBoards(this.props.user)
            this.setState({boardsArray: boardsData.body})
        } catch (err) { alert(err)}
    }

    switchLoadingState() {
        this.setState({ loading: !this.state.loading})
    } 

    handleDelete = async (id) => {
        this.switchLoadingState();
        try {
            await deleteBoard(id, this.props.user)
            const boardsData = await getBoards(this.props.user)
            this.setState({boardsArray: boardsData.body})
            this.switchLoadingState();
        } catch (err) {alert(err)}
    }

    render() {
        const boardNodes = this.state.boardsArray.map(board => {
            return <div key={Math.random() + board.board_name}>
                <div className="board-links">
                    <Link to={`/gameboard/${board.id}`}> {board.board_name} </Link>
                    {(this.state.loading) ? <CircularProgress size={20}/> : <DeleteOutlineIcon onClick={e => this.handleDelete(board.id)}/> }
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

