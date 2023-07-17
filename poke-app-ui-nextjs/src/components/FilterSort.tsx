import styles from './FilterSort.module.css'

function FilterSort(props: {setSearchString: any, setSortField: any, setPage: any}) {

    const handleFilterChange = (event: any) => {
        props.setSearchString(event.target.value)
        props.setPage(1)
    };

    const handleSortFieldChange = (event: any) => {
        props.setSortField(event.target.value)
        props.setPage(1)
    };

    return (
        <div className={styles.filterSortContainer}>
                <div className="row g-3 align-items-center filter-area">
                    <div className="col-auto">
                        <label htmlFor="nameFilter" className="col-form-label">Filter by name:</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" name="searchString" className="form-control" onChange={handleFilterChange} />
                    </div>
                </div>
                <div className="row g-3 align-items-center filter-area">
                    <div className="col-auto">
                        <label htmlFor="nameFilter" className="col-form-label">Sort by</label>
                    </div>
                    <div className="col-auto">
                        <select className="form-select" name="sortField" defaultValue={"name_asc"} onChange={handleSortFieldChange}>
                            <option value="name_asc">Name (Ascending)</option>
                            <option value="name_desc">Name (Descending)</option>
                            <option value="type_asc">Type (Ascending)</option>
                            <option value="type_desc">Type (Descending)</option>
                        </select>
                    </div>
                </div>
            </div>
    )

}

export default FilterSort