import { useEffect, useRef, useState } from "react";
import classes from "./ProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { productActions } from "../../store/product-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";

function ProductForm({ method }) {
  const data = useActionData();
  const { pathname } = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const myItems = useSelector((state) => state.product.myItems);
  const params = useParams();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const titleRef = useRef();
  const imageRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();

  const prodId = data?.product?._id;
  useEffect(() => {
    if (prodId) {
      navigate("/my-products");
      //Reloads the page to get latest state
      setTimeout(() => {
        navigate(0);
      }, 333);
    }
  }, [prodId, navigate]);

  let hasError = false;
  let message;
  if (data) {
    if (data.message) {
      hasError = true;
      const errorList = data.message;
      const errors = errorList.map((err, index) => {
        return <li key={index}>{err}</li>;
      });
      message = errors;
    }
  }

  useEffect(() => {
    if (pathname !== "/my-products/add-product") {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [pathname]);

  const isSubmitting = navigation.state === "submitting";

  const filteredArray = myItems.filter((item) => item._id === params.productID);
  const selectedItem = filteredArray[0];

  const submitHandler = () => {
    const enteredTitle = titleRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredPrice = priceRef.current.value;
    const enteredStock = stockRef.current.value;

    if (
      enteredTitle.length < 3 ||
      enteredTitle.length > 72 ||
      enteredDesc.length < 6 ||
      enteredDesc.length > 288
    ) {
      return;
    }

    if (isEditing) {
      dispatch(
        productActions.editProduct({
          ...selectedItem,
          title: enteredTitle,
          description: enteredDesc,
          price: enteredPrice,
          stock: enteredStock,
        })
      );
    } else {
      dispatch(
        productActions.addProduct({
          title: enteredTitle,
          description: enteredDesc,
          price: enteredPrice,
          stock: enteredStock,
        })
      );
      dispatch(
        productActions.addMyProduct({
          title: enteredTitle,
          description: enteredDesc,
          price: enteredPrice,
          stock: enteredStock,
        })
      );
    }
  };
  return (
    <>
      <div className={classes["form-control"]}>
        <h1>{isEditing ? "Edit Product" : "Add Product"}</h1>
        {isSubmitting && <LoadingSpinner />}
        {hasError && !isSubmitting && (
          <ul className={classes.error}>{message}</ul>
        )}
        <Form
          method={method}
          className={classes["product-form"]}
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            ref={titleRef}
            defaultValue={isEditing ? selectedItem.title : ""}
            required
          />
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" ref={imageRef} required />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            ref={descRef}
            defaultValue={isEditing ? selectedItem.description : ""}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            ref={priceRef}
            defaultValue={isEditing ? selectedItem.price : ""}
            required
          />
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            ref={stockRef}
            defaultValue={isEditing ? selectedItem.stock : ""}
            required
          />
          <button className={classes.btn}>
            {isEditing ? "Edit Product" : "Add Product"}
          </button>
        </Form>
      </div>
    </>
  );
}

export default ProductForm;

export async function action({ request, params }) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const method = request.method;
  const data = await request.formData();

  const title = data.get("title");
  const image = data.get("image");
  const description = data.get("description");
  const price = data.get("price");
  const stock = data.get("stock");
  const addedByUser = username;

  const prodData = new FormData();
  prodData.append("title", title);
  prodData.append("image", image);
  prodData.append("description", description);
  prodData.append("price", price);
  prodData.append("stock", stock);
  prodData.append("addedByUser", addedByUser);

  let url = "http://localhost:8080/prod/add-product";
  if (method === "PUT") {
    const productID = params.productID;
    url = "http://localhost:8080/prod/edit-product/" + productID;
  }
  const res = await fetch(url, {
    method: method,
    headers: {
      Authorization: "Bearer " + token,
    },
    body: prodData,
  });
  if (res.status === 500) {
    const resData = await res.json();
    throw new Response(`${resData.message}`);
  }

  return res.json();
}
