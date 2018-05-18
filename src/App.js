import React, { Component } from 'react'
import Loading from './components/Loading/Loading.js'
import Nav from './components/Nav/Nav.js'
import Pagination from './components/Pagination/Pagination.js'
import Search from './components/Search/Search.js'
import MovieGrid from './components/MovieGrid/MovieGrid.js'
import fetchResults from './helpers/fetch.js'
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
    let current_url = `${baseUrl}/movie/now_playing?api_key=${key}&page=${this.state.currentPage}&language=${this.state.language}&adult=${this.state.adult}`
    return current_url
  }

  // Sets Search URL
  searchUrl = () => {
    let current_url = `${baseUrl}/search/movie?query=${this.state.value}&api_key=${key}&page=${this.state.currentPage}&language=${this.state.language}&adult=${this.state.adult}`
    return current_url
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
        this.startFetch(updatedUrl)
        console.log('PREV PAGE', this.state.currentPage, this.state.urlType, updatedUrl)
      })
    }
  }

  handleNextPage = () => {
    if(this.state.results.total_pages > 1) {
      this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }), () => {
        let updatedUrl = ''
        this.state.urlType === ('nowPlaying') ? updatedUrl = this.nowPlayingUrl() : updatedUrl = this.searchUrl()
        console.log('NEXT PAGE', this.state.currentPage, this.state.urlType, updatedUrl)
        this.startFetch(updatedUrl)
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
        this.startFetch(this.nowPlayingUrl())
      })
    : this.setState({ 
        value: e.target.value,
        urlType: 'search',
        currentPage: 1,
      }, () => {
        this.startFetch(this.searchUrl())
        console.log('SEARCHED', this.searchUrl())
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
    return (
      <div id='flix-body'>
        <Nav />
        <Search 
          value={this.state.value}
          onSearchInput={this.handleInput}
        />
        {this.state.loading === true
          ? <Loading />
          :
          <div className='container'>
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              prevPage={this.handlePrevPage}
              nextPage={this.handleNextPage}
            />
            <MovieGrid 
              results={this.state.results}
            />
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              prevPage={this.handlePrevPage}
              nextPage={this.handleNextPage}
            />
          </div>
        }
      </div>
    )
  }
}

export default App;
