import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

function Products({ data }) {
  return (
    <>
      {data.products.length === 0 && (
        <div className={classes["no-product"]}>
          <h1>There are no products here. Be the first one who adds.</h1>
          <Link to="/my-products/add-product">Add Product</Link>
        </div>
      )}
      <ul className={classes["product-ul"]}>
        {data?.products.map((product) => (
          <ProductItem
            key={product._id}
            _id={product._id}
            title={product.title}
            image={product.image}
            description={product.description}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </ul>
      <Pagination data={data} />
    </>
  );
}

export default Products;
