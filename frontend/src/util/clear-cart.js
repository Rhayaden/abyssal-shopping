const token = localStorage.getItem("token");
export const clearCart = async () => {
  const res = await fetch("http://localhost:8080/cart/clear-cart", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.json();
};
