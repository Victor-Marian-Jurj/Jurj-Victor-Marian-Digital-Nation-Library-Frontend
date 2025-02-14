import React from "react";
import UserLayout from "./pages/user/layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check login status

  return isAdmin ? <AdminLayout /> : <UserLayout />; // Switch layout dynamically
}

export default App;
