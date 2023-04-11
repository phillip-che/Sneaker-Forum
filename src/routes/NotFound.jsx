import { Link } from "react-router-dom"

const NotFound = () => {
    return(
        <div>
            <h1>PAGE NOT FOUND</h1>
            <Link to="/">
                RETURN HOME
            </Link>
        </div>
    )
}

export default NotFound