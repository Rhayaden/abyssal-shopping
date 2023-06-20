import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/RootLayout";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./util/ProtectedRoute";
import AuthContextProvider from "./util/auth-context";
import ProtectedAuth from "./util/ProtectedAuth";
import Fallback from "./UI/Fallback";
const ErrorPage = lazy(() => import("./pages/Errorpage"));
const AuthPage = lazy(() => import("./pages/Authpage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const MyProductsPage = lazy(() => import("./pages/My-Products"));
const ProductDetailPage = lazy(() => import("./pages/Product-Detail"));
const AddProductpage = lazy(() => import("./pages/AddProductpage"));
const EditProductpage = lazy(() => import("./pages/EditProductpage"));
const Cartpage = lazy(() => import("./pages/Cartpage"));
const OrdersPage = lazy(() => import("./pages/Orderspage"));
const Profile = lazy(() => import("./pages/Profile"));
const ResetPass = lazy(() => import("./components/Profile/ResetPass"));
const InvoicesPage = lazy(() => import("./pages/InvoicesPage"));
const Invoice = lazy(() => import("./components/Profile/Invoice"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<Fallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "auth",
        element: (
          <ProtectedAuth>
            <Suspense fallback={<Fallback />}>
              <AuthPage />
            </Suspense>
          </ProtectedAuth>
        ),
        action: (meta) =>
          import("./pages/Authpage").then((module) => module.action(meta)),
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Fallback />}>
                <ProductsPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/ProductsPage").then((module) =>
                module.loader(meta)
              ),
          },
          {
            path: ":productID",
            element: (
              <Suspense fallback={<Fallback />}>
                <ProductDetailPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Product-Detail").then((module) =>
                module.loader(meta)
              ),
          },
        ],
      },
      {
        path: "my-products",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <MyProductsPage />
                </Suspense>
              </ProtectedRoute>
            ),
            loader: (meta) =>
              import("./pages/My-Products").then((module) =>
                module.loader(meta)
              ),
          },
          {
            path: "add-product",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <AddProductpage />
                </Suspense>
              </ProtectedRoute>
            ),
            action: (meta) =>
              import("./components/Product/ProductForm").then((module) =>
                module.action(meta)
              ),
          },
          {
            path: ":productID/edit",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <EditProductpage />
                </Suspense>
              </ProtectedRoute>
            ),
            action: (meta) =>
              import("./components/Product/ProductForm").then((module) =>
                module.action(meta)
              ),
          },
        ],
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Fallback />}>
            <Cartpage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Fallback />}>
              <OrdersPage />
            </Suspense>
          </ProtectedRoute>
        ),
        loader: (meta) =>
          import("./pages/Orderspage").then((module) => module.loader(meta)),
      },
      {
        path: "invoices",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Fallback />}>
              <InvoicesPage />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            path: ":orderID",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Fallback />}>
                  <Invoice />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Fallback />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<Fallback />}>
            <ResetPass />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
