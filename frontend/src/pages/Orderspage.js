import { useDispatch, useSelector } from "react-redux";
import Orders from "../components/Order/Orders";
import { useEffect } from "react";
import { orderActions } from "../store/order-slice";
import { useLoaderData } from "react-router-dom";

function OrdersPage() {
  const data = useLoaderData();
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const ordersArray = data.orders;
    if (ordersArray.length !== orders.length) {
      dispatch(orderActions.clearOrder());
      ordersArray.map((order) => {
        return dispatch(orderActions.order(order));
      });
    }
  }, [data, orders, dispatch]);

  return (
    <>
      <Orders data={data} />
    </>
  );
}

export default OrdersPage;

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8080/order?page=" + page, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch orders.");
  }
  return res.json();
}
