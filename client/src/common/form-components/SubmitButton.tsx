// SubmitButton.tsx

import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface SubmitButtonProps {
  isLoading?: boolean;
  buttonTitle: string;
  loadingButtonTitle: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  buttonTitle,
  loadingButtonTitle,
}) => {
  return (
    <div className="col-sm-12 mt-3">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        startIcon={!isLoading && <AddIcon />}
        className="me-2"
        sx={{
          backgroundColor: '#1e293b',
          '&:hover': {
            backgroundColor: '#0f172a',
          },
        }}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} color="inherit" className="me-2" />
            {loadingButtonTitle}
          </>
        ) : (
          buttonTitle
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
