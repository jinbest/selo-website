import React, { useRef } from "react";
import Loading from "../../components/Loading";
import { Form, Formik } from "formik";
import { FormGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { signupInitialValue, notification } from "../../service/data/constant";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const SignupForm = (props) => {
  const formikRef = useRef(null);
  const history = useHistory();
  const delayTime = 2000;

  const onSave = (values, actions) => {
    actions.setSubmitting(true);
    setTimeout(() => {
      if (values.password === values.confPass) {
        props.setToastParams({
          msg: notification.success.signup,
          isSuccess: true,
        });
        authStore.setIsSigned(true);
        authStore.setUser({
          username: values.username,
          email: values.email,
          password: values.password,
        });
        actions.setSubmitting(false);
        history.push("/");
      } else {
        props.setToastParams({
          msg: notification.error.signup,
          isError: true,
        });
        actions.setSubmitting(false);
      }
    }, delayTime);
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Must be at least 8 characters.")
      .max(32, "Must be 32 characters or less."),
    confPass: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <>
      <Formik
        initialValues={signupInitialValue}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={signupSchema}
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
                id="email"
                name="email"
                InputLabelProps={{ required: false }}
                value={values.email}
                error={!!(errors.email && touched.email)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
                placeholder={"EMAIL ..."}
                type="email"
                variant="outlined"
                margin="dense"
                helperText={errors.email && touched.email && errors.email}
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

            <FormGroup className="form-group">
              <TextField
                id="confPass"
                name="confPass"
                InputLabelProps={{ required: false }}
                value={values.confPass}
                error={!!(errors.confPass && touched.confPass)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("confPass", e.target.value);
                }}
                placeholder={"CONFIRM PASSWORD ..."}
                type="password"
                variant="outlined"
                margin="dense"
                helperText={
                  errors.confPass && touched.confPass && errors.confPass
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
                <>{"sign up"}</>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(SignupForm);
