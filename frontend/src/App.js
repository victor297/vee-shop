import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import ProductsList from "./components/admin/list/ProductsList";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import Product from "./components/Details/Product";
import Order from "./components/Details/Order";
import UserProfile from "./components/Details/UserProfile";
// import Cake from "./cake and icecream views/Cake";
// import IceCream from "./cake and icecream views/IceCream";
// import Users from "./cake and icecream views/Users";

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Navbar />
      {/* <IceCream />
      <Cake />
      <Users /> */}
      <Routes>
        <Route path='/*' element={<NotFound />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/product/:id' element={<Product />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/user/:id' element={<UserProfile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='//checkout-success' element={<CheckoutSuccess />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>

        {/* //Admin */}
        <Route path='/admin' element={<Dashboard />}>
          <Route path='summary' element={<Summary />} />
          <Route path='users' element={<Users />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />}>
            <Route index element={<ProductsList />} />
            <Route path='create-product' element={<CreateProduct />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
