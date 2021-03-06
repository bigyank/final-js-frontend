import React from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";

import { auth } from "../redux/user";
import { useAuth } from "../hooks/useAuth";

const validator = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const formInitValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const { mutate: loginMutate } = useAuth("login");

  const handleLogin = (values, { setSubmitting }) => {
    loginMutate(
      { path: "/auth/login", credentials: values },
      {
        onSuccess: (data) => {
          dispatch(auth(data));
        },
        onError: (error) => {
          const errMessage =
            error.response && error.response.data.error
              ? error.response.data.error.message
              : error.message;
          toast.error(errMessage);
          setSubmitting(false);
        },
      }
    );
  };

  return (
    <Formik
      initialValues={formInitValues}
      validationSchema={validator}
      onSubmit={handleLogin}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
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

export default LoginForm;
