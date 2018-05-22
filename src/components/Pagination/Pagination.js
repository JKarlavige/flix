import React from 'react' 
import './Pagination.css'

class Pagination extends React.Component {
  render() {
    return (
      <div className='pagination-contain'>
        <div id={`pagination-${this.props.curPag}`} className='pagination justify-content-center'>
        {this.props.currentPage > 1 &&
          <li className='page-item'>
            <a 
              className='pagination-btn' 
              href='javascript:void(0)' 
              aria-label='Previous' 
              id='prevBtn'
              onClick={this.props.prevPage}
            >
              <span>&laquo; Prev</span>
            </a>
          </li>
        }
          <li id='pagination-info' className='page-item'>Page {this.props.currentPage} of {this.props.totalPages}</li>
        {this.props.currentPage !== this.props.totalPages && 
          <li className='page-item'>
            <a
              className='pagination-btn' 
              href='javascript:void(0)' 
              aria-label='Next'  
              id='nextBtn'
              onClick={this.props.nextPage}
            >
              <span>Next &raquo;</span>
            </a>
          </li>
        }
        </div>
      </div>
    )
  }
}

export default Pagination