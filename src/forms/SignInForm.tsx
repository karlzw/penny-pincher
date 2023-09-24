import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Form, Formik } from "formik";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthBox } from "../components/AuthBox";
import { auth, googleProvider } from "../config/Firebase";

type SignInFormTypes = {
  setIsSignInFormActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignInForm = ({ setIsSignInFormActive }: SignInFormTypes) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    if (auth?.currentUser) navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "1rem",
      }}
    >
      {error.length !== 0 && (
        <Alert variant="outlined" severity="error">
          {error.split(":").at(1)}
        </Alert>
      )}

      <Typography variant="h3">Penny Pincher</Typography>
      <Typography>Sign in with: </Typography>
      <AuthBox onClick={signInWithGoogle}>
        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
        <Typography>Google</Typography>
      </AuthBox>

      <Typography> Or </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address").required(),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((result) => {
              if (result?.user) navigate("/dashboard");
            })
            .catch((error) => {
              console.log(error);
              setError(error.message);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <FormControl variant="standard" sx={{ margin: 1, width: "40ch" }}>
              <InputLabel
                htmlFor="email-input"
                error={touched.email && Boolean(errors.email)}
              >
                Enter Your Email
              </InputLabel>
              <Input
                name="email"
                id="email-input"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
              />
            </FormControl>

            <FormControl variant="standard" sx={{ margin: 1, width: "40ch" }}>
              <InputLabel
                htmlFor="password-input"
                error={touched.password && Boolean(errors.password)}
              >
                Enter Your Password
              </InputLabel>
              <Input
                name="password"
                id="password-input"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={isSubmitting || !(JSON.stringify(errors) === "{}")}
                variant="contained"
                endIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} sx={{ color: "#121212" }} />
                  ) : (
                    <Login />
                  )
                }
                type="submit"
              >
                Sign In
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.25rem",
        }}
      >
        <Typography>Don't have an account?</Typography>
        <Link
          onClick={() => setIsSignInFormActive((prev) => !prev)}
          sx={{ cursor: "pointer" }}
        >
          Sign Up Free!
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.25rem",
        }}
      >
        <Typography>Forgot password?</Typography>
        <Link href="#" sx={{ cursor: "pointer" }}>
          Reset Password
        </Link>
      </Box>
    </Box>
  );
};
