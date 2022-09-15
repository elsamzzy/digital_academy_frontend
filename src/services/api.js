import axios from "axios";

const API = axios.create();
API.defaults.baseURL = "/api/";
const credential = window.localStorage.getItem("currentlyLoggedInUser");
if (credential) {
  const users = JSON.parse(window.localStorage.getItem("users"));
  let token = "";
  users.forEach((value) => {
    if (value.id.toString() === credential) {
      token = `Bearer ${value.token}`;
    }
  });
  API.defaults.headers.common["Authorization"] = token;
}

export default API;
