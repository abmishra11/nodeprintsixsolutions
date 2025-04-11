import React from "react";
import Typography from "@mui/material/Typography";

interface SearchResultsCountProps {
  title: string;
  resultsCount: number;
}

const SearchResultsCount: React.FC<SearchResultsCountProps> = ({ title, resultsCount }) => {
  const getPageFromURL = (): number => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("page") || "1", 10);
  };

  const currentPage = getPageFromURL();
  const pageSize = 12;

  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, resultsCount);

  return (
    <div className="ms-2">
      <Typography variant="body1">
        <span className="text-primary">{title}:</span>{" "}
        <span className="text-light">
          Showing {startRange}-{endRange} of {resultsCount} results
        </span>
      </Typography>
    </div>
  );
};

export default SearchResultsCount;
