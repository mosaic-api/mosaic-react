import React, { Component } from 'react'
import { getInitGameState } from './helper.js';
import { getScheme, getBoards } from './mosaic-api.js';
import BottomDrawer from './BottomDrawer.js';
import { withRouter } from 'react-router-dom';
import TopDrawer from './TopDrawer.js';
import MusicDrawer from './MusicDrawer.js';
import MosaicTitle from './MosaicTitle.js';
import audioStart, { playAudio, stopAudio } from './audio.js';


export default withRouter (class GameBoard extends Component {
    state = { 
        startColor: "#100000", 
        gameboard: getInitGameState(),
        schemeArray: [],
        mode: "analogic-complement",
        id: null,
        playInt: null,
        musicboard: getInitGameState(),
        colorName: null,
        playbackMap: getInitGameState(),
        isPlaying: false
    }

    componentDidMount = async () => {
        const schemeArray = await getScheme(this.props.startColor, this.state.mode)
        this.setState({
            schemeArray: schemeArray,
            gameboard: getInitGameState(), 
            startColor: this.props.startColor,
            musicboard: getInitGameState(),
            colorName: this.props.colorName
        })


        if (this.props.match.params.id) {
            try {
                const userBoards = await getBoards(this.props.user);
                userBoards.body.forEach(userBoard => {
                    if (userBoard.id === Number(this.props.match.params.id)) {
                        const boardParse = JSON.parse(userBoard.game_board);
                        const schemeParse = JSON.parse(userBoard.scheme);
                        const musicParse = JSON.parse(userBoard.music_board);
                        this.setState({ 
                            gameboard: boardParse,
                            schemeArray: schemeParse,
                            id: this.props.match.params.id,
                            musicboard: musicParse,
                            colorName: userBoard.board_name
                        });
                    }
                })
                
            } catch (err) {
                return;
            }
        }
        audioStart();
    }

    handleClick = (e) => {
        const cellId = e.target.id
        if (!cellId.includes('cell')) return;
        
        const idArray = cellId.split('_')[1].split('-');
        const newBoard = this.state.gameboard.slice();
        const newMusic = this.state.musicboard.slice();

        const randomColor = Math.floor(Math.random() * this.state.schemeArray.length)
       
        newBoard[Number(idArray[0])][Number(idArray[1])] = this.state.startColor;
        newMusic[Number(idArray[0])][Number(idArray[1])] = randomColor;
        
        this.setState({
            startColor: this.state.schemeArray[randomColor],
            gameboard: newBoard,
            musicboard: newMusic
        })
        playAudio(randomColor);
    }

    getSaved = (state) => {
        const boardParse = JSON.parse(state.game_board);
        const schemeParse = JSON.parse(state.scheme);
        const musicParse = JSON.parse(state.music_board);
        this.setState({ 
            gameboard: boardParse,
            schemeArray: schemeParse,
            id: state.id,
            musicboard: musicParse
        });
    }

    handleChangeScheme = async (e) =>  {
        const schemeArray = await getScheme(this.state.startColor, e.target.value)
        this.setState({
            schemeArray: schemeArray,
            mode: e.target.value
        })
    }

    handlePlay = () => {
        clearInterval(this.state.playInt);

        let CountArray = [0, 0]    
        const mapOver = this.state.gameboard;
        let blankBoard = getInitGameState();
        this.setState({ 
            gameboard: getInitGameState(),
            playbackMap: mapOver,
            isPlaying: true
        })
        let playTime = setInterval(() => {
            if (!isNaN(this.state.musicboard[CountArray[0]][CountArray[1]])) {
                const savedNote = this.state.musicboard[CountArray[0]][CountArray[1]];
                playAudio(savedNote);
            }
            blankBoard[CountArray[0]][CountArray[1]] = mapOver[CountArray[0]][CountArray[1]];
            this.setState({gameboard: blankBoard})
            if (CountArray[1] < this.state.gameboard[0].length - 1) {
                CountArray[1]++;
            } else if (CountArray[0] < this.state.gameboard.length - 1) {
                CountArray[1] = 0;
                CountArray[0]++;
            } else {
                CountArray = [0, 0];
                this.setState({ isPlaying: false}); 
                clearInterval(this.state.playInt);
            }
        }, 500);
        this.setState({ playInt: playTime});  
    }

    handleStop = () => {
        clearInterval(this.state.playInt)
        this.setState({ 
            gameboard: this.state.playbackMap,
            isPlaying: false
        })
    }

    componentWillUnmount() {
        stopAudio();
        clearInterval(this.state.playInt)
    }

    render() {
       
        const rowNodes = getInitGameState().map((rows, i) => {
            const cellNodes = getInitGameState()[0].map((cell, j) => {
                return <div className="cell" style={{backgroundColor: this.state.gameboard[i][j]}} id={`cell_${i}-${j}`}></div>
            })

            return (<div className="row" id={`row_${i}`}>{cellNodes}</div>)
        })
    
        const background = {backgroundColor: this.props.bgColor}
        return (

            <div style={background} id="gameboard-app">
                <div id="gameboard-parent">
                    
                    <MosaicTitle schemeArray={this.state.schemeArray} />
                    <div id="gameboard-container" onClick= { this.handleClick }>
                        {rowNodes}
                    </div>
                    <div id="preview-container">
                        <div id="tile-preview" style={{backgroundColor: this.state.startColor}}>
                        </div>
                    </div>
                </div>
                <BottomDrawer id={this.state.id} currentMusic={this.state.musicboard} getSaved={this.getSaved} scheme={this.state.schemeArray} history={this.props.history} colorName={this.state.colorName} handleChangeScheme={this.handleChangeScheme} gameState={this.state.gameboard} user={this.props.user}></BottomDrawer>
                <MusicDrawer play={this.handlePlay} stop={this.handleStop} isPlaying={this.state.isPlaying}/>
                <TopDrawer user={this.props.user}/>
                
            </div>
        )
    }
})