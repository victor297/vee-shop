import React from "react";
import { useGetAllProductsQuery } from "../features/productsApi";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";

const Home = () => {
  // const { data, error, isLoading } = useGetAllProductsQuery();
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTocCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className='container'>
      {status === "success" ? (
        <>
          <h2 className='p-3 text-start bold'>New arrivals</h2>
          <Row className='products'>
            {data?.map((product) => (
              <Col key={product._id} className='shadow-sm p-3 m-3'>
                <h3>{product.name}</h3>
                <Link to={`/product/${product._id}`}>
                  <Image
                    className='col-xs-4'
                    width='150'
                    height='200'
                    src={product.image.url}
                    alt={product.name}
                  />
                </Link>
                <Row>
                  <span>{product.desc}</span>
                  <span>${product.price}</span>
                </Row>
                <Button
                  onClick={() => handleAddTocCart(product)}
                  className='btn-dark'
                >
                  Add To Cart
                </Button>
              </Col>
            ))}
          </Row>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
