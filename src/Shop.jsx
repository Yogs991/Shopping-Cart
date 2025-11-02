import { useState, useEffect } from "react";
import NavBar from "./Navbar";

function Shop({cartItems, setCartItems}){
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products",{mode: "cors"})
            .then((response)=>{
                if(response.status >= 400){
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response)=>{
                setProducts(response);
                const initialQuantities = {};
                response.forEach((item)=>{
                    initialQuantities[item.id] =1;
                });
                setQuantities(initialQuantities);
            })
            .catch((error)=> setError(error))
            .finally(()=>setLoading(false));
            
    },[]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>A network error was encountered</p>

    const increaseQuantity = (id)=>{
        setQuantities((prev)=>({
            ...prev,
            [id]: prev[id] + 1,
        }));
    };

    const decreaseQuantity = (id)=>{
        setQuantities((prev)=>({
            ...prev,
            [id]: prev[id]-1,
        }));
    };
    
    const handleInputChange = (id, value)=>{
        const number = parseInt(value, 10);
        setQuantities((prev)=>({
            ...prev,
            [id]: number,
        }));
    }

    const addToCart = (product)=>{
        setCartItems([
            ...cartItems,
            {product, quantity: quantities[product.id] || 1},
        ])
    }

    return(
        <>
            <div className="home-header">
                <h2>TOPShop</h2>
                <NavBar cartItems={cartItems}/>
            </div>
            <div>
                <div className="product-list">
                    {products.map((product)=>(
                        <div key={product.id} className="product">
                            <div>
                                <h2>{product.title}</h2>
                            </div>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <p>${product.price}</p>
                            </div>
                            <div className="buttons-list">
                                <button className="buttons" onClick={()=>decreaseQuantity(product.id)}>-</button>
                                <input type="number" value={quantities[product.id] || 1} onChange={(e)=>handleInputChange(product.id,e.target.value)}/>
                                <button className="buttons" onClick={()=>increaseQuantity(product.id)}>+</button>
                                <button className="buttons" onClick={()=>addToCart(product)}>Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Shop;