import {Link} from 'react-router';

function NavBar({cartItems}){
    const itemCount = cartItems?.length || 0;
    return(
        <div className='navbar'>
            <Link to="/" className='nav-btn'>Home</Link>
            <Link to="/shop" className='nav-btn'>Shop</Link>
            <Link to="/cart" className='nav-btn'>Cart {itemCount > 0  && <span>{itemCount}</span>}</Link>
        </div>
    )
}

export default NavBar;