import "./App.css";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/*' element={<NotFound />} />
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
