import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../slice/userSlice";

const Users = () => {
  const user = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  });
  console.log(user);
  return (
    <div>
      {user.map((user) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
};

export default Users;
