import { autorun, configure, makeAutoObservable } from "mobx";

configure({ enforceActions: "always" });

export class AuthStore {
  isSigned = false;
  user = {
    username: "",
    email: "",
    password: "",
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

  init = () => {
    this.isSigned = false;
    this.user = {
      username: "",
      email: "",
      password: "",
    };
    this.save();
  };
}

export default new AuthStore();
