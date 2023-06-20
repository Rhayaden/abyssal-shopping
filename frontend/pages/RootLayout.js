import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { productActions } from "../store/product-slice";
import Footer from "../components/Footer/Footer";
import { getTokenDuration, logout } from "../util/auth";

function Layout() {
  const cartProducts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const params = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "AUTH_TOKEN_EXPIRED") {
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      logout();
      return navigate(0);
    }, tokenDuration);
  }, [token]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:8080/prod/all-products");
      const resData = await res.json();
      const productsArray = resData.products;

      productsArray.map((prod) => {
        return dispatch(productActions.addProduct(prod));
      });
    };
    getProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getCart = async () => {
        const res = await fetch("http://localhost:8080/cart", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const resData = await res.json();
        const getCartProds = resData.cart.cartProducts;
        if (getCartProds.length !== cartProducts.length) {
          getCartProds.map((prod) => {
            return dispatch(cartActions.addToCart(prod));
          });
        }
        return resData;
      };
      getCart();
    }
  }, [dispatch]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      {pathname !== "/cart" &&
        pathname !== "/orders" &&
        pathname !== `/invoices/${params.orderID}` && <Footer />}
    </>
  );
}

export default Layout;
