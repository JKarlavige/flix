import React from 'react'
import loading from '../../images/loading.gif'

class Loading extends React.Component {
  render() {
    return <img src={loading} style={{display: 'block', margin: '0 auto', width: '75px'}} alt='Loading' />
  }
}

export default Loading