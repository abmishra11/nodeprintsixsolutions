import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Share as ShareIcon } from "@mui/icons-material";
import BreadCrumb from "../../common/BreadCrumb";
import ProductImageCarousel from "../../common/ProductImageCarousel";
import ProductRating from "./ProductRating";
import ProductReview from "../productreview/ProductReview";
import ProductReviewForm from "../productreview/ProductReviewForm";
import CategoryCarousel from "../../common/CategoryCarousel";
import AddToCartButton from "../cart/AddToCartButton";
import { useGetProductBySlugQuery } from "../../redux/services/products";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const { data: productData, isLoading } = useGetProductBySlugQuery(slug);
  const product = productData?.product;
  const category = productData?.product.categoryId;
  if (!productData) return <div className="text-center py-5">Loading...</div>;

  const urlToShare = `/products/${slug}`;
  const productReviews = [];

  return (
    <Container className="py-4">
      <BreadCrumb />
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProductImageCarousel
            productImages={product.productImages}
            thumbnail={product.imageUrl}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" color="primary">{product.title}</Typography>
            <IconButton onClick={() => navigator.clipboard.writeText(urlToShare)}>
              <ShareIcon />
            </IconButton>
          </Box>

          <ProductRating reviews={productReviews} />

          <Typography variant="body1" mt={2}>
            {product.description}
          </Typography>

          <Typography variant="body2" mt={2}>
            <strong>Category: </strong>
            <a href={`/category/${category.slug}`}>
              {category.title}
            </a>
          </Typography>

          <Typography variant="body2" mt={1}>
            <strong>SKU:</strong> {product.sku}
          </Typography>

          <Typography variant="body2" mt={1}>
            <strong>Stock:</strong> {product.productStock}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <Typography variant="h6" color="primary">
              ${product.salePrice}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <del>${product.productPrice}</del>
            </Typography>
          </Box>

          {product.otherDetails && (
            <Box mt={3}>
              <Typography variant="subtitle1" color="primary">
                Other Details:
              </Typography>
              <div
                className="p-3 border"
                dangerouslySetInnerHTML={{ __html: product.otherDetails }}
              />
            </Box>
          )}

          <Box mt={4}>
            <AddToCartButton product={product} />
          </Box>
        </Grid>
      </Grid>

      {similarProducts.length > 0 && (
        <Box className="bg-white shadow p-4 mt-5 rounded">
          <Typography variant="h6" gutterBottom>
            Similar Products
          </Typography>
          <CategoryCarousel products={similarProducts} />
        </Box>
      )}

      <ProductReviewForm
        product={product}
        productReviews={productReviews}
        userId={userData?.id}
        userData={userData}
      />
    </Container>
  );
};

export default ProductDetailPage;
