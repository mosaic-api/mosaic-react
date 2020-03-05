import React, { Component } from 'react'
import './about.css';
import MosaicTitle from './MosaicTitle.js'; 
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'



export default withRouter (class AboutUs extends Component {
    handleBack = () => this.props.history.goBack();

    render() {
        return (
            <div id="containerDiv">
                <div id="upperDiv">
                    <MosaicTitle />
                    <Button onClick={this.handleBack} variant="contained" size="small" color="secondary">Back...no really, it takes you back</Button>  
                </div>
                
                <div id="scott">
                    <h2>Scott</h2>
                    <img src='Scott.png' alt='Scott'></img>                    
                    <p>How you Relax: Music</p>
                    <p>Ideal Vacation: New Zealand...land of the hobbits</p>
                </div>
                <div id="chris">
                    <h2>Chris</h2>
                    <img src='Chris.png' alt='Chris'></img>                   
                    <p>How you Relax: Death Metal <span role="img" aria-label="rock">🤘</span></p>
                    <p>Ideal Vacation: Nashville, TN</p>
                </div>
                <div id="joe">
                    <h2>Joe</h2>
                    <img src='Joe.png' alt='Joe'></img>                
                    <p>How you Relax: Music...definitely music</p>
                    <p>Ideal Vacation: Maui</p>
                </div>
                <div id="cody">
                    <h2>Cody</h2>
                    <img src='Cody.png' alt='Cody'></img>                   
                    <p>How you Relax: That's my secret </p>
                    <p>Ideal Vacation: New Zealand North and South Island</p>
                </div>

            </div>
        )
    }
})
