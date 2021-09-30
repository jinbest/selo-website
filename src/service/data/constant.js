export const loginInitialValue = {
  username: "",
  password: "",
};

export const signupInitialValue = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confPass: "",
};

export const notification = {
  success: {
    login: "You've logged in successfully.",
    signup: "You've been registered successfully.",
  },
  error: {
    login: "Username or password is not matched correctly.",
    signup: "Something went wrong.",
    exist: "This email or username has been registered already.",
  },
};
