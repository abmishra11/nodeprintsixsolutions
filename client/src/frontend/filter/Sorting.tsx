"use client";

import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import SearchResultsCount from "./SearchResultsCount";

interface SortingProps {
  title: string;
  pageUrl: string;
  productsCount: number;
}

interface SortingLink {
  title: string;
  href: string;
  sort: string | null;
}

const Sorting: React.FC<SortingProps> = ({ title, pageUrl, productsCount }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sortParams = searchParams.get("sort");
  const search = searchParams.get("search");

  const generateHref = (baseHref: string, sort: string | null, search: string | null): string => {
    const url = new URL(baseHref, window.location.origin);
    if (sort) {
      url.searchParams.set("sort", sort);
    } else {
      url.searchParams.delete("sort");
    }
    if (search) {
      url.searchParams.set("search", search);
    }
    return url.pathname + url.search;
  };

  const sortingLinks: SortingLink[] = [
    {
      title: "Relevance",
      href: generateHref(pageUrl, null, search),
      sort: null,
    },
    {
      title: "Price High to Low",
      href: generateHref(pageUrl, "desc", search),
      sort: "desc",
    },
    {
      title: "Price Low to High",
      href: generateHref(pageUrl, "asc", search),
      sort: "asc",
    },
  ];

  const handleSortClick = (href: string) => {
    navigate(href);
  };

  return (
    <Box className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
      <Typography variant="h6" className="d-none d-md-block mb-0 text-primary">
        <SearchResultsCount title={title} resultsCount={productsCount} />
      </Typography>

      <Box className="d-flex flex-wrap gap-2">
        {sortingLinks.length > 0 ? (
          sortingLinks.map((link, index) => {
            const isActive = link.sort === sortParams;
            return (
              <Button
                key={index}
                onClick={() => handleSortClick(link.href)}
                variant={isActive ? "contained" : "outlined"}
                color="primary"
                size="small"
              >
                {link.title}
              </Button>
            );
          })
        ) : (
          <Typography variant="body2" color="textSecondary">
            No sorting options available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Sorting;
