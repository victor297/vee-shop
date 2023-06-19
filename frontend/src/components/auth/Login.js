import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className='col-4 m-auto mt-5'>
        <h2>Login</h2>
        <Form.Group className='mb-3 mt-5'>
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
              {auth.loginStatus === "pending" ? "Submitting" : "login"}
            </Button>
          </div>
          {auth.loginStatus === "rejected" ? (
            <p className='text-start text-danger mt-2'>{auth.loginError}</p>
          ) : null}
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
