import { PersonAdd } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthBox } from "../components/AuthBox";
import { auth, googleProvider } from "../config/Firebase";

type SignUpFormTypes = {
  setIsSignInFormActive: React.Dispatch<React.SetStateAction<boolean>>;
};

type CreateUserWithEmailType = {
  name: string;
  email: string;
  password: string;
};

export const SignUpForm = ({ setIsSignInFormActive }: SignUpFormTypes) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    if (auth?.currentUser) navigate("/home");
  };

  const signUpWithEmailAndPassword = ({
    name,
    email,
    password,
  }: CreateUserWithEmailType) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => updateProfile(result.user, { displayName: name }))
      .catch((error) => {
        console.error(error);
        console.log(error.message);
        setError(error.message);
      });
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
      <Typography>Sign Up with: </Typography>
      <AuthBox onClick={signInWithGoogle}>
        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
        <Typography>Google</Typography>
      </AuthBox>

      <Typography> Or </Typography>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required(),
          email: Yup.string().email("Invalid email address").required(),
          password: Yup.string()
            .required("Password is required")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
              "Please enter a stronger password"
            ),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Password is required"),
        })}
        onSubmit={async (values, props) => {
          console.log(values);
          console.log(props);

          signUpWithEmailAndPassword(values);
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
                htmlFor="name-input"
                error={touched.name && Boolean(errors.name)}
              >
                Enter Your Name
              </InputLabel>
              <Input
                name="name"
                id="email-input"
                value={values?.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
              />
            </FormControl>

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
                type="password"
              />
            </FormControl>

            <FormControl variant="standard" sx={{ margin: 1, width: "40ch" }}>
              <InputLabel
                htmlFor="confirmPassword-input"
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
              >
                Confirm Your Password
              </InputLabel>
              <Input
                name="confirmPassword"
                id="confirmPassword-input"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                type="password"
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={isSubmitting}
                variant="contained"
                endIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} sx={{ color: "#121212" }} />
                  ) : (
                    <PersonAdd />
                  )
                }
                type="submit"
              >
                Sign Up
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
        <Typography>Already have an account?</Typography>
        <Link
          onClick={() => setIsSignInFormActive((prev) => !prev)}
          sx={{
            cursor: "pointer",
          }}
        >
          Sign In Now!
        </Link>
      </Box>
    </Box>
  );
};
