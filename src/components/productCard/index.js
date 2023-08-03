import React, { useState } from "react";
import starIcon from "../../assets/icon/star.svg";
import heart from "../../assets/icon/heart.svg";
import shoppingBag from "../../assets/icon/shopping-bag.svg";
import "./index.scss";
import { FormatRupiah } from "@arismun/format-rupiah";

function ProductCard({ title, subTitle, price, images, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="product"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <img className="images" src={images} alt="product1" />
        {isHovered && (
          <div className="hover-buttons">
            <img src={heart} alt="heart" />
            <img src={shoppingBag} alt="shoppingBag" />
            <div className="details-text" onClick={props.handleDetailPage}>
              Details
            </div>
          </div>
        )}
      </div>
      <div className="title">{title}</div>
      <div className="sub-title">{subTitle}</div>
      <div className="rating">
        <img src={starIcon} alt="star" />
        <img src={starIcon} alt="star" />
        <img src={starIcon} alt="star" />
        <img src={starIcon} alt="star" />
        <img src={starIcon} alt="star" />
        <span>{"(7)"}</span>
      </div>
      <div className="price">
        <FormatRupiah value={parseInt(price)} />
      </div>
    </div>
  );
}

export default ProductCard;
