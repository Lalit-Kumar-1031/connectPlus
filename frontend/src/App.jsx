import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import Reels from "./Pages/Reels";
import Search from "./Pages/Search";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";


function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<UserLayout/>}>
     <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
    </Route>
  </Routes>
  </BrowserRouter>;
}

export default App;
