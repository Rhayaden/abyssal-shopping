import { useParams } from "react-router-dom";

function Invoice() {
  const params = useParams();
  return <>{params.orderID}</>;
}

export default Invoice;
