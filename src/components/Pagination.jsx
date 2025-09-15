import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {

    if (totalPages <= 1) return null;

    const pageBtn = (page) => (
        <button
        key={page}
        disabled={page === currentPage}
        onClick={() => onPageChange(page)}
        style={page === currentPage ? { backgroundColor: "rgb(60,86,150)"} : {}}
        >
            {page}
        </button>
    )

    const items = [];

    if (currentPage > 1) {
        items.push(
            <button key="prev" onClick={() => onPageChange(currentPage - 1)}>
                Prev
            </button>
        )
    }

    items.push(pageBtn(1));

    if (currentPage > 3) {
        items.push(<span key="start-dots">...</span>);
    }

    for (
        let i = Math.max(2, currentPage - 2);
            i <= Math.min(totalPages - 1, currentPage + 2);
            i++
        ) {
            items.push(pageBtn(i));
        }

    if (currentPage < totalPages - 2) {
    items.push(<span key="end-dots">…</span>);
  }

  
    if (totalPages > 1) {
        items.push(pageBtn(totalPages));
    }

    if (currentPage < totalPages) {
        items.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)}>
            Next
        </button>
        );
    }

    return (
        <div className="pagination">{items}</div>
    )
}

export default Pagination