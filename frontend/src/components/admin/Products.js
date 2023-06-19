import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col>
          <h3>products</h3>
        </Col>
        <Col className='text-end'>
          <Button
            onClick={() => navigate("/admin/products/create-product")}
            className='mt-2'
          >
            Create
          </Button>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default Products;
