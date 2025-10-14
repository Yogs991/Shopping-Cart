import NavBar from "./Navbar";

const Home = ()=>{
    return(
        <>
            <div className="home-header">
                <h2>TOPShop</h2>
                <NavBar />
            </div>
            <div className="home-main">
                <h1>Discover Quality Products for Everyday Life</h1>
                <p>Explore our collection of carefully curated items designed to enhance your lifestyle.</p>
                <button>Shop Now</button>
            </div>
        </>
    )
}

export default Home;