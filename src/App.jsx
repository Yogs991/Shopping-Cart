// import { Outlet } from "react-router";
// import NavBar from "./Navbar";

// function App() {

//   return (
//     <>
//       <div>
//         <Outlet/>
//       </div>
//     </>
//   )
// }

// export default App;

import { useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import NavBar from "./Navbar"
import Layout from "./Layout"
import Home from "./Home"
import Shop from "./Shop"
import Cart from "./Cart"
import DefaultPage from "./DefaultPage"

function App(){
  const [cartItems, setCartItems] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout cartItems={cartItems}/>,
      children:[
        {path: "/", element: <Home/>},
        {path: "/shop", element: <Shop cartItems={cartItems} setCartItems={setCartItems}/>},
        {path: "/cart", element: <Cart cartItems={cartItems} setCartItems={setCartItems}/>},
      ]
    }
  ]);

  return <RouterProvider router={router}/>
  
}

export default App