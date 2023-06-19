import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../features/cartSlice";

const CheckoutSuccess = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <>
      <h2>Checkout Successful</h2>
      <p>Your order might tske somr time to process...</p>
      <p>checkout your order status at your profile after about 5mins.</p>
      <p>Incase of any enquireies contact the support at</p>
      <strong>snur@duck.com</strong>
    </>
  );
};

export default CheckoutSuccess;
