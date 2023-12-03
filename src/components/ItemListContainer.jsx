import Button from "./Button";
import Card from "./Card";
import Like from "./Like";
import PropTypes from "prop-types";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icon";
import { useCart } from "../hooks/useCart";
import useFavorites from "../hooks/useFavorite";
import Filters from "./Filters";
import { useFilters } from "../hooks/useFilters";
import { useTranslation } from "react-i18next";

const ItemListContainer = ({ favorites }) => {
  const { removeFromCart, addToCart } = useCart();

  const { filteredProducts } = useFilters();
  const { likedProducts, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  const renderButton = (product, isProductInCart) => (
    <Button
      onClick={() =>
        isProductInCart ? removeFromCart(product.id) : addToCart(product)
      }
      background={isProductInCart ? "bg-red-500 hover:bg-red-600" : ""}
      text={
        isProductInCart
          ? t("shopping.remove_from_cart")
          : t("shopping.add_to_cart")
      }
      icon={
        isProductInCart ? (
          <RemoveFromCartIcon className={"h-6 w-6"} />
        ) : (
          <AddToCartIcon className={"h-6 w-6 "} />
        )
      }
    />
  );
  const renderLike = (product) => (
    <div onClick={() => toggleFavorite(product)}>
      <Like checked={likedProducts[product.id]} />
    </div>
  );

  return (
    <>
      <Filters />
      <div className="grid justify-items-center justify-center grid-cols-auto-fit-minmax gap-6 p-8">
        <Card
          styles={"w-96 max-[400px]:w-72 flex-col"}
          products={favorites ? favorites : filteredProducts}
          renderButton={renderButton}
          renderLike={renderLike}
        />
      </div>
    </>
  );
};
ItemListContainer.propTypes = {
  favorites: PropTypes.array,
  filters: PropTypes.array,
};
export default ItemListContainer;
