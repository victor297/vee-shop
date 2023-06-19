import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productsDelete } from "../../../features/ProductSlice";
import EditProduct from "../EditProduct";

export default function ProductsList() {
  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDesc: item.desc,
        price: item.price.toLocaleString(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <div>
            <Image
              src={params.row.imageUrl}
              alt=''
              style={{ width: "45px", height: "52px" }}
            />
          </div>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Row>
            <Col
              onClick={() => handleDelete(params.row.id)}
              className='btn btn-sm btn-danger m-1'
            >
              <small>Delete</small>
            </Col>
            <Col>
              <EditProduct prodId={params.row.id} />
            </Col>
            <Col
              onClick={() => navigate(`/product/${params.row.id}`)}
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
    dispatch(productsDelete(id));
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
