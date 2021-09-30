import { autorun, configure, makeAutoObservable } from "mobx";
import jane from "../assets/img/jane.png";

configure({ enforceActions: "always" });

export class AuthStore {
  isSigned = false;
  user = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };
  profile = {
    fullname: "Jane Smith",
    username: "jmith96",
    avatar: jane,
  };

  constructor() {
    this.load();
    autorun(this.save);
    makeAutoObservable(this);
  }

  save = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        AuthStore.name,
        JSON.stringify({
          isSigned: this.isSigned,
          user: this.user,
          profile: this.profile,
        })
      );
    }
  };

  load = () => {
    if (typeof window !== "undefined") {
      Object.assign(
        this,
        JSON.parse(window.localStorage.getItem(AuthStore.name) || "{}")
      );
    }
  };

  setIsSigned = (isSigned) => {
    this.isSigned = isSigned;
    this.save();
  };

  setUser = (user) => {
    this.user = user;
    this.save();
  };

  setProfile = (profile) => {
    this.profile = profile;
    this.save();
  };

  init = () => {
    this.isSigned = false;
    this.user = {
      username: "",
      email: "",
      password: "",
    };
    this.profile = {
      fullname: "",
      username: "",
      avatar: "",
    };
    this.save();
  };
}

export default new AuthStore();
