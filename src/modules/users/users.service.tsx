import { localStorageService } from "../../utils/localStorageService";
import { sessionStorageService } from "../../utils/sessionStorageService";
import { userRepo } from "./users.repo";

class UserService {
  getUsers = (params: any) => {
    return userRepo.getUsers(params);
  };
  getCompanies = (params: any) => {
    return userRepo.getCompanies(params);
  };

  checkIfUserExists = (users: [], name: string, password: string) => {
    return users.find(
      (user: any) => user.name === name && user.password === password
    );
  };
  returnUser = (users: [], name: string, password: string) => {
    return users.filter(
      (user: any) => user.name === name && user.password === password
    )[0];
  };
  checkCredentials = async (name: string, password: string) => {
    const users = await this.getUsers(null);
    if (this.checkIfUserExists(users.data, name, password))
      return this.returnUser(users.data, name, password);
    else throw new Error("Wrong credentials");
  };
  sessionUser = sessionStorageService.get("user");
  localUser = localStorageService.get("user");
  initialUser = this.localUser
    ? this.localUser
    : this.sessionUser
    ? this.sessionUser
    : null;
}

export const userService = new UserService();
