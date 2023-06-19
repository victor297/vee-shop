import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { ordered as orderIceCream } from "../slice/iceCreamSlice";
import { restocked as restockIceCream } from "../slice/iceCreamSlice";

const IceCream = () => {
  const iceCream = useSelector((state) => state.icecream.numOfIceCreams);
  const dispatch = useDispatch();
  return (
    <>
      <div className='container p-4'>
        <Button
          className='btn-dark me-2'
          variant='flush'
          onClick={() => dispatch(orderIceCream())}
        >
          buy icecream
        </Button>
        <span>iceCream {iceCream}</span>
        <Button
          className='btn-dark ms-3'
          onClick={() => dispatch(restockIceCream(5))}
        >
          restock 5 creams
        </Button>
      </div>
    </>
  );
};

export default IceCream;
