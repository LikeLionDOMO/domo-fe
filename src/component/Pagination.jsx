import ReactPaginate from 'react-paginate';
import './styles/pagination.css';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      forcePage={currentPage}
    />
  );
};

export default Pagination;