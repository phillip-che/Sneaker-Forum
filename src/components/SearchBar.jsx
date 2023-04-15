import { FaSearch } from "react-icons/fa"

const SearchBar = ({searchItems}) => {
    return (
        <div className="search-container">
            <input 
            onChange={(input) => searchItems(input.target.value)} 
            type="text" 
            placeholder="Search..." 
            />
            <FaSearch />
        </div>
    )
}

export default SearchBar;