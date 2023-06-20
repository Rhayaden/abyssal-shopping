import { Await, defer, useLoaderData } from "react-router-dom";
import Products from "../components/Product/Products";
import Fallback from "../UI/Fallback";

import { Suspense } from "react";

function ProductsPage() {
  const data = useLoaderData();

  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Await resolve={data.products}>
          {(loadedProducts) => <Products data={loadedProducts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default ProductsPage;
async function loadProducts(request) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");

  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/prod/products?page=" + page, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch posts.");
  }
  return res.json();
}
export function loader({ request }) {
  return defer({
    products: loadProducts(request),
  });
}
