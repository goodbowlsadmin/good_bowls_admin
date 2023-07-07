import { UserAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    window.location.href = "/login";
  } else {
    return children;
  }
};

export default ProtectedRoute;
