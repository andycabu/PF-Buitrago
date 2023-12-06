import { HeartIcon, MenuIcon, UserIcon } from "./Icon";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import DayNight from "./DayNight";
import { useEffect, useState } from "react";
import Aside from "./Aside";
import { useAside } from "../hooks/useAside";
import Dropdown from "./Dropdown";
import CartWidget from "./CartWidget";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProduct";
import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "react-i18next";
import Language from "./Language";

const Navbar = () => {
  const { favorites } = useProducts();
  const { cartCount } = useCart();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { toggleAside } = useAside();
  const { user, handleSignOut } = useUsers();
  const { t } = useTranslation();
  const displayName = user?.displayName;

  const itemsNabar = [
    {
      id: 1,
      text: t("nav.home"),
      link: "/",
    },
    {
      id: 2,
      dropdown: <Dropdown />,
    },
    {
      id: 3,
      text: t("nav.contact"),
      link: "/contact",
    },
  ];
  useEffect(() => {
    setFavoriteCount(favorites.length);
  }, [favorites]);

  return (
    <>
      <header className="relative">
        <nav className="flex fixed z-[101] w-full max-w-[1500px] justify-between bg-[var(--card-background-color)] box-shadow-1">
          <div className="max-md:hidden flex flex-col absolute gap-8 right-[13px] top-[5px]">
            <DayNight />
          </div>
          <div className="max-md:hidden flex flex-col absolute gap-8 -right-[26px] top-[62px]">
            <Language />
          </div>
          <div className="px-12 max-md:px-4 py-6 flex w-full items-center justify-between">
            <Link className="text-3xl font-bold font-heading" to={"/"}>
              <img className="h-12 rounded-full" src={logo} alt="" />
            </Link>

            <ul className="hidden md:flex px-4 mx-auto items-center font-semibold font-heading space-x-12">
              {itemsNabar.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className=" cursor-pointer hover:text-[var(--text-color-hover)]   "
                  >
                    {item.text}
                  </Link>
                  {item.arrow}
                  {item.dropdown}
                </li>
              ))}
            </ul>
            <div className="flex   space-x-5 items-center ">
              <div className="flex  space-x-5 items-center">
                <Link to={!user && "login"}>
                  {displayName ? displayName : "Login"}
                </Link>
                <button className={!user && "hidden"} onClick={handleSignOut}>
                  out
                </button>
                <Link
                  to="/favorites"
                  className="hover:text-[var(--text-color-hover)]  relative"
                  href="#"
                >
                  <HeartIcon className={"h-6 w-6"} />
                  {favoriteCount > 0 && (
                    <span className="absolute -top-[10px] -right-[10px] bg-red-500 text-white rounded-[50%] w-[15px] h-[15px] flex justify-center items-center text-[10px] p-1">
                      {favoriteCount}
                    </span>
                  )}
                </Link>
              </div>
              <div
                onClick={() => toggleAside("aside2")}
                className="relative cursor-pointer"
              >
                <CartWidget />
                {cartCount > 0 && (
                  <span className="absolute -top-[10px] -right-[10px] bg-red-500 text-white rounded-[50%] w-[15px] h-[15px] flex justify-center items-center text-[10px] p-1">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={() => toggleAside("aside1")}
            className="navbar-burger self-center mr-4 md:hidden hover:text-[var(--text-color-hover)]"
          >
            <MenuIcon />
          </div>
        </nav>
      </header>
      <Aside id={"aside1"}>
        <ul className="flex flex-col h-full items-center justify-center gap-8">
          {itemsNabar.map((item) => (
            <li key={item.id} className="border-b border-solid border-[#444]">
              <Link to={item.link}>{item.text}</Link>
              {item.arrow}
              {item.dropdown}
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-8">
          <DayNight />
          <Link className="hover:text-[var(--text-color-hover)]">
            <UserIcon />
          </Link>
          <Language />
        </div>
      </Aside>
    </>
  );
};
export default Navbar;
