import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/globalContext";

export const useSession = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

  const logout = () => {
    state.shoppingCart.priceWithoutVat = 0;
    state.shoppingCart.products = [];
    state.shoppingCart.total = 0;

    localStorage.removeItem("auth");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return { logout, user: state.userInfo };
};
