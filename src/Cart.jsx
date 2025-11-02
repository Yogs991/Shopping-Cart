import NavBar from "./Navbar";
function Cart({cartItems, setCartItems}){

    const increaseQuantity = (id)=>{
        setCartItems((prevItems)=>
            prevItems.map((item)=>
                item.product.id === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    }

    const decreaseQuantity = (id)=>{
        setCartItems((prevItems)=>
            prevItems.map((item)=>
                item.product.id === id ? {...item, quantity: item.quantity - 1} : item
            )
        );
    }

    const multiply = (a, b) => a * b;

    const removeFromCart = (id)=>{
        setCartItems(cartItems.filter((item)=> item.product.id !== id));
    }

    const total = cartItems.reduce((total, item)=> total + item.quantity * item.product.price, 0);

    if (cartItems.length === 0)
    return <a href="shop">Your cart is empty. Click here to go back</a>;

    return(
        <>
            <div className="home-header">
                <h2>TOPShop</h2>
                <NavBar cartItems={cartItems}/>
            </div>
            <div className="cart-container">
                <div className="cart-item-container">
                    <h2>Your Cart</h2>
                    {cartItems.map((item)=>(
                        <div className="cartItem-details">
                            <div key={item.product.id} className="cartItem">
                                <img src={item.product.image} alt={item.product} />
                                <div className="cartItem-content">
                                    <h2>{item.product.title}</h2>
                                    <p>{item.product.price} &#8364;</p>
                                    <p>Cost: ${multiply(item.quantity, item.product.price).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cartItem-buttons">
                                <button className="buttons" onClick={()=>decreaseQuantity(item.product.id)}>-</button>
                                <button className="buttons" onClick={()=>increaseQuantity(item.product.id)}>+</button>
                                <button className="buttons" onClick={()=>removeFromCart(item.product.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="checkout">
                    <h3>Checkout</h3>
                    <p>Total: ${total.toFixed(2)}</p>
                    <button className="buttons">Buy Now</button>
                </div>
            </div>
            </>
    )
}

export default Cart;


