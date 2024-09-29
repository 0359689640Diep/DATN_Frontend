import { Navigate } from 'react-router-dom';

// Component có chức năng kiểm tra xem route có token hay không nếu không có thì redirect về trang login
const PrivateRoute = ({children}) => {
  const token = localStorage.getItem("accessToken");
  if (token === null || token === "undefined") {
    return <Navigate to="/login" replace />;
  }
  // Nếu có token thì render component con
  return children;
};

export default PrivateRoute;
