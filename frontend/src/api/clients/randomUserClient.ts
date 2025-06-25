import axios from "axios";

export const randomUserClient = axios.create({
  baseURL: "https://randomuser.me/api",
  params: {
    nat: "br",
  },
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
