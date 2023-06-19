import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreateProduct from "./CreateProduct";
import { productsEdit } from "../../features/ProductSlice";

export default function EditProduct({ prodId }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { items, editStatus } = useSelector((state) => state.products);
  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");

  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsEdit({
        productImg,
        product: {
          ...currentProd,
          name: name,
          price: price,
          desc: desc,
        },
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];
    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setProductImg("");
    setBrand(selectedProd.brand);
    setName(selectedProd.name);
    setPrice(selectedProd.price);
    setDesc(selectedProd.desc);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className='btn btn-sm btn-dark m-1' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Row>
            <Col>
              <Form className='col-7 mt-4' onSubmit={handleSubmit}>
                <h4>Create a Product</h4>
                <Form.Group className='mb-2'>
                  <Form.Control
                    className='mb-2'
                    type='file'
                    placeholder='name'
                    onChange={handleProductImageUpload}
                    accept='image/'
                  />
                  <Form.Select
                    className='mb-2'
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    value={brand}
                  >
                    <option value=''>Select Brand</option>
                    <option value='iphone'>iPhone</option>
                    <option value='samsung'>Samsung</option>
                    <option value='xiomi'>Xiomi</option>
                    <option value='other'>Other</option>
                  </Form.Select>
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    accept='image/'
                    value={name}
                    required
                  />
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='Price'
                    onChange={(e) => setPrice(e.target.value)}
                    accept='image/'
                    value={price}
                    required
                  />

                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='Short Description'
                    onChange={(e) => setDesc(e.target.value)}
                    accept='image/'
                    required
                    value={desc}
                  />
                </Form.Group>
                <div className='d-grid'>
                  <Button type='submit'>
                    {editStatus === "pending" ? "Submitting" : "Submit"}
                  </Button>
                </div>
              </Form>
            </Col>

            <Col xs={6} md={4}>
              {previewImg ? (
                <>
                  <img
                    className='mt-5 border p-3 align-middle h-50'
                    src={previewImg}
                    alt='product image!'
                    width='100%'
                  />
                </>
              ) : (
                <p className='mt-5 p-3 align-middle'>
                  Product image upload preview will appear here!
                </p>
              )}
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
