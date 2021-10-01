import jane from "../../assets/img/jane.png";
import { CONSTANTS, ROUTERS } from "./constant";

export const routerItems = [
  {
    name: "Home",
    action: CONSTANTS.NONE,
    route: ROUTERS.home,
  },
  {
    name: "Trends & Statistics",
    action: CONSTANTS.NONE,
    route: ROUTERS.trends,
  },
  {
    name: "Comparables",
    action: CONSTANTS.NONE,
    route: ROUTERS.comparables,
  },
  {
    name: "Your Activity",
    action: CONSTANTS.NONE,
    route: ROUTERS.activity,
  },
  {
    name: "Privacy",
    action: CONSTANTS.NONE,
    route: ROUTERS.privacy,
  },
  {
    name: "About Selo",
    action: CONSTANTS.NONE,
    route: ROUTERS.about,
  },
  {
    name: "My Profile",
    action: CONSTANTS.NONE,
    route: ROUTERS.profile,
  },
  {
    name: "Sign out",
    action: CONSTANTS.SIGNOUT,
    route: ROUTERS.login,
  },
];

export const chartData = [
  {
    label: "diamond",
    value: 115,
    avatar: "",
  },
  {
    label: "emerald",
    value: 205,
    avatar: "",
  },
  {
    label: "ruby",
    value: 272,
    avatar: "",
  },
  {
    label: "platinum",
    value: 341,
    avatar: "",
  },
  {
    label: "gold",
    value: 318,
    avatar: jane,
  },
  {
    label: "silver",
    value: 205,
    avatar: "",
  },
  {
    label: "bronze",
    value: 110,
    avatar: "",
  },
  {
    label: "copper",
    value: 74,
    avatar: "",
  },
];
