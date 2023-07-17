import React from 'react'
import './Pagination.css'

function Pagination(props: { page: number, setPage: any, total: number }) {

    const page: number = props.page

    const total: number = props.total

    return (
        <div className="pagination">
            <button className="btn btn-primary"
                disabled={page === 1}
                onClick={() => props.setPage((prevState: number) => prevState - 1)}
            >
                Prev
            </button>
            <p className="page-num">{page.toString()}</p>
            <button className="btn btn-primary"
                onClick={() => props.setPage((prevState: number) => prevState + 1)}
                disabled={Math.ceil(total / 12) <= page}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination