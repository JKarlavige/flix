/* Components */
import React, { Component } from 'react'
import Search from './components/Search/Search.js'
import Loading from './components/Loading/Loading.js'
import Pagination from './components/Pagination/Pagination.js'
import MovieGrid from './components/MovieGrid/MovieGrid.js'

/** Helpers **/
import fetchResults from './helpers/fetch.js'
import randomArrayResult from './helpers/randomArrayResult.js'

/** CSS */
import './App.css'

const key = '2b959834e7001c1f5d9094b58fcb7e48'
const baseUrl = 'https://api.themoviedb.org/3'

class App extends Component {
  state = {
    results: [],
    currentPage: 1,
    language: 'en',
    adult: false,
    loading: true,
    value: '',
    urlType: 'nowPlaying',
  }

  // Sets Now Playing URL
  nowPlayingUrl = () => {
    return `${baseUrl}/movie/now_playing?api_key=${key}&page=${this.state.currentPage}&language=${this.state.language}&adult=${this.state.adult}`
  }

  // Sets Search URL
  searchUrl = () => {
    return `${baseUrl}/search/movie?query=${this.state.value}&api_key=${key}&page=${this.state.currentPage}&language=${this.state.language}&adult=${this.state.adult}`
  }

  // Runs Now Playing URL on mount
  componentDidMount() {
    let now_playing = this.nowPlayingUrl()
    this.startFetch(now_playing)
    console.log('MOUNTED', now_playing)
  }

  handlePrevPage = () => {
    if(this.state.currentPage !== 1) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }), () => {
        let updatedUrl = ''
        this.state.urlType === ('nowPlaying') ? updatedUrl = this.nowPlayingUrl() : updatedUrl = this.searchUrl()
        window.scrollTo(0,0)
        fetchResults(updatedUrl).then(results => { 
          this.setState({
            loading: false,
            results: results,
          })
        })
      })
    }
  }

  handleNextPage = () => {
    if(this.state.results.total_pages > 1) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }), () => {
        let updatedUrl = ''
        this.state.urlType === ('nowPlaying') ? updatedUrl = this.nowPlayingUrl() : updatedUrl = this.searchUrl()
        window.scrollTo(0,0)
        fetchResults(updatedUrl).then(results => { 
          this.setState({
            loading: false,
            results: results,
          })
        })
      })
    }
  }

  handleInput = (e) => {
    (e.target.value === '') ?
      this.setState({ 
        value: '',
        urlType: 'nowPlaying',
        currentPage: 1,
      }, () => {
        fetchResults(this.nowPlayingUrl()).then(results => { 
          this.setState({
            loading: false,
            results: results,
          })
        })
      })
    : this.setState({ 
        value: e.target.value,
        urlType: 'search',
        currentPage: 1,
      }, () => {
        fetchResults(this.searchUrl()).then(results => { 
          this.setState({
            loading: false,
            results: results,
          })
        })
      })
  }

  startFetch(url) {
    this.setState({
      loading: true
    })
    fetchResults(url).then(results => { 
      this.setState({
        loading: false,
        results: results,
      })
    })
  }

  render() {
    let totalPages = this.state.results.total_pages
    let currentPage = this.state.results.page
    let resResults =this.state.results.results

    // Set Page Backdrop
    const backdrop_base = 'https://image.tmdb.org/t/p/w1280'
    let backdrop = ''

    // Wait for response to populate
    if(resResults !== undefined) {
      if(resResults.length !== 0) {
        let result_length = resResults.length
        let randBg = randomArrayResult(result_length)
        // If backdrop does not exist, generate new one
        let count = 0
        while(resResults[randBg].backdrop_path === null) {
          count++
          randBg = randomArrayResult(result_length)
          if(count > result_length) { break }
        }
        backdrop = resResults[randBg].backdrop_path
      }
    }
    
    // Flix-body background style
    let flixBody = {
      backgroundImage: `url(${backdrop_base + backdrop}`,
      color: '#000',
    }

    return (
      <div id='flix-body' style={flixBody}>
        <Search 
          value={this.state.value}
          onSearchInput={this.handleInput}
        />
        {this.state.loading === true
          ? <Loading />
          :
          <div className='container'>
            {resResults.length === 0 ?
              <h1>No Results Found</h1>
            :
              <h1>
                {this.state.urlType === 'nowPlaying' ?
                  'Now Playing'
                : this.state.value
                }
              </h1>
            }
            {resResults.length !== 0 &&
              <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                prevPage={this.handlePrevPage}
                nextPage={this.handleNextPage}
                curPag={1}
              />
            }
            <MovieGrid 
              results={resResults}
              type={this.state.urlType}
              searchVal={this.state.value}
            />
            {resResults.length !== 0 &&
              <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                prevPage={this.handlePrevPage}
                nextPage={this.handleNextPage}
                curPag={2}
              />
            }
          </div>
        }
      </div>
    )
  }
}

export default App;