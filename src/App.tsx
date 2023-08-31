import React, { useContext, Suspense } from "react";
import "./App.css";
import { Loader } from "./components/Loader/Loader";
import { UserContext } from "./modules/users/users.context";
import { checkRole } from "./modules/users/users.routes";

import { Routes } from "react-router-dom";

function App() {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>{checkRole(userInfo)}</Routes>
      </Suspense>
    </div>
  );
}

export default App;
