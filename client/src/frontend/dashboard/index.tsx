import React from "react";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import { CalendarToday, AttachMoney, List, ChatBubble, MoreVert } from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const stats = [
  { title: "Today Sales", value: 100, icon: <CalendarToday />, bgcolor: "primary.main" },
  { title: "This Week Sales", value: 700, icon: <AttachMoney />, bgcolor: "success.main" },
  { title: "This Month Sales", value: 3000, icon: <List />, bgcolor: "info.main" },
  { title: "All Time Sales", value: 50000, icon: <ChatBubble />, bgcolor: "warning.main" },
];

const StatCard = ({ title, value, icon, bgcolor }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ bgcolor, color: "white", boxShadow: 3 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {icon}
        <div>
          <Typography variant="subtitle2" color="white" gutterBottom>
            {title.toUpperCase()}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </div>
      </CardContent>
    </Card>
  </Grid>
);

const barChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales ($)",
      data: [1200, 1900, 3000, 5000, 2200, 4300],
      backgroundColor: "#1976d2",
    },
  ],
};

const pieChartData = {
  labels: ["Direct", "Social", "Referral"],
  datasets: [
    {
      data: [40, 35, 25],
      backgroundColor: ["#1976d2", "#2e7d32", "#0288d1"],
    },
  ],
};

const Dashboard = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom color="textPrimary">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Recent Sales Trends
              </Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Traffic Sources
              </Typography>
              <Doughnut data={pieChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;