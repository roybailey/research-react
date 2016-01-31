import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MainFooter.css';

class MainFooter extends Component {

    render() {
        return (
            <div styleName='main-footer'>
                <span>made with </span>

                <div styleName='heart'></div>
            </div>
        )
    }

    constructor(props) {
        super(props)
    }
}

export default CSSModules(MainFooter, styles, {allowMultiple: true})
