import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { setHeaders, url } from "../../../features/api";
import moment from "moment";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(orders);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <p>transaction loading</p>
      ) : (
        <Row className='bg-dark text-white p-3 rounded ms-3 text-start'>
          <h3>Latest Transactions</h3>

          {orders?.map((order, index) => (
            <Row key={index}>
              <Col>{order.shipping.name}</Col>
              <Col>₦ {(order.total / 100).toLocaleString()}</Col>
              <Col>{moment(order.createdAt).fromNow()}</Col>
            </Row>
          ))}
        </Row>
      )}
    </>
  );
};

export default Transactions;
