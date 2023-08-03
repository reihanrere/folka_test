import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import React, { useState } from "react";

function ProductCategory({ data, title }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="category" onClick={() => setOpen(!open)}>
        <div>{title}</div>
        {open ? <ExpandLess /> : <ExpandMore />}
      </div>
      <Collapse
        className="collapse-category"
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {data?.map((d, i) => (
          <div className="category-content" key={i}>
            <div>
              <input type="checkbox" />
              <span>{d.name}</span>
            </div>
            <div>{`(${d.total})`}</div>
          </div>
        ))}
      </Collapse>
    </div>
  );
}

export default ProductCategory;
