import { useEffect, useState } from "react";
import { getProducts } from "../../api/product";
import { useGlobalState } from "../../context/globalContext";
import { Product } from "../../models";

export const useProducts = () => {
  const { dispatch, state } = useGlobalState();
  const [sorted, setSorted] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const availableProducts = await getProducts();
      dispatch({ type: "AVAILABLE_PRODUCTS", payload: availableProducts });
    };

    if (state.products.length === 0) {
      fetch();
    }
  }, []);

  useEffect(() => {
    const sortedProducts = state.products.sort((a, b) =>
      b.name > a.name ? -1 : 1
    );
    setSorted(sortedProducts);
  }, [state.products]);

  return { products: sorted };
};
