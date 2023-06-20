import { useEffect } from "react";
import MyProducts from "../components/MyProducts";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product-slice";
import { useLoaderData } from "react-router-dom";

function MyProductsPage() {
  const data = useLoaderData();
  const myItems = useSelector((state) => state.product.myItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const myProds = data.myProducts;
    if (myProds.length !== myItems.length) {
      dispatch(productActions.clearMyList());
      myProds.map((prod) => {
        return dispatch(productActions.addMyProduct(prod));
      });
    }
  }, [data, myItems, dispatch]);

  return (
    <>
      <MyProducts data={data} />
    </>
  );
}

export default MyProductsPage;

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");

  const token = localStorage.getItem("token");
  const res = await fetch(
    "http://localhost:8080/prod/my-products?page=" + page,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  if (!res.ok) {
    const resData = await res.json();
    throw new Response(`${resData.message}`);
  }
  return res.json();
}
