import { FaSearch } from "react-icons/fa"

const SearchBar = () => {
    return (
        <div className="search-container">
            <input type="text" placeholder="Search..." />
            <FaSearch />
        </div>
    )
}

export default SearchBar;