import { createContext, useState } from "react";
import { User } from "./users.types";
import { userService } from "./users.service";

type userContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User;
  setUserInfo: React.Dispatch<React.SetStateAction<User>>;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<userContextType>(null as any);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    userService.initialUser
  );
  const [userInfo, setUserInfo] = useState<User>(userService.initialUser);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};
