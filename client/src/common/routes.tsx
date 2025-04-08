import { createBrowserRouter } from "react-router-dom";
import HomePage from "../frontend/homepage";
import Layout from "./Layout";
import About from "../frontend/about";
import Services from "../frontend/services";
import ContactUs from "../frontend/contact";
import Blogs from "../frontend/blogs";
import ServiceDetails from "./ServiceDetails";
import RegularCleaning from "../frontend/services/RegularCleaning";
import CommercialCleaning from "../frontend/services/CommercialCleaning";
import StrataCleaning from "../frontend/services/StrataCleaning";
import DeepCleaning from "../frontend/services/DeepCleaning";
import MoveInOutCleaning from "../frontend/services/MoveInOutCleaning";
import PostConstructionCleaning from "../frontend/services/PostConstructionCleaning";
import PreSaleCleaning from "../frontend/services/PreSaleCleaning";
import ParkadeCleaning from "../frontend/services/ParkadeCleaning";
import ShowHomeCleaning from "../frontend/services/ShowHomeCleaning";
import JunkRemovalCleaning from "../frontend/services/JunkRemovalCleaning";
import PriorityCleaning from "../frontend/services/PriorityCleaning";
import LaundryServices from "../frontend/services/LaundryServices";
import CookingHelp from "../frontend/services/CookingHelp";
import Login from "../frontend/login";
import Dashboard from "../frontend/dashboard";
import Profile from "../frontend/dashboard/Profile";
import ProtectedRoutes from "../utils/ProtectedRoute";
import Logout from "./Logout";
import DashboardLayout from "../frontend/dashboard/DashboardLayout";
import Blog from "../frontend/dashboard/blog";
import AddPosts from "../frontend/dashboard/blog/AddPosts";
import Categories from "../frontend/dashboard/categories";
import AddCategory from "../frontend/dashboard/categories/AddCategory";
import EditCategory from "../frontend/dashboard/categories/EditCategory";
import EditPost from "../frontend/dashboard/blog/EditPost";
import Job from "../frontend/dashboard/jobs";
import AddJob from "../frontend/dashboard/jobs/AddJob";
import EditJob from "../frontend/dashboard/jobs/EditJob";
import Gallery from "../frontend/dashboard/galleries";
import AddGallery from "../frontend/dashboard/galleries/AddGallery";
import EditGallery from "../frontend/dashboard/galleries/EditGallery";
import Products from "../frontend/dashboard/products";
import AddProduct from "../frontend/dashboard/products/AddProduct";
import EditProduct from "../frontend/dashboard/products/EditProduct";

const frontendRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/regular-cleaning-service",
        element: <RegularCleaning />,
      },
      {
        path: "/services/commercial-cleaning-service",
        element: <CommercialCleaning />,
      },
      {
        path: "/services/strata-cleaning-service",
        element: <StrataCleaning />,
      },
      {
        path: "/services/deep-cleaning-service",
        element: <DeepCleaning />,
      },
      {
        path: "/services/move-in-move-out-cleaning-service",
        element: <MoveInOutCleaning />,
      },
      {
        path: "/services/post-construction-or-post-renovation-cleaning-service",
        element: <PostConstructionCleaning />,
      },
      {
        path: "/services/pre-sale-cleaning-service",
        element: <PreSaleCleaning />,
      },
      {
        path: "/services/parkade-cleaning-service",
        element: <ParkadeCleaning />,
      },
      {
        path: "/services/show-home-cleaning-service",
        element: <ShowHomeCleaning />,
      },
      {
        path: "/services/junk-removal-cleaning-service",
        element: <JunkRemovalCleaning />,
      },
      {
        path: "/services/priority-cleaning-service",
        element: <PriorityCleaning />,
      },
      {
        path: "/services/laundry-service",
        element: <LaundryServices />,
      },
      {
        path: "/services/cooking-help-service",
        element: <CookingHelp />,
      },

      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/adminlogin",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        index:true
      },
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "add-category",
        element: <AddCategory />
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />
      }
    ],
  },
]);

export default frontendRoutes;
