import React, { useRef } from "react";
import Loading from "../../components/Loading";
import { Form, Formik } from "formik";
import { FormGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react";
import { authStore } from "../../store";
import { signupInitialValue, notification } from "../../service/data/constant";
import * as Yup from "yup";

const SignupForm = (props) => {
  const formikRef = useRef(null);
  const delayTime = 2000;

  const onSave = (values, actions) => {
    actions.setSubmitting(true);
    const user = authStore.user;
    setTimeout(() => {
      if (values.email === user.email || values.username === user.username) {
        props.setToastParams({
          msg: notification.error.exist,
          isError: true,
        });
        actions.setSubmitting(false);
      } else {
        props.setToastParams({
          msg: notification.success.signup,
          isSuccess: true,
        });
        authStore.setIsSigned(true);
        authStore.setUser({
          fullname: values.fullname,
          username: values.username,
          email: values.email,
          password: values.password,
        });
        authStore.setProfile({
          fullname: values.fullname,
          username: values.username,
          avatar: "",
        });
        actions.setSubmitting(false);
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    }, delayTime);
  };

  const signupSchema = Yup.object().shape({
    fullname: Yup.string().required("Full name is required."),
    username: Yup.string().required("Username is required."),
    email: Yup.string().email("Invalid email.").required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password is too weak."
      )
      .min(8, "Must be at least 8 characters.")
      .max(32, "Must be 32 characters or less."),
    confPass: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must be matched."
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
                id="fullname"
                name="fullname"
                InputLabelProps={{ required: false }}
                value={values.fullname}
                error={!!(errors.fullname && touched.fullname)}
                className="form-control"
                onChange={(e) => {
                  setFieldValue("fullname", e.target.value);
                }}
                placeholder="FULL NAME ..."
                type="text"
                variant="outlined"
                margin="dense"
                helperText={
                  errors.fullname && touched.fullname && errors.fullname
                }
              />
            </FormGroup>

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
