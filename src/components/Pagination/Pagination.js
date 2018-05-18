import React from 'react' 
import './Pagination.css'

class Pagination extends React.Component {
  render() {
    return (
      <div id='pagination-contain'>
        <div id='pagination' className='pagination justify-content-center'>
          <li className={this.props.currentPage > 1 ? 'page-item' : 'page-item disabled'}>
            <a 
              className='page-link' 
              href='javascript:void(0)' 
              aria-label='Previous' 
              id='prevBtn'
              onClick={this.props.prevPage}
            >
              <span aria-hidden='true'>&laquo;</span>
              <span>Prev</span>
            </a>
          </li>
          <li className={this.props.currentPage !== this.props.totalPages ? 'page-item' : 'page-item disabled'}>
            <a 
              className='page-link' 
              href='javascript:void(0)' 
              aria-label='Next'  
              id='nextBtn'
              onClick={this.props.nextPage}
            >
              <span>Next</span>
              <span aria-hidden='true'>&raquo;</span>
            </a>
          </li>
        </div>
        <div id='pagination-info'>
          <p>Page {this.props.currentPage} of {this.props.totalPages}</p>
        </div>
      </div>
    )
  }
}

export default Pagination