import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className='col-4 m-auto mt-5'>
        <h2>Register</h2>
        <Form.Group className='mb-3 mt-5'>
          <Form.Control
            className='mb-3'
            type='text'
            placeholder='name'
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <Form.Control
            className='mb-3'
            type='email'
            placeholder='email'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Form.Control
            className='mb-3'
            type='password'
            placeholder='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <div className='d-grid'>
            <Button type='submit'>
              {auth.registerStatus === "pending" ? "Submitting" : "Register"}
            </Button>
          </div>
          {auth.registerStatus === "rejected" ? (
            <p className='text-start text-danger mt-2'>{auth.registerError}</p>
          ) : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default Register;
