import { Outlet } from "react-router";
import NavBar from "./Navbar";

function App() {

  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default App;
