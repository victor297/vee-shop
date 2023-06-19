import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../features/api";
import { Button } from "react-bootstrap";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  console.log(cartItems);
  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button onClick={() => handleCheckout()}>Check out</Button>
    </>
  );
};

export default PayButton;
