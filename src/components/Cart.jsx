import { ClearCartIcon } from "./Icon";
import Button from "./Button";
import Card from "./Card";
import { formatPrecio } from "../utilities/utilitys";
import Aside from "./Aside";
import ButtonsCart from "./ButtonsCart";
import { useCart } from "../hooks/useCart";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { cart, clearCart, removeFromCart, totalPrice, cartCount } = useCart();

  const { integer, decimals } = formatPrecio(totalPrice);

  const { t } = useTranslation();

  return (
    <Aside id="aside2">
      {cart.length >= 1 && (
        <div>
          <div className="flex flex-col">
            <p className="flex gap-4 pt-4">
              Subtotal
              <span className="font-bold">
                {integer}
                <sup className="">{decimals}€</sup>
              </span>
            </p>
            <Button
              background={"bg-[#FFD814] hover:bg-[#F7CA00]"}
              text={`Checkout (${cartCount} ${
                cartCount > 1 ? "products" : "product"
              })`}
            />
          </div>
          <div className="flex flex-col gap-4 border-y border-solid border-[#444] py-8 my-4 ">
            <Card
              styles={
                "flex w-full max-[400px]:flex-col max-[400px]:items-center"
              }
              products={cart}
              renderButton={(product) => (
                <div className="flex gap-4 max-[490px]:flex-col">
                  <ButtonsCart product={product} />
                  {product.quantity > 1 && (
                    <Button
                      onClick={() => removeFromCart(product.id)}
                      background={"bg-red-500 hover:bg-red-600"}
                      icon={<ClearCartIcon className={"h-6 w-6 "} />}
                    />
                  )}
                </div>
              )}
              text={"flex-col"}
            />
          </div>
        </div>
      )}
      {cart.length === 0 ? (
        <span className="flex items-center justify-center h-full">
          {t("shopping.cart")}
        </span>
      ) : (
        <Button
          background={"bg-red-500 hover:bg-red-600 "}
          onClick={() => {
            clearCart();
          }}
          text={"Remove all"}
          icon={<ClearCartIcon className={"h-6 w-6 "} />}
        />
      )}
    </Aside>
  );
};
export default Cart;
