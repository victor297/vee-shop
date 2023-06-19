import React from "react";
import { Col, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAdmin) return <p>Access denied</p>;
  return (
    <Row style={{ height: "90vh" }} className='container-fluid '>
      <Col md={2}>
        <Nav className='flex-column border-end  text-start h-100 pt-4 ps-3'>
          <h5>Quick Links</h5>
          <NavLink to='/admin/summary'>
            <FaTachometerAlt /> Summary
          </NavLink>
          <NavLink to='/admin/products'>
            <FaStore /> Products
          </NavLink>
          <NavLink to='/admin/Orders'>
            <FaUsers /> Orders
          </NavLink>
          <NavLink to='/admin/Users'>
            <FaClipboard /> Users
          </NavLink>
        </Nav>
      </Col>
      <Col md={10} className='text-start mt-3'>
        <Outlet />
      </Col>
    </Row>
  );
};

export default Dashboard;
