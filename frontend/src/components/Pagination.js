import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Pagination.module.css";
import { useState } from "react";

function Pagination({ data }) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(+page);

  const lastPage = Math.ceil(data.totalItems / data.perPage);

  const navigate = useNavigate();

  let pageNr = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNr.push(i);
  }

  const prevHandler = () => {
    if (+page === 1 || +page <= 0) {
      return;
    }
    setCurrentPage(+page - 1);
    if (pathname === "/products") {
      navigate(`/products?page=${currentPage - 1}`);
    } else if (pathname === "/my-products") {
      navigate(`/my-products?page=${currentPage - 1}`);
    } else {
      navigate(`/orders?page=${currentPage - 1}`);
    }
  };
  const nextHandler = () => {
    if (+page >= lastPage) {
      return;
    }
    setCurrentPage(+page + 1);
    if (pathname === "/products") {
      navigate(`/products?page=${currentPage + 1}`);
    } else if (pathname === "/my-products") {
      navigate(`/my-products?page=${currentPage + 1}`);
    } else {
      navigate(`/orders?page=${currentPage + 1}`);
    }
  };
  const pageHandler = (e) => {
    const clickedPage = e.target.value;
    setCurrentPage(+clickedPage);
    if (pathname === "/products") {
      navigate(`/products?page=${clickedPage}`);
    } else if (pathname === "/my-products") {
      navigate(`/my-products?page=${clickedPage}`);
    } else {
      navigate(`/orders?page=${clickedPage}`);
    }
  };

  return (
    <>
      <div className={classes.paginator}>
        <div className={classes.controls}>
          {data.totalItems !== 0 && +page >= 1 && (
            <button className={classes["control-button"]} onClick={prevHandler}>
              <i className="fa-solid fa-circle-chevron-left fa-2xl"></i>
            </button>
          )}
          {pageNr.map((num) => (
            <button
              key={num}
              className={`${classes.control} ${
                +page === num ? classes.active : ""
              }`}
              onClick={pageHandler}
              value={num}
            >
              {num}
            </button>
          ))}
          {+page <= lastPage && (
            <button className={classes["control-button"]} onClick={nextHandler}>
              <i className="fa-solid fa-circle-chevron-right fa-2xl"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Pagination;
