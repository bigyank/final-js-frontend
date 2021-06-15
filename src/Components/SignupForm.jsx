import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import { auth } from "../redux/user";
import { useAuth } from "../hooks/useAuth";

const validator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  fullName: yup.string().required(),
});

const formInitValues = {
  email: "",
  password: "",
  fullName: "",
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const { mutate: signupMutate } = useAuth("signup");

  const handleSignup = (values, { setSubmitting }) => {
    signupMutate(
      { path: "/auth/signup", credentials: values },
      {
        onSuccess: (data) => {
          setSubmitting(false);
          dispatch(auth(data));
        },
        onError: (error) => setSubmitting(false),
      }
    );
  };

  return (
    <Formik
      initialValues={formInitValues}
      validationSchema={validator}
      onSubmit={handleSignup}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Box mb={3}>
            <Field
              component={TextField}
              variant="outlined"
              name="fullName"
              type="text"
              label="full name"
              fullWidth
            />
          </Box>
          <Box mb={3}>
            <Field
              component={TextField}
              variant="outlined"
              name="email"
              type="email"
              label="Email"
              fullWidth
            />
          </Box>
          <Box mb={3}>
            <Field
              component={TextField}
              variant="outlined"
              type="password"
              label="Password"
              name="password"
              fullWidth
            />
          </Box>

          {isSubmitting && <LinearProgress />}

          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Continue
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
