import React, { useContext } from "react";
import { UserContext } from "../../modules/users/users.context";

const DashboardPage = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <p>welcome {userInfo.name}</p>
    </div>
  );
};

export default DashboardPage;
