import ItemListContainer from "../components/ItemListContainer";
import { useFilters } from "../hooks/useFilters";

const FavoritePage = () => {
  const { filteredFavorites } = useFilters();

  return <ItemListContainer favorites={filteredFavorites} />;
};
export default FavoritePage;
