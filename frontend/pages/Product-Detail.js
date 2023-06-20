import ProductDetail from "../components/Product/ProductDetail";
import { useLoaderData } from "react-router-dom";

function ProductDetailPage() {
  const data = useLoaderData();

  return (
    <>
      <ProductDetail data={data.product} />
    </>
  );
}

export default ProductDetailPage;

export async function loader({ params }) {
  const prodId = params.productID;

  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/prod/products/" + prodId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch posts.");
  }
  return res.json();
}
