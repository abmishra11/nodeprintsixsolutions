import { Container, Typography } from "@mui/material";

const DashboardFooter = () => {
  return (
    <footer className="mt-4 py-3 border-top" style={{ backgroundColor: "#263238" }}>
      <Container className="text-center">
        <Typography variant="body2" color="white">
          &copy; UHC {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
};

export default DashboardFooter;

