import { useState, useEffect } from "react";
import NavBar from "./Navbar";

const Shop = ()=>{
    const [cards, setCard] = useState([]);
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
                setCard(response);
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


    return(
        <>
            <div className="home-header">
                <h2>TOPShop</h2>
                <NavBar />
            </div>
            <div>
                <div className="card-list">
                    {cards.map((card)=>(
                        <div key={card.id} className="card">
                            <div>
                                <h2>{card.title}</h2>
                            </div>
                            <div>
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className="buttons-list">
                                <button className="buttons" onClick={()=>decreaseQuantity(card.id)}>-</button>
                                <input type="number" value={quantities[card.id] || 1} onChange={(e)=>handleInputChange(card.id,e.target.value)}/>
                                <button className="buttons" onClick={()=>increaseQuantity(card.id)}>+</button>
                                <button className="buttons">Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Shop;