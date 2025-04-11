import React from "react";
import { useLocation, Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BreadCrumb() {
  const location = useLocation();
  const pathArr = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="my-3">
      <ol className="breadcrumb d-flex align-items-center">
        <li className="breadcrumb-item">
          <Link to="/" className="text-primary text-decoration-none">
            Home
          </Link>
        </li>
        {pathArr.map((item, index) => {
          const path = "/" + pathArr.slice(0, index + 1).join("/");
          const isLast = index === pathArr.length - 1;
          return (
            <li
              key={index}
              className={`breadcrumb-item d-flex align-items-center ${
                isLast ? "active text-white" : ""
              }`}
              aria-current={isLast ? "page" : undefined}
            >
              <ChevronRightIcon fontSize="small" className="mx-1 text-muted" />
              {isLast ? (
                <span className="text-white text-capitalize">{item}</span>
              ) : (
                <Link
                  to={path}
                  className="text-decoration-none text-capitalize text-primary"
                >
                  {item}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
