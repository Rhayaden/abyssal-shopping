import { Link } from "react-router-dom";
import classes from "./OrderItem.module.css";

function OrderItem({ order, _id }) {
  return (
    <li className={classes.orders}>
      <h1>
        Order No: <Link to={`/invoices/${_id}`}>#{_id}</Link>
      </h1>
      <h2>Order Date: {order.createdAt}</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item._id}>
            <p>
              <span>{item.title}</span> x{item.quantity}
            </p>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default OrderItem;
