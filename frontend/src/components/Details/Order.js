import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
const Order = () => {
  const params = useParams();

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(order);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeaders()
        );
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [params.id]);

  return (
    <Row>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <>
          <Row
            className='text-start m-auto mt-5 border p-3'
            style={{ maxWidth: "540px" }}
          >
            <Col md={12}>
              <div className='card-body'>
                <h3>Order Details</h3>
                <p>
                  Delivery status:
                  {order.delivery_status === "pending" ? (
                    <p>pending</p>
                  ) : order.delivery_status === "dispatched" ? (
                    <p>Dispatched</p>
                  ) : order.delivery_status === "delivered" ? (
                    <p>Delivered</p>
                  ) : (
                    "error"
                  )}
                </p>
                <h4>Ordered Products</h4>
                <Row>
                  {order.products?.map((product, index) => (
                    <div key={index}>
                      <span
                        className='.
                      pe-2'
                      >
                        {product.description}
                      </span>
                      <span
                        className='.
                      pe-2'
                      >
                        {product.quantity}
                      </span>
                      <span
                        className='.
                      pe-2'
                      >
                        {"N" + (product.amount_total / 100).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </Row>

                <h4>Total Price</h4>

                <p>{"N" + (order.total / 100).toLocaleString()}</p>
                <h4>Shipping Details</h4>

                <p>Customer: {order.shipping?.name}</p>
                <p>city: {order.shipping?.address.city}</p>
                <p>Email: {order.shipping?.email}</p>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Row>
  );
};

export default Order;
