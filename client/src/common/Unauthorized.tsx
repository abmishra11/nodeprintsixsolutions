import { Box } from "@mui/material";

const Unauthorized = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="45vw"
    margin="auto"
    className="tp-contact-area pt-85 pb-85"
    >
      <div className="row">
        <div className="col-lg-10">
          <div
            className="section-title-wrapper-two mb-20 wow fadeInUp"
            data-wow-delay=".2s"
          >
            <h4 className="heading-color-black text-center">
              Unauthorized
            </h4>
            <p>You do not have access to this page.</p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Unauthorized;
