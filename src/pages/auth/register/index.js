import React, { useState } from "react";
import CustomButton from "../../../components/button";
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./index.scss";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/actions/auth/register";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nama_depan: "",
    nama_belakang: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [formDataError, setFormDataError] = useState({});

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleNextStep = () => {
    if (
      step === 1 &&
      formData["nama_depan"] &&
      formData["nama_belakang"] &&
      formData["email"]
    ) {
      setStep(2);
      setFormDataError({});
    } else if (step === 1) {
      const stepOneError = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key].trim() === "") {
          stepOneError[key] = `${key} field is required`;
        }
      });
      setFormDataError(stepOneError);
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Hapus error yang terkait dengan input yang diubah
    setFormDataError((prevFormDataError) => ({
      ...prevFormDataError,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    if (
      formData["confirm_password"] &&
      formData["password"] &&
      formData["phone"]
    ) {
      if (formData["confirm_password"] === formData["password"]) {
        const name = `${formData.nama_depan} ${formData.nama_belakang}`;

        const dataToSubmit = {
          ...formData,
          name: name.trim(), // Pastikan menghapus spasi di awal dan akhir nama
        };

        delete dataToSubmit.confirm_password;
        delete dataToSubmit.nama_depan;
        delete dataToSubmit.nama_belakang;
        setIsLoading(true);
        setTimeout(() => {
          console.log(dataToSubmit, "done");
          dispatch(registerUser(dataToSubmit));
          setIsLoading(false);
          navigator("/login");
        }, 2000);
      } else {
        const stepOneError = {};
        stepOneError.confirm_password = "Harus sama dengan password";
        stepOneError.password = "confirm password tidak sama";
        setFormDataError(stepOneError);
      }
    } else {
      const stepOneError = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key].trim() === "") {
          stepOneError[key] = `${key} field is required`;
        }
      });
      setFormDataError(stepOneError);
    }
  };

  return (
    <Card
      className={`login-card ${step === 2 ? "step-entering" : ""}`}
      elevation={0}
    >
      <CardContent>
        {step === 1 && (
          <Typography
            className="title"
            variant="h5"
            component="h2"
            gutterBottom
          >
            Daftar Sekarang
          </Typography>
        )}
        {step === 2 && (
          <Typography
            className="title"
            variant="h5"
            component="h2"
            gutterBottom
            onClick={handleBackStep}
            style={{ cursor: "pointer" }}
          >
            <ArrowBack /> Kembali
          </Typography>
        )}
        <form>
          {step === 1 && (
            <>
              <TextField
                label="Nama Depan"
                name="nama_depan"
                variant="outlined"
                fullWidth
                margin="normal"
                className={`login-text-field ${
                  formDataError["nama_depan"] ? "error" : ""
                }`}
                onChange={handleChange}
              />
              {formDataError["nama_depan"] && (
                <span className="error-text">
                  {formDataError["nama_depan"]}
                </span>
              )}

              <TextField
                label="Nama Belakang"
                name="nama_belakang"
                variant="outlined"
                fullWidth
                margin="normal"
                className={`login-text-field ${
                  formDataError["nama_belakang"] ? "error" : ""
                }`}
                onChange={handleChange}
              />
              {formDataError["nama_belakang"] && (
                <span className="error-text">
                  {formDataError["nama_belakang"]}
                </span>
              )}

              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                className={`login-text-field ${
                  formDataError["email"] ? "error" : ""
                }`}
                onChange={handleChange}
              />
              {formDataError["email"] && (
                <span className="error-text">{formDataError["email"]}</span>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <TextField
                label="Nomor Telepon"
                name="phone"
                variant="outlined"
                fullWidth
                margin="normal"
                className={`login-text-field ${
                  formDataError["phone"] ? "error" : ""
                }`}
                onChange={handleChange}
              />
              {formDataError["phone"] && (
                <span className="error-text">{formDataError["phone"]}</span>
              )}

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                size="medium"
                margin="normal"
                className={`login-text-field ${
                  formDataError["password"] ? "error" : ""
                }`}
                onChange={handleChange}
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
              {formDataError["password"] && (
                <span className="error-text">{formDataError["password"]}</span>
              )}

              <TextField
                label="Konfirmasi Password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                size="medium"
                margin="normal"
                className={`login-text-field ${
                  formDataError["confirm_password"] ? "error" : ""
                }`}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleToggleConfirmPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showConfirmPassword ? (
                          <span className="show-hide-password">Show</span>
                        ) : (
                          <span className="show-hide-password">Hide</span>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formDataError["confirm_password"] && (
                <span className="error-text">
                  {formDataError["confirm_password"]}
                </span>
              )}
            </>
          )}
          <Divider style={{ height: "39px" }} />
          {step === 1 && (
            <CustomButton
              fullWidth
              paddingProp={"21px"}
              onClick={handleNextStep}
            >
              Selanjutnya
            </CustomButton>
          )}
          {step === 2 && (
            <CustomButton fullWidth paddingProp={"21px"} onClick={handleSubmit}>
              {isLoading ? "Loading ..." : "Daftar"}
            </CustomButton>
          )}
          <div className="register-link">
            <hr />
            <Typography
              variant="body2"
              className="daftar-sekarang"
              color="textSecondary"
            >
              Sudah punya akun?
              <span onClick={() => navigator("/login")}>Masuk</span>
            </Typography>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
