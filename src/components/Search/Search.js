import React from 'react'
import './Search.css'
class Search extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand-lg'>
        <div className='container'>
          <a className='navbar-brand' href='/'><i className='far fa-play-circle'></i>Flix</a>
          <fieldset>
            <div className="container">
              <label className='form-control'>
                <i className='fas fa-search'></i>
                <input 
                  id='search' 
                  type='text'
                  name='search'
                  placeholder='Enter a movie title'
                  value={this.props.value}
                  onChange={this.props.onSearchInput}
                />
              </label>
            </div>
          </fieldset>
        </div>
      </nav>
    )
  }
}

export default Search