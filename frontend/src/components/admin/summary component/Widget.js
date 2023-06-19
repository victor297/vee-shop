import React from "react";
import { Col } from "react-bootstrap";

const Widget = ({ data }) => {
  return (
    <>
      <Col>{data.icons}</Col>
      <Col>
        <h4>
          {data.isMoney
            ? "₦" + data.digits?.toLocaleString()
            : data.digits?.toLocaleString()}
        </h4>
        <p>{data.title}</p>
      </Col>
      {data.percentage < 0 ? (
        <>{Math.floor(data.percentage) + "%"}</>
      ) : (
        <>{Math.floor(data.percentage) + "%"}</>
      )}
    </>
  );
};

export default Widget;
