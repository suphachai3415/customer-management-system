import React from "react";
import { Link } from "@inertiajs/react";
import CIcon from "@coreui/icons-react";
import { cilHome } from "@coreui/icons";

export default function PageHeader({ title, breadcrumbs = [] }) {
  return (
    
      <div>
        <h5 className="fw-semibold text-dark mb-1">{title}</h5>
        <div className="text-muted small d-flex align-items-center gap-2">
          <CIcon icon={cilHome} size="sm" />
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <span>/</span>
              {breadcrumb.href ? (
                <Link
                  href={breadcrumb.href}
                  className="text-decoration-none text-primary fw-semibold"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="badge bg-light-primary text-primary fw-semibold">
                  {breadcrumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
 
  );
}
