import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Login from "./Pages/Login";
import DashboardUser from "./Pages/Client/DashboardUser";
import Register from "./Pages/Register";
import Inventory from "./Pages/Client/InventoryUser";
import Loaning from "./Pages/Client/Loaning";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import InventoryAdm from "./Pages/Admin/InventoryAdm";
import ProfileAdm from "./Pages/Admin/ProfileAdm";
import LoaningAdm from "./Pages/Admin/LoaningAdm";
import UserAdm from "./Pages/Admin/UserAdm";
import ProfileUser from "./Pages/Client/ProfileUser";
import AddItem from "./Pages/Admin/AddItem";
import AddUser from "./Pages/Admin/AddUser";
import InventoryUser from "./Pages/Client/InventoryUser";
import { useAuth } from "./store/auth";
import { jwtDecode } from "jwt-decode";
import InventoriAdmin from "./Pages/Admin/InventoriAdmin";
import FormLoan from "./Pages/Client/FormLoan";

const App = () => {
  const { loginResponse } = useAuth();
  let role;
  let decoded;

  if (loginResponse) {
    const token = loginResponse;
    decoded = jwtDecode(token);
  }

  role = decoded?.isAdmin;

  console.log(role);

  if (role === true) {
    return (
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        <Route path="/InventoryAdm" element={<InventoryAdm />} />
        <Route path="/LoaningAdm" element={<LoaningAdm />} />
        <Route path="/UserAdm" element={<UserAdm />} />
        <Route path="/ProfileAdm" element={<ProfileAdm />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/InventoriAdmin" element={<InventoriAdmin />} />
      </Routes>
    );
  }

  if (role === false) {
    return (
      <Routes>
        <Route path="/" element={<DashboardUser />} />
        <Route path="/InventoryUser" element={<InventoryUser />} />
        <Route path="/Loaning" element={<Loaning />} />
        <Route path="/ProfileUser" element={<ProfileUser />} />
        <Route path="/FormLoan" element={<FormLoan />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
