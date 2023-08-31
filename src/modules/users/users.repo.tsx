import axios from "axios";

const getUsers = (params: any) => {
  return axios.get("http://localhost:3030/users", { params });
};

const getCompanies = (params: any) => {
  return axios.get("http://localhost:3030/companies", { params });
};

export const userRepo = {
  getUsers,
  getCompanies,
};
