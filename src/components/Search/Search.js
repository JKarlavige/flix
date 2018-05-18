import React from 'react'
import './Search.css'
class Search extends React.Component {
  render() {
    return (
      <fieldset>
        <div className="container">
          <input 
            id='search' 
            type='text'
            className='form-control' 
            name='search'
            placeholder='Enter a movie title'
            value={this.props.value}
            onChange={this.props.onSearchInput}
          />
        </div>
      </fieldset>
    )
  }
}

export default Search