import React, { useEffect } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import PayButton from "./PayButton";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreasedCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className='container'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Your Cart Is Curently Empty</p>
          <div>
            <Link to='/'>
              <span>Start Shopiing</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Row className='p-3'>
            <Col xs={5} className='text-start'>
              {" "}
              <h5>Product</h5>
            </Col>
            <Col xs={2}>
              {" "}
              <h5>Price</h5>
            </Col>
            <Col xs={2}>
              {" "}
              <h5>Qty</h5>
            </Col>
            <Col xs={3}>
              {" "}
              <h5>Total</h5>
            </Col>
          </Row>

          <div>
            {cart.cartItems?.map((cartItem) => (
              <Row key={cartItem._id} className='border-top p-3'>
                <Col xs={5}>
                  <Row>
                    <Col>
                      <Image />
                      <img
                        className=''
                        src={cartItem.image.url}
                        alt={cartItem.name}
                        width='100%'
                        height='150px'
                      />
                    </Col>
                    <Col xs={7} className='text-start'>
                      <p>{cartItem.name}</p>
                      <p>{cartItem.desc}</p>
                      <Button
                        variant='flush'
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}>${cartItem.price}</Col>
                <Col xs={2}>
                  <Row className='justify-content-center'>
                    <Button
                      className='col-1'
                      variant='flush'
                      onClick={() => handleDecreasedCart(cartItem)}
                    >
                      -
                    </Button>
                    <span className='col-1 my-auto'>
                      {cartItem.cartQuantity}
                    </span>
                    <Button
                      className='col-1'
                      variant='flush'
                      onClick={() => handleIncreaseCart(cartItem)}
                    >
                      +
                    </Button>
                  </Row>
                </Col>
                <Col xs={3}>${cartItem.price * cartItem.cartQuantity}</Col>
              </Row>
            ))}
          </div>
          <Row>
            <Col className='text-start'>
              <Button variant='flush' onClick={() => handleClearCart()}>
                Clear Cart
              </Button>
            </Col>
            <Col md={3} className='text-end'>
              <Row>
                <Row>
                  <Col>
                    <span>SubTotal</span>
                  </Col>
                  <Col>
                    <span>${cart.cartTotalAmount}</span>
                  </Col>
                </Row>
                <p>Taxes and shipping calculated at checkout</p>

                {auth._id ? (
                  <PayButton cartItems={cart.cartItems} />
                ) : (
                  <Button variant='warning' onClick={() => navigate("/login")}>
                    Login to Checkout
                  </Button>
                )}
                <div>
                  <Link to='/'>
                    <span>Start Shopiing</span>
                  </Link>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Cart;
