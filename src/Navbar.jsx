import {Link} from 'react-router';

const NavBar = ()=>{
    return(
        <div className='navbar'>
            <Link to="/" className='nav-btn'>Home</Link>
            <Link to="/shop" className='nav-btn'>Shop</Link>
            <Link to="/cart" className='nav-btn'>Cart</Link>
        </div>
    )
}

export default NavBar;