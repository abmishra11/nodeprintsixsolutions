import React from 'react';
import { Breadcrumbs, Link as MUILink, Typography, Box } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface FilterBreadcrumbProps {
  title: string;
}

const FilterBreadcrumb: React.FC<FilterBreadcrumbProps> = ({ title }) => {
  return (
    <Box className="d-flex justify-content-between align-items-center mb-3">
      <Breadcrumbs
        separator={<ChevronRightIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <MUILink href="/" color="primary" underline="hover">
          Home
        </MUILink>
        <Typography color="textPrimary" className="fw-medium text-white">
          {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default FilterBreadcrumb;
