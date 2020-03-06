import React, { Component } from 'react'
import './about.css';
import MosaicTitle from './MosaicTitle.js'; 
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'



export default withRouter (class AboutUs extends Component {
    handleBack = () => this.props.history.push('/gameboard/$$$');

    render() {
        return (
            <div id="containerDiv">
                <div id="upperDiv">
                    <MosaicTitle />
                    <Button onClick={this.handleBack} variant="contained" size="small" color="secondary">Go Play</Button>  
                </div>
                
                <div id="scott">
                    <h2>Scott</h2>
                    <img src='https://mosaicartsupply.com/wp-content/uploads/2016/01/pattern-rooster-colored-6001.jpg' alt='Scott'></img>                    
                    <p>How you Relax: Music</p>
                    <p>Ideal Vacation: New Zealand...land of the hobbits</p>
                </div>
                <div id="chris">
                    <h2>Chris</h2>
                    <img src='https://images-na.ssl-images-amazon.com/images/I/61FahidyQUL.jpg' alt='Chris'></img>                   
                    <p>How you Relax: Death Metal <span role="img" aria-label="rock">🤘</span></p>
                    <p>Ideal Vacation: Nashville, TN</p>
                </div>
                <div id="joe">
                    <h2>Joe</h2>
                    <img src='https://images-na.ssl-images-amazon.com/images/I/611Rs4mypJL._SX258_BO1,204,203,200_.jpg' alt='Joe'></img>                
                    <p>How you Relax: Music...definitely music</p>
                    <p>Ideal Vacation: Maui</p>
                </div>
                <div id="cody">
                    <h2>Cody</h2>
                    <img src='https://i.pinimg.com/originals/a7/ec/c6/a7ecc6a6ed849fc96f9912feccc5539e.jpg' alt='Cody'></img>                   
                    <p>How you Relax: That's my secret </p>
                    <p>Ideal Vacation: New Zealand North and South Island</p>
                </div>

            </div>
        )
    }
})
