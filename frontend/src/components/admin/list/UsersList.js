import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productsDelete } from "../../../features/ProductSlice";
import EditProduct from "../EditProduct";
import { userDelete, usersFetch } from "../../../features/userSlice";

export default function UsersList() {
  const { list } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);
  const rows =
    list &&
    list.map((user) => {
      return {
        id: user._id,
        uName: user.name,
        uEmail: user.email,
        isAdmin: user.isAdmin,
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },

    { field: "uName", headerName: "Name", width: 150 },
    {
      field: "uEmail",
      headerName: "Email",
      width: 200,
    },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return <Row>{params.row.isAdmin ? <p>Admin</p> : <p>Customer</p>}</Row>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Row>
            <Col
              onClick={() => handleDelete(params.row.id)}
              className='btn btn-sm btn-danger m-1'
            >
              <small>Delete</small>
            </Col>

            <Col
              onClick={() => navigate(`/user/${params.row.id}`)}
              className='btn btn-sm btn-dark m-1'
            >
              <small>View</small>
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableselectionOnClick
      />
    </div>
  );
}
