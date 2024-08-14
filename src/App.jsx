import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Login from "./Pages/Login";
import DashboardUser from "./Pages/Client/DashboardUser";
import Register from "./Pages/Register";
import Inventory from "./Pages/Client/Inventory";
import Loaning from "./Pages/Client/Loaning";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import InventoryAdm from "./Pages/Admin/InventoryAdm";
import ProfileAdm from "./Pages/Admin/ProfileAdm";
import LoaningAdm from "./Pages/Admin/LoaningAdm";
import UserAdm from "./Pages/Admin/UserAdm";
import ProfileUser from "./Pages/Client/ProfileUser";
import AddItem from "./Pages/Admin/AddItem";
import AddUser from "./Pages/Admin/AddUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Loaning" element={<Loaning />} />
          <Route path="/ProfileUser" element={<ProfileUser />} />
          <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="/InventoryAdm" element={<InventoryAdm />} />
          <Route path="/LoaningAdm" element={<LoaningAdm />} />
          <Route path="/UserAdm" element={<UserAdm />} />
          <Route path="/ProfileAdm" element={<ProfileAdm />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/AddUser" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
