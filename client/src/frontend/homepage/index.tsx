import { Container, Grid, Button, Typography, Grid2, Box } from "@mui/material";
import SliderBg3 from "../../assets/img/slider/slider-bg-3.jpg";
import SliderImg3 from "../../assets/img/before-after/3.webp";
import SliderImg2 from "../../assets/img/before-after/2.webp";
import SliderImg1 from "../../assets/img/before-after/1.webp";
import BlogImg7 from "../../assets/img/blog/blog-img-7.jpg";
import BlogImg8 from "../../assets/img/blog/blog-img-8.jpg";
import BlogImg9 from "../../assets/img/blog/blog-img-9.jpg";
import Testimonial from "../../common/Testimonial";
import { Link } from "react-router-dom";
import Service from "../../common/service";
import { serviceList_servicePage } from "../../config/constants";
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
