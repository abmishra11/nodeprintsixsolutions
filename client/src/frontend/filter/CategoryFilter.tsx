import React, { useState, useMemo } from "react";
import { Typography, IconButton, Collapse, Link as MuiLink } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Category {
  id: string;
  title: string;
  slug: string;
  parentId?: string | null;
  products: { id: string }[];
}

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryFilter: React.FC<Props> = ({ categories = [], slug = "" }) => {
  const parentCategories = useMemo(
    () => categories.filter((cat) => !cat.parentId),
    [categories]
  );
  console.log("parentCategories: ", parentCategories);
  
  const subCategories = useMemo(
    () => categories.filter((cat) => cat.parentId),
    [categories]
  );
  console.log("subCategories: ", subCategories);

  const getTotalProductCount = (parentId: string) => {
    const parent = parentCategories.find((cat) => cat.id === parentId);
    const children = subCategories.filter((sub) => sub.parentId === parentId);

    const childCount = children.reduce((sum, sub) => sum + sub.products.length, 0);
    return (parent?.products.length || 0) + childCount;
  };

  const loadedSubCategory = subCategories.find((cat) => cat.slug === slug);
  const initialParentId = loadedSubCategory ? loadedSubCategory.parentId : null;

  const [visibleCategory, setVisibleCategory] = useState<string | null>(initialParentId || null);

  const toggleSubcategories = (parentId: string) => {
    setVisibleCategory((prev) => (prev === parentId ? null : parentId));
  };

  return (
    <div className="p-3">
      <Typography variant="h6" className="mb-3">
        Categories
      </Typography>
      {parentCategories.map((parent) => {
        const isExpanded = visibleCategory === parent.id;
        const hasChildren = subCategories.some((sub) => sub.parentId === parent.id);

        return (
          <div key={parent.id} className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <MuiLink
                href={`/category/${parent.slug}`}
                underline="hover"
                color={parent.slug === slug ? "primary" : "textSecondary"}
              >
                {parent.title}{" "}
                <span className="ms-1 text-muted">
                  {/* ({getTotalProductCount(parent.id)}) */}
                </span>
              </MuiLink>

              {hasChildren && (
                <IconButton
                  size="small"
                  onClick={() => toggleSubcategories(parent.id)}
                  aria-expanded={isExpanded}
                  aria-label="Expand subcategories"
                >
                  {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </IconButton>
              )}
            </div>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <div className="ms-3 mt-2">
                {subCategories
                  .filter((sub) => sub.parentId === parent.id)
                  .map((sub) => (
                    <div key={sub.id} className="mb-1">
                      <MuiLink
                        href={`/category/${sub.slug}`}
                        underline="hover"
                        color={sub.slug === slug ? "primary" : "textSecondary"}
                      >
                        <ChevronRightIcon fontSize="small" className="me-1" />
                        {sub.title}{" "}
                        <span className="ms-1 text-muted">
                          ({sub.products.length})
                        </span>
                      </MuiLink>
                    </div>
                  ))}
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
