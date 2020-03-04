import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MosaicTitle extends Component {

    state = {
        startArray: ['#FFFFFF', '#E7E4E4', '#CECACA', '#B4B1B1', '#9A9898', '#808080']
    }

    render() {
        const { schemeArray } = this.props
        const scheme = (schemeArray) ? schemeArray : this.state.startArray
        return (
            <Link to='/aboutus'>                
                <span style={{color: scheme[0]}}className="title">M</span>
                <span style={{color: scheme[1]}}className="title">o</span>
                <span style={{color: scheme[2]}}className="title">s</span>
                <span style={{color: scheme[3]}}className="title">a</span>
                <span style={{color: scheme[4]}}className="title">i</span>
                <span style={{color: scheme[5]}}className="title">c</span>
            </Link>
        )
    }
}
