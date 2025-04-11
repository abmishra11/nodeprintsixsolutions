import React, { useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';

interface PaginateProps {
  totalPages: number;
}

const Paginate: React.FC<PaginateProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || '1');
    setCurrentPage(page);
  }, []);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', value.toString());

    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);

    setCurrentPage(value);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
};

export default Paginate;
