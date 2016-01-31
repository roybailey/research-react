import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/MainFooter'

function App({ pushPath, children }) {
  return (
    <div>

      <MainHeader />

      <main>      
        {children}
      </main>

      <MainFooter />

    </div>

  );
}

module.exports = connect(null)(App);
