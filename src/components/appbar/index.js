import {
  AppBar,
  Container,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import userIcon from "../../assets/icon/user.svg";
import searchIcon from "../../assets/icon/search.svg";
import shoppingBag from "../../assets/icon/shopping-bag.svg";
import heart from "../../assets/icon/heart.svg";
import carretDown from "../../assets/icon/carret - down.svg";
import carretDownWhite from "../../assets/icon/carret-down-white.svg";
import "./index.scss";
import CustomButton from "../button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/loginSlice";

function AppbarCustom() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Dispatch action untuk melakukan logout di Redux state
    dispatch(logoutUser());

    // Hapus data login dari local storage (jika Anda menyimpan token di local storage)
    localStorage.removeItem("token");

    // Redirect ke halaman login
    navigator("/login");
  };

  return (
    <div>
      {" "}
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: "#FFF", color: "#000" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
          <div className="content-wrapper">
            <div className="search-input">
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                margin="normal"
                className="text-field"
              />
              <button className="custom-button">
                <img src={searchIcon} alt="search" />
              </button>
            </div>
            <div>
              <img src={heart} alt="heart" />
            </div>
            <div>
              <img src={shoppingBag} alt="shopping bag" />
            </div>
            <div onClick={handleMenuOpen}>
              <img src={userIcon} alt="user" />
              <img src={carretDown} alt="carret" />
            </div>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className="header">
        <Container style={{ maxWidth: "1300px" }}>
          <div className="content">
            <span>BELANJA</span>
            <img src={carretDownWhite} alt="carret" />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AppbarCustom;
