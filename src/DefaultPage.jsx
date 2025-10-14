import { Link } from "react-router"

const DefaultPage =()=>{
    return(
        <div>
            <h1>Default page</h1>
            <Link to="/">
                Click here to go back
            </Link>
        </div>
    )
}

export default DefaultPage;