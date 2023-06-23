import React from 'react'

function Pagination(props: { page: Number, setPage: any }) {

    const page: Number = props.page

    return (
        <div className="pagination">
            <button className="btn btn-primary"
                disabled={page === 1}
                onClick={() => props.setPage((prevState: number) => prevState - 1)}
            >
                Prev
            </button>
            <p className="page-num">{page.toString()}</p>
            <button className="btn btn-primary" onClick={() => props.setPage((prevState: number) => prevState + 1)}>
                Next
            </button>
        </div>
    )
}

export default Pagination