import React from 'react'
import moment from 'moment'
import calcPercent from '../../helpers/calcpercent.js'
import posterNa from '../../images/poster_na.jpg'
import './MovieGrid.css'

class MovieGrid extends React.Component {

  showFullOverview = (e, overview) => {
    e.target.parentElement.textContent = overview
    e.target.remove()
  }

  render() {
    const img_base = 'https://image.tmdb.org/t/p/w500'
    let results = this.props.results
    console.log('RESULTS', results)
    return (
      <section id='movie-section'>
        {results.map((movie) => (
          <div className='movieContainer' key={movie.id}>
            <div className='row'>
              <div className='mcImg col-sm-3'>
                {movie.poster_path === null ?
                  <img src={posterNa} alt={movie.title} />
                :
                  <img src={img_base + movie.poster_path} alt={movie.title} />
                }
              </div>
              <div className='mcInfo col-sm-9'>
                <h2>{movie.title}</h2>
                <p className='movieOverview'>{movie.overview.slice(0,250)}
                {movie.overview.length > 250 && 
                <a id='read-more' href='javascript:void(0)'
                  onClick={(e) => this.showFullOverview(e, movie.overview)}
                > ... Read More</a>}
                </p>
                <ul className='mcFooter'>
                  <li className='release'><strong>Release Date:</strong> {moment(movie.release_date).format('MM/DD/YYYY')}</li>
                  <li className='rating'><strong>Rating:</strong> {calcPercent(movie.vote_average)}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>
    )
  }
}

export default MovieGrid