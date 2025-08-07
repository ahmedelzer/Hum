import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemToCart } from "./AddItemToCart";

export const useCartItemHandler = (item, fieldsType) => {
  const dispatch = useDispatch();
  const schemaActions = useSelector((state) => state.menuItem.schemaActions);
  const cart = useSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false);

  const haveOnCart = cart.find(
    (value) => value[fieldsType.idField] === item[fieldsType.idField]
  );
  const quantity = haveOnCart?.[fieldsType.cardAction] || 0;

  const updateCart = useCallback(
    async (quantityChange) => {
      await AddItemToCart(
        { ...item, [fieldsType.cardAction]: quantityChange },
        setLoading,
        dispatch,
        fieldsType,
        schemaActions,
        quantity + quantityChange
      );
    },
    [item, dispatch, fieldsType, schemaActions, quantity]
  );

  return { quantity, updateCart, loading };
};
