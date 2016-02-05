import React from 'react'
import { Link } from 'react-router'
import styles from './MainHeader.css'
import MainMenu from './MainMenu'

function MainHeader() {
    return (
        <header>
            <div classNameOff={styles['main-header']}>
                <MainMenu/>
            </div>
        </header>
    )
}

export default MainHeader
