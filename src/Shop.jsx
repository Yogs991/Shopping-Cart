import { useState, useEffect } from "react";
import NavBar from "./Navbar";

const Shop = ()=>{
    const [cards, setCard] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products",{mode: "cors"})
            .then((response)=>{
                if(response.status >= 400){
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response)=>setCard(response))
            .catch((error)=> setError(error))
            .finally(()=>setLoading(false));
    },[]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>A network error was encountered</p>

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
                            <h2>{card.title}</h2>
                            <img src={card.image} alt={card.title} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Shop;