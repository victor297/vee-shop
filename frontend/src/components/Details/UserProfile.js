import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Toast } from "react-bootstrap";
import { setHeaders, url } from "../../features/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: "",
  });

  console.log(user);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${url}/users/find/${params.id}`,
          setHeaders()
        );
        setUser({
          ...res.data,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(
        `${url}/users/${params.id}`,
        {
          ...user,
        },
        setHeaders()
      );
      setUser({ ...res.data, password: "" });
      toast.success("Profile updated...");
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
  };
  return (
    <div>
      {" "}
      {loading ? (
        <p>Loading</p>
      ) : (
        <Row>
          <Col md={4} className='col-7 mt-4 m-auto text-start'>
            <Form onSubmit={handleSubmit}>
              <h4>User Profile</h4>
              {user.isAdmin ? (
                <p className='text-success'>Admin</p>
              ) : (
                <p className='text-info'>Customer</p>
              )}
              <Form.Group className='mb-2'>
                <Form.Control
                  className='mb-2'
                  type='text'
                  placeholder='Name'
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  accept='image/'
                  value={user.name}
                  required
                />
                <Form.Control
                  className='mb-2'
                  type='text'
                  placeholder='Email'
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  accept='image/'
                  value={user.email}
                  required
                />

                <Form.Control
                  className='mb-2'
                  type='text'
                  placeholder='password'
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                />
              </Form.Group>
              <div className='d-grid'>
                <Button type='submit'>
                  {updating ? "Updating" : "Update Profile"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserProfile;
