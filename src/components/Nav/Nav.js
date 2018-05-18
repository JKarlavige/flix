import React from 'react'
import './Nav.css'

class Nav extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg'>
        <div className='container'>
          <a className='navbar-brand' href='/'>Flix</a>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='.navbar-collapse' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span>Menu</span>
          </button>
          <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li className='nav-item'>
                  <a className='nav-link' href='/'>Movies</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav;