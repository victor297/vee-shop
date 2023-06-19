import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ordered as orderCake,
  restocked as restockCake,
} from "../slice/cakeSlice";
import { Button } from "react-bootstrap";

const Cake = () => {
  const cake = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <>
      <div className='container'>
        <Button className='btn-dark me-2' onClick={() => dispatch(orderCake())}>
          {" "}
          buy a cake
        </Button>
        <span>cake {cake}</span>
        <Button
          className='btn-dark ms-2'
          onClick={() => dispatch(restockCake(10))}
        >
          restock 10 cakes
        </Button>{" "}
        <br />
        <input
          type='text'
          className=' m-2'
          placeholder='input what to restock'
        />
        <input type='text' className=' m-2' placeholder='input what to order' />
      </div>
    </>
  );
};

export default Cake;
