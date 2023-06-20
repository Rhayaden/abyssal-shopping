import ProductForm from "../components/ProductForm";

function ProductActions() {
  return (
    <>
      <ProductForm />
    </>
  );
}

export default ProductActions;

export async function action({ request, params }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const method = request.method;

  const data = await request.formData();
  const prodData = {
    title: data.get("title"),
    image: data.get("image"),
    description: data.get("description"),
    price: data.get("price"),
    addedBy: userId,
  };

  let url = "http://localhost:8080/prod/add-product";
  if (method === "PATCH") {
    const productID = params.productId;
    url = "http://localhost:8080/prod/edit-product/" + productID;
  }
  const res = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(prodData),
  });
  if (res.status === 422) {
    const resData = await res.json();
    return resData;
  }
  if (res.status !== 200 && res.status !== 201) {
    console.log("Error!");
  }

  return res.json();
}
