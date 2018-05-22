import randomArrayResult from './randomArrayResult.js'

export default function getBackdrop(res) {
  // Set Page Backdrop
  const backdrop_base = 'https://image.tmdb.org/t/p/w1280'
  let backdrop = ''
  if(res !== undefined) {
    if(res.length !== 0) {
      let result_length = res.length
      let randBg = randomArrayResult(result_length)
      // If backdrop does not exist, generate new one
      let count = 0
      while(res[randBg].backdrop_path === null) {
        count++
        randBg = randomArrayResult(result_length)
        if(count > result_length) { break }
      }
      backdrop = backdrop_base + res[randBg].backdrop_path
    }
  }
  return backdrop
}
