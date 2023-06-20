import MyProductItem from "./MyProductItem";
import Pagination from "../Pagination/Pagination";
import classes from "./Products.module.css";
import { Link, useNavigation } from "react-router-dom";
import Fallback from "../../UI/Fallback";

function MyProducts({ data }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      {isLoading && <Fallback />}
      {data.myProducts.length === 0 && (
        <div className={classes["no-product"]}>
          <h1>You don't have any products</h1>
          <Link to="/my-products/add-product">Add Product</Link>
        </div>
      )}
      {data.myProducts.length > 0 && (
        <div className={classes["link-add-product"]}>
          <Link to="/my-products/add-product">
            <i className="fa-solid fa-plus"></i> Add Product
          </Link>
        </div>
      )}
      {data.myProducts.length > 0 && (
        <ul className={classes["product-ul"]}>
          {data.myProducts.map((product) => (
            <MyProductItem
              key={product._id}
              _id={product._id}
              title={product.title}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          ))}
        </ul>
      )}
      {data.myProducts.length > 0 && <Pagination data={data} />}
    </>
  );
}

export default MyProducts;
