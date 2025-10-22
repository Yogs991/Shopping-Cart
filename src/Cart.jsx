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

    if (cartItems.length === 0)
    return <p className="empty-cart">Your cart is empty </p>;

    return(
        <>
        {/* <div className="home-header">
            <h2>TOPShop</h2>
            <NavBar />
        </div> */}
            <div className="cart-container">
                {cartItems.map((item)=>(
                    <div>
                        <div key={item.product.id} className="cartItem">
                            <img src={item.product.image} alt={item.product} />
                            <div className="cartItem-details">
                                <h2>{item.product.title}</h2>
                                <p>{item.product.description}</p>
                                <p>{item.product.price} &#8364;</p>
                                <p>Total: ${multiply(item.quantity, item.product.price).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="cartItem-buttons">
                            <button onClick={()=>decreaseQuantity(item.product.id)}>-</button>
                            <button onClick={()=>increaseQuantity(item.product.id)}>+</button>
                            <button onClick={()=>removeFromCart(item.product.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            </>
    )
}

export default Cart;


