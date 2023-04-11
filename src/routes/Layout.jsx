import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar"

const Layout = () => {
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout