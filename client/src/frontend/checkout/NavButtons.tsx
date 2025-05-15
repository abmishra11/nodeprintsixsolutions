import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { setCurrentStep } from "../../redux/reducer/checkout";
import { Button, CircularProgress, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface NavButtonsProps {
  loading: boolean;
}

const NavButtons: React.FC<NavButtonsProps> = ({ loading }) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.checkout.currentStep);

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} mt={2}>
      {currentStep > 1 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          disabled={loading}
          startIcon={!loading && <ChevronLeftIcon />}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Previous"}
        </Button>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        endIcon={!loading && <ChevronRightIcon />}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : "Next"}
      </Button>
    </Stack>
  );
};

export default NavButtons;
