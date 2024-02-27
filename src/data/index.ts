import { IUserData } from "../interfaces";

export const userData: IUserData = JSON.parse(
  localStorage.getItem("loggedInUser")!
);
