import PropTypes from "prop-types";
import { formatPrecio } from "../utilities/utilitys";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Card = ({ products, styles, renderButton, renderLike, text }) => {
  const { checkProductInCart } = useCart();
  const navigate = useNavigate();

  return products.map((product) => {
    const isProductInCart = checkProductInCart(product);
    const { integer, decimals } = formatPrecio(product.price);

    return (
      <div
        key={product.id}
        className={`relative ${styles} rounded-xl bg-[var(--card-background-color)] bg-clip-border shadow-md max-[400px]:text-xs`}
      >
        {renderLike && renderLike(product)}
        <div
          className="max-[490px]:p-0 p-4 rounded-xl"
          onClick={() => {
            navigate(`/item/${product.id}`, { state: { product } });
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-xl object-cover hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center w-full items-center p-6">
          <div
            className={`${text} mb-2 flex items-center gap-4 justify-between`}
          >
            <p className="font-medium leading-relaxed  truncate max-w-[200px] max-[490px]:max-w-[140px]">
              {product.title}
            </p>
            <p className="font-bold leading-relaxed ">
              {integer}
              <sup className="">{decimals}€</sup>
            </p>
          </div>
          <div>{renderButton && renderButton(product, isProductInCart)}</div>
        </div>
      </div>
    );
  });
};

Card.propTypes = {
  products: PropTypes.array.isRequired,
  styles: PropTypes.string,
  renderButton: PropTypes.func,
  renderLike: PropTypes.func,
  text: PropTypes.string,
};

export default Card;
