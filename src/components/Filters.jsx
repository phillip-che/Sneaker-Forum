const Filters = ({newFilter, popularFilter}) => {
    return (
        <div className="filters-container">
            Filter By: 
            <button className="filter-button" onClick={newFilter} >New</button>
            <button className="filter-button" onClick={popularFilter} >Popular</button>
        </div>
    )
}

export default Filters;