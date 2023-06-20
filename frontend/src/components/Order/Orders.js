import OrderItem from "./OrderItem";
import Pagination from "../Pagination/Pagination";
import classes from "../Product/Products.module.css";

function Orders({ data }) {
  return (
    <>
      {data.orders.length === 0 && (
        <div className={classes["no-product"]}>
          <h1>No order found</h1>
        </div>
      )}
      <ul>
        {data.orders.map((order) => (
          <OrderItem
            key={order._id}
            _id={order._id}
            totalPrice={order.total}
            createDate={order.createdAt}
            order={order}
          />
        ))}
      </ul>
      {data.orders.length >= data.perPage && <Pagination data={data} />}
    </>
  );
}

export default Orders;
