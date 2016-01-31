import React from 'react'
import { Link } from 'react-router'
import styles from './MainHeader.css'

function MainHeader() {
    return (
        <header>
            <div className={styles['main-header']}>

                <Link className={styles.dark} to="/">Home </Link>
                <Link className={styles.light} to="/packages">Packages </Link>

                <div className={styles.wrapper}>
                    <div className={styles.react}>
                        <div className={styles.inner}></div>
                        <div className={styles.innerdot}></div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default MainHeader
