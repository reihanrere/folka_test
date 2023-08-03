// File: CustomButton.js

import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import "./index.scss";

function CustomButton({
  color,
  borderRadiusProp,
  fontColorProp,
  paddingProp,
  boxShadowProp,
  borderProp,
  ...props
}) {
  const buttonColor = color || "#EB3F36";
  const borderRadius = borderRadiusProp || "7px";
  const fontColor = fontColorProp || "#FFF";
  const boxShadow = boxShadowProp || "0px 7px 6px 0px rgba(0, 0, 0, 0.17)";
  const border = borderProp || "";

  return (
    <Button
      className="custom-button"
      style={{
        backgroundColor: buttonColor,
        borderRadius: borderRadius,
        color: fontColor,
        boxShadow: boxShadow,
        padding: paddingProp,
        fontFamily: "Montserrat",
        border: border,
        fontSize: "18px",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

CustomButton.propTypes = {
  color: PropTypes.string,
  borderRadiusProp: PropTypes.string,
  fontColorProp: PropTypes.string,
  paddingProp: PropTypes.string,
};

export default CustomButton;
