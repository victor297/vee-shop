import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(product);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/products/find/${params.id}`,
          setHeaders()
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  return (
    <Row>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <>
          <Row className='text-start' style={{ maxWidth: "540px" }}>
            <Row>
              <Col md={3}>
                <img
                  src={product.image?.url}
                  alt='product'
                  style={{ maxHeight: "200px" }}
                  width={100}
                />
              </Col>
              <Col md={6}>
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-text'>Brand: {product.brand}</p>
                  <p>Description: {product.desc} </p>
                  <p>price: {product.price?.toLocaleString()} </p>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              </Col>
            </Row>
          </Row>
        </>
      )}
    </Row>
  );
};

export default Product;
