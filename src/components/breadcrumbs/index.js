import React from "react";
import chevronsRight from "../../assets/icon/chevrons-right.svg";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function BreadcrumbsCustom({ data }) {
  const navigator = useNavigate();
  return (
    <div>
      <div className="breadcrumbs">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {data.length === index + 1 ? (
              <span className="active-page">{item}</span>
            ) : (
              <span
                onClick={() => index === 0 && navigator("/")}
                style={{ cursor: "pointer" }}
              >
                {item}
              </span>
            )}
            {index < data.length - 1 && (
              <img src={chevronsRight} alt="chevrons right" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default BreadcrumbsCustom;
