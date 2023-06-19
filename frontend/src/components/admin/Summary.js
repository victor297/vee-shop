import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary component/Widget";
import axios from "axios";
import { setHeaders, url } from "../../features/api";
import Chart from "./summary component/Chart";
import Transactions from "./summary component/Transactions";
import AllTimeData from "./summary component/AllTimeData";
const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState([]);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState([]);

  // console.log(incomePerc);
  // console.log(income);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());
        res.data.sort(compare);
        console.log("stats", res.data);
        setUsers(res.data);
        setUsersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());
        res.data.sort(compare);
        console.log("stats", res.data);
        setOrders(res.data);
        setOrdersPerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());
        res.data.sort(compare);
        console.log("stats", res.data);
        setIncome(res.data);
        setIncomePerc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const data = [
    {
      icons: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "users",
      color: "blue",
      bgColor: "black",
      percentage: usersPerc,
    },
    {
      icons: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "blue",
      bgColor: "rgb(102,108,255,0.12)",
      percentage: ordersPerc,
    },
    {
      icons: <FaChartBar />,
      digits: income[0]?.total ? income[0]?.total / 100 : "",
      isMoney: true,
      title: "earnings",
      color: "blue",
      bgColor: "black",
      percentage: incomePerc,
    },
  ];
  return (
    <>
      <Row>
        <Col md={7}>
          <Row>
            <Col className='bg-dark text-white p-3 rounded'>
              <h2>Overview</h2>
              <p>How your shop is performing compared to the previous month</p>
              <Row>
                {data?.map((data, index) => (
                  <Widget key={index} data={data} />
                ))}
              </Row>
            </Col>
          </Row>
          <Row className='h-50 border mt-4 text-center p-2'>
            <h4>Last 7 days Earnings (NGN ₦)</h4>
            <Chart />
          </Row>
        </Col>
        <Col md={5}>
          <Transactions />
          <AllTimeData />
        </Col>
      </Row>
    </>
  );
};

export default Summary;
