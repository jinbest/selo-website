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
  schema: {
    fullname: "Full name is required.",
    username: "Username is required.",
    password: {
      required: "Password is required.",
      weak: "Password is too weak.",
      min: "Must be at least 8 characters.",
      max: "Must be 32 characters or less.",
      match: "Passwords must be matched.",
    },
    email: {
      invalid: "Invalid email.",
      required: "Email is required.",
    },
  },
};

export const CONSTANTS = {
  SIGNOUT: "signout",
  NONE: "none",
};

export const ROUTERS = {
  home: "/",
  trends: "/trends-statistics",
  comparables: "/comparables",
  activity: "/your-activity",
  privacy: "/privacy",
  about: "/about-selo",
  profile: "/my-profile",
  login: "/login",
  signup: "/signup",
};

export const HelperTexts = {
  SeloScore:
    "This is your SELO Score (SS), which is a standardized representation of your social footprint. it is on a scale of 1-5000 and the greater it is, the greater your social media outreach is.",
  ChartBar:
    "this is a visual representation of your SELO Score and overall position on the global SELO Leaderboard",
  ChartLabel:
    "users are assigned tiers depending on their SELO score, and can move between each one based on your latest current score",
};
