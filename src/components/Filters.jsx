import { useEffect, useId } from "react";
import { useFilters } from "../hooks/useFilters";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Filters = () => {
  const { pathname } = useLocation();
  const {
    filters,
    setFilters,
    filteredProducts,
    filteredFavorites,
    setFavoritesFilters,
    resetFilters,
  } = useFilters();

  const minPriceFilterId = useId();
  const isHomePage = pathname === "/";
  const isFavoritesPage = pathname === "/favorites";

  const { t } = useTranslation();

  useEffect(() => {
    if (pathname !== "/" || pathname !== "/favorites") {
      resetFilters();
    }
  }, []);

  const handleChangeMinPrice = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
    setFavoritesFilters((prevState) => ({
      ...prevState,
      minPrice: e.target.value,
    }));
  };
  const handleChangeProduct = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
    setFavoritesFilters((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const noProductsFound = isHomePage && filteredProducts.length === 0;
  const noFavoritesFound = isFavoritesPage && filteredFavorites.length === 0;
  return (
    <section>
      <div className="flex justify-around max-[590px]:flex-col max-[590px]:gap-4 items-center p-4">
        <div className="flex gap-4">
          <label htmlFor={minPriceFilterId}>{t("filters.price")} </label>
          <input
            type="range"
            id={minPriceFilterId}
            min="0"
            max="1200"
            onChange={handleChangeMinPrice}
            value={filters.minPrice}
          />
          <span>€{filters.minPrice}</span>
        </div>
        <div className="flex  max-[590px]:w-full">
          <label className="pr-4" htmlFor="">
            {t("filters.search")}:
          </label>
          <input
            onChange={handleChangeProduct}
            className="bg-[var(--card-border-color)] rounded-md max-[590px]:w-full"
            type="text"
          />
        </div>
      </div>
      <div
        className={
          noFavoritesFound || noProductsFound
            ? "text-center font-bold text-5xl pt-20"
            : "hidden"
        }
      >
        <h1>
          {(noProductsFound && t("filters.products")) ||
            (noFavoritesFound && t("filters.products"))}
        </h1>
      </div>
    </section>
  );
};
export default Filters;
