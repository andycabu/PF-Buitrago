import { useLocation } from "react-router-dom";
import { formatPrecio } from "../utilities/utilitys";
import Button from "./Button";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";
import Like from "./Like";
import useFavorites from "../hooks/useFavorite";
import ButtonsCart from "./ButtonsCart";
import { useCart } from "../hooks/useCart";

const ItemDetailContainer = () => {
  const { state } = useLocation();
  const { product } = state;
  const { integer, decimals } = formatPrecio(product.price);
  const { removeFromCart, addToCart, checkProductInCart } = useCart();
  const { toggleFavorite, likedProducts } = useFavorites();

  const isProductInCart = checkProductInCart(product);

  return (
    <div className="max-[1500px]:px-4 max-[1500px]:pb-4 flex justify-center ">
      <div onClick={() => toggleFavorite(product)}>
        <Like checked={likedProducts[product.id]} />
      </div>
      <div className="flex max-[584px]:flex-col  rounded-xl bg-[var(--card-background-color)] bg-clip-border shadow-md max-[400px]:text-xs">
        <div className="flex justify-center p-4 overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.title}
            className=" w-[30rem] rounded-xl object-cover "
          />
        </div>
        <div className="flex flex-col justify-around p-6 max-[480px]:gap-4">
          <p className="font-bold text-xl leading-relaxed text-right">
            {integer}
            <sup className="">{decimals}€</sup>
          </p>
          <div className=" mb-2 flex flex-col items-center gap-4 max-w-[500px]">
            <h2 className="">{product.title}</h2>
            <p className="">{product.description}</p>
          </div>
          <div className="flex  max-[820px]:flex-col gap-4 items-center justify-center">
            <div className={isProductInCart && "hidden"}>
              <ButtonsCart product={product} />
            </div>
            <Button
              onClick={() =>
                isProductInCart
                  ? removeFromCart(product.id)
                  : addToCart(product)
              }
              background={isProductInCart ? "bg-red-500 hover:bg-red-600" : ""}
              text={isProductInCart ? "Remove from cart" : "Add to cart"}
              icon={
                isProductInCart ? (
                  <RemoveFromCartIcon className={"h-6 w-6"} />
                ) : (
                  <AddToCartIcon className={"h-6 w-6 "} />
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
