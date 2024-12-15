import React from "react";
import ReactPaginate from "react-paginate";

const PaginationComponent = ({ getPage }) => {
  const handlePageClick = (data) => {
    // console.log("data.selected=", data.selected + 1);
    getPage(data.selected + 1);
  };

  const pageCount = 500;
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="التالي"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="السابق"
      renderOnZeroPageCount={null}
      // ---------------------------------------------------------
      containerClassName="pagination justify-content-center p-3"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      // --------------------------
      previousClassName="page-item"
      previousLinkClassName="page-link"
      // --------------------------
      nextClassName="page-item"
      nextLinkClassName="page-link"
      // --------------------------
      breakClassName="page-item"
      breakLinkClassName="page-link"
      // --------------------------
      activeClassName="active"
    />
  );
};

export default PaginationComponent;
