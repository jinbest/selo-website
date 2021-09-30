import React, { useRef } from "react";
import Loading from "../../components/Loading";
import { Form, Formik } from "formik";
import { FormGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { loginInitialValue, notification } from "../../service/data/constant";
import * as Yup from "yup";

const LoginForm = (props) => {
  const formikRef = useRef(null);
  const delayTime = 2000;

  const onSave = (values, actions) => {
    actions.setSubmitting(true);
    const user = authStore.user;
    setTimeout(() => {
      if (
        values.username === user.username &&
        values.password === user.password
      ) {
        props.setToastParams({
          msg: notification.success.login,
          isSuccess: true,
        });
        authStore.setIsSigned(true);
        actions.setSubmitting(false);
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        props.setToastParams({
          msg: notification.error.login,
          isError: true,
        });
        actions.setSubmitting(false);
      }
    }, delayTime);
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password is too weak."
      )
      .min(8, "Must be at least 8 characters.")
      .max(32, "Must be 32 characters or less."),
  });

  return (
    <>
      <Formik
        initialValues={loginInitialValue}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={loginSchema}
        innerRef={formikRef}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Form className="sign-form">
            <FormGroup className="form-group">
              <TextField
                id="username"
                name="username"
                InputLabelProps={{ required: false }}
                value={values.username}
                error={!!(errors.username && touched.username)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("username", e.target.value);
                }}
                placeholder="USERNAME ..."
                type="text"
                variant="outlined"
                margin="dense"
                helperText={
                  errors.username && touched.username && errors.username
                }
              />
            </FormGroup>

            <FormGroup className="form-group">
              <TextField
                id="password"
                name="password"
                InputLabelProps={{ required: false }}
                value={values.password}
                error={!!(errors.password && touched.password)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                placeholder={"PASSWORD ..."}
                type="password"
                variant="outlined"
                margin="dense"
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
            </FormGroup>

            <button
              className="sign-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>
                  <Loading />
                </span>
              ) : (
                <>{"log in"}</>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(LoginForm);
