import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ordersEdit, ordersFetch } from "../../../features/ordersSlice";
import moment from "moment";

export default function OrdersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.orders);
  console.log(list);
  useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);
  const rows =
    list &&
    list.map((order) => {
      return {
        id: order._id,
        cName: order.shipping.name,
        amount: (order.total / 100)?.toLocaleString(),
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "cName",
      headerName: "name",
      width: 120,
    },
    { field: "amount", headerName: "amount(N)", width: 100 },
    {
      field: "dStatus",
      headerName: "status",
      width: 100,
      renderCell: (params) => {
        <Col></Col>;
        return (
          <Row>
            {params.row.dStatus === "pending" ? (
              <p>pending</p>
            ) : params.row.dStatus === "dispatched" ? (
              <p>Dispatched</p>
            ) : params.row.dStatus === "delivered" ? (
              <p>Delivered</p>
            ) : (
              "error"
            )}
          </Row>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Row>
            <Col
              onClick={() => handleOrderDispatch(params.row.id)}
              className='btn btn-sm btn-info m-1'
            >
              <small>Dispatch</small>
            </Col>
            <Col
              onClick={() => navigate(`/order/${params.row.id}`)}
              className='btn btn-sm btn-primary m-1'
            >
              <small>View</small>
            </Col>
            <Col
              onClick={() => handleOrderDelivered(params.row.id)}
              className='btn btn-sm btn-success m-1'
            >
              <small>Deliver</small>
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };
  const handleOrderDelivered = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
    );
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
        disableRowSelectionOnClick
      />
    </div>
  );
}
