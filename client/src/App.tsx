import React from "react";
import { Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "./util/routes";

function App() {
  return (
    <>
      <Routes>
        {PAGE_ROUTES.map(({ pathname, element }) => (
          <Route path={pathname} element={element} key={pathname} />
        ))}
      </Routes>
    </>
  );
}

export default App;
