import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";

// Define the category type
type Category = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
};

type ShopByCategoryProps = {
  categories: Category[];
};

const ShopByCategory: React.FC<ShopByCategoryProps> = ({ categories }) => {
  return (
    <div className="container pb-5">
      <Typography variant="h5" className="text-primary text-uppercase mb-4">
        Shop By Category
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <Card className="shadow-sm border border-primary rounded overflow-hidden position-relative">
              <Box
                position="relative"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pt={4}
                px={4}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "12rem",
                    height: "12rem",
                    bottom: 0,
                    left: 0,
                    marginBottom: "-6rem",
                    marginLeft: "1rem",
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: 0.2,
                  }}
                />
                <a href={`/category/${category.slug}`}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={category.imageUrl}
                    alt={category.title}
                    style={{ objectFit: "contain", cursor: "pointer" }}
                  />
                </a>
              </Box>
              <CardContent className="bg-dark text-white p-3 position-relative">
                <a
                  href={`/category/${category.slug}`}
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-opacity-50 bg-black text-white text-center fw-semibold"
                  style={{
                    fontSize: "1.25rem",
                    textDecoration: "none",
                  }}
                >
                  {category.title}
                </a>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopByCategory;
