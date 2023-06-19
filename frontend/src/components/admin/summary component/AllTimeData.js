import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const AllTimeData = () => {
  const { items } = useSelector((state) => state.products);

  return (
    <Row className='bg-dark text-white p-3 rounded ms-3 mt-3 text-start '>
      <h5>All Time</h5>
      <Row>
        <Col>Users</Col>
        <Col>200</Col>
      </Row>
      <Row>
        <Col>Products</Col>
        <Col>{items.length}</Col>
      </Row>
      <Row>
        <Col>Orders</Col>
        <Col>5000</Col>
      </Row>
      <Row>
        <Col>Earnings</Col>
        <Col>₦50,000,000</Col>
      </Row>
    </Row>
  );
};

export default AllTimeData;
