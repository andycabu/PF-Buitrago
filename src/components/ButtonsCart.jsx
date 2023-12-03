import PropTypes from "prop-types";
import Button from "./Button";
import { AddIcon, ClearCartIcon, SubtractIcon } from "./Icon";
import { useCart } from "../hooks/useCart";

const ButtonsCart = ({ product }) => {
  const {
    removeFromCart,
    getQuantity,
    updateProductQuantity,
    tempQuantities,
    checkProductInCart,
  } = useCart();

  const quantity = getQuantity(product.id);
  const displayQuantity =
    tempQuantities[product.id] !== undefined
      ? tempQuantities[product.id]
      : quantity;
  const isProductInCart = checkProductInCart(product);
  return (
    <div className="flex gap-1">
      {quantity === 1 && isProductInCart ? (
        <Button
          onClick={() => removeFromCart(product.id)}
          background={"bg-red-500 hover:bg-red-600"}
          icon={<ClearCartIcon className={"h-6 w-6 "} />}
        />
      ) : (
        <Button
          icon={<SubtractIcon />}
          onClick={() => updateProductQuantity(product, -1)}
          background={"bg-red-500 hover:bg-red-600"}
        />
      )}

      <div className="bg-[var(--background-color)] rounded  py-2 px-4     select-none">
        <small>{displayQuantity}</small>
      </div>
      <Button
        icon={<AddIcon />}
        onClick={() => updateProductQuantity(product, 1)}
      />
    </div>
  );
};
ButtonsCart.propTypes = {
  product: PropTypes.any,
};
export default ButtonsCart;
