import { Outlet} from "react-router"
import NavBar from "./Navbar"

function Layout({cartItems}){
    return(
        <div>
            {/* <NavBar cartItems={cartItems}/> */}
            <Outlet cartItems={cartItems}/>
        </div>
    )
}

export default Layout