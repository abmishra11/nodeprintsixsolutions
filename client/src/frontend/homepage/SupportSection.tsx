import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const SupportSection: React.FC = () => {
  const items = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 48 }} />,
      title: "Free Shipping",
      subtitle: "Order Over $200",
    },
    {
      icon: <MonetizationOnIcon sx={{ fontSize: 48 }} />,
      title: "Money Returns",
      subtitle: "30 Days Money Returns",
    },
    {
      icon: <HeadsetMicIcon sx={{ fontSize: 48 }} />,
      title: "24/7 Support",
      subtitle: "Customer Support",
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {items.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 3,
                border: "1px solid",
                borderColor: "primary.main",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              {item.icon}
              <Box>
                <Typography variant="h6" sx={{ textTransform: "capitalize", fontWeight: 500 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.subtitle}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SupportSection;
