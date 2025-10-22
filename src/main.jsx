// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import {createBrowserRouter, RouterProvider} from 'react-router'
// import './index.css'
// import App from './App.jsx'
// import Home from './Home.jsx'
// import Shop from './Shop.jsx'
// import Cart from './Cart.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children:[
//       {path: "/", element: <Home/>},
//       {path: "/shop", element: <Shop/>},
//       {path: "/cart", element: <Cart/>},
//     ]
//   }
// ])


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router}/>
//   </StrictMode>
// )

import { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import './index.css';
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App/>
  </StrictMode>
)