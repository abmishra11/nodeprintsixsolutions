import HomeBanner from "./HomeBanner";
import SupportSection from "./SupportSection";
import ShopByCategory from "./ShopByCategory";
import { useGetAllCategoriesQuery } from "../../redux/services/categories";

const HomePage = () => {
  const { data: categoriesData, isLoading, isError } = useGetAllCategoriesQuery();
  const categories = categoriesData?.categories || [];
  return (
    <main>
      <HomeBanner />
      <SupportSection />
      <ShopByCategory categories={categories}/>
    </main>
  );
};

export default HomePage;
