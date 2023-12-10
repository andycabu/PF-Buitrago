import { useTranslation } from "react-i18next";
import Spinner from "../components/Spinner.jsx";
import { useCart } from "../hooks/useCart.js";
import { formatPrecio } from "../utilities/utilitys.js";
import { useUsers } from "../hooks/useUsers.js";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
  const { buys } = useCart();
  const { user } = useUsers();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();
  if (!buys || buys.length === 0) {
    return <Spinner />;
  }

  const products = buys?.simplifiedCart;
  const totalPrice = products.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);
  const { integer, decimals } = formatPrecio(totalPrice);

  const purchaseDate = buys?.createdAt;
  const formattedDate =
    purchaseDate instanceof Date
      ? purchaseDate.toLocaleDateString(currentLanguage, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">Gracias por su compra</h1>
        <p>Numero de pedido: {buys.orderId}</p>
        <p>Pedido realizado: {formattedDate}</p>
        <br />
        <br />
        <p className="capitalize">{user.displayName}</p>
        <p className="max-w-md">
          Hemos recibido tu pedido correctamente. Tu pedido se está procesando;
          te enviaremos un correo electrónico en cuanto lo enviemos. Gracias por
          comprar con andycabustore.
        </p>
        <div className="pt-8">
          <h2>Resumen de tu pedido:</h2>
          <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs  uppercase ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Artículo
                </th>
                <th scope="col" className="py-3 px-6">
                  Cantidad
                </th>
                <th scope="col" className="py-3 px-6">
                  Precio Total
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const { integer, decimals } = formatPrecio(
                  product.quantity * product.price
                );
                return (
                  <tr
                    key={product.id}
                    className=" border-y bg-[var(--card-background-color)] border-[var(--text-color)]"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img
                          onClick={() => {
                            navigate(`/item/${product.id}`, {
                              state: { product },
                            });
                          }}
                          className="h-16 mr-4 cursor-pointer"
                          src={product.image}
                          alt={product.title}
                        />
                        {product.title}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {product.quantity}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold">
                        {integer}
                        <sup>€{decimals}</sup>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="capitalize text-right pt-4">
            total pedido:
            <span className="font-bold">
              {integer}
              <sup>€{decimals}</sup>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
