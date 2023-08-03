// LoginPage.js

import React, { useState } from "react";
import CustomButton from "../../../components/button";
import {
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/auth/login";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const history = useNavigation;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password.trim() === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (email.trim() !== "" && password.trim() !== "") {
      setIsLoading(true);

      setTimeout(() => {
        dispatch(loginUser({ email, password }));
        setIsLoading(false);
        setEmail("");
        setPassword("");
        // navigate("/", { replace: true });
        setLoginSuccess(true);
      }, 2000);
    }
  };

  if (loginSuccess) {
    return (
      <div>
        <Navigate to="/" replace />
      </div>
    );
  }

  return (
    <Card className="login-card" elevation={0}>
      <CardContent>
        <Typography className="title" variant="h5" component="h2" gutterBottom>
          Masuk
        </Typography>
        {localStorage.getItem("isRegister") && (
          <span className="error-text">Register Success</span>
        )}
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            className={`login-text-field ${emailError ? "error" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              localStorage.removeItem("isRegister");
            }}
            error={emailError}
          />
          {emailError && <span className="error-text">Email is required</span>}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            size="medium"
            margin="normal"
            className={`login-text-field ${passwordError ? "error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleTogglePassword}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? (
                      <span className="show-hide-password">Show</span>
                    ) : (
                      <span className="show-hide-password">Hide</span>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordError && (
            <span className="error-text">Password is required</span>
          )}
          <div className="forgot-password">
            <Typography variant="body2" color="textSecondary">
              Lupa Password?
            </Typography>
          </div>
          <CustomButton
            fullWidth
            paddingProp={"21px"}
            onClick={handleLogin}
            disabled={authState.isLoading}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </CustomButton>
          <div className="register-link">
            <hr />
            <Typography
              variant="body2"
              className="daftar-sekarang"
              color="textSecondary"
            >
              Belum punya akun?
              <span onClick={() => navigate("/register")}>Daftar Sekarang</span>
            </Typography>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
