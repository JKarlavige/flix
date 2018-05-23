import React from 'react'
/* Images */
import logo from '../../images/logo.svg';
import jkLogo from '../../images/jk_light.svg';
/* CSS */
import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='container'>
          <div className='footer-credit footer-credit-left'>
            <p>API By: <a href='https://www.themoviedb.org/?language=en' target='_blank'>TMDb</a></p>
            <p id='footer-react'>Made with React <img src={logo} id="react-logo" alt="logo" /></p>
          </div>
          <div className='footer-credit-center'>
            <a className='footer-brand' href='/'><i className='far fa-play-circle'></i>Flix</a>
          </div>
          <div className='footer-credit footer-credit-right'>
            <p>Created By</p>
            <a href='http://jasonkarlavige.com' id='footer-developer' target='_blank'><img src={jkLogo} id="jk-logo" alt="Jason Karlavige"/></a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer