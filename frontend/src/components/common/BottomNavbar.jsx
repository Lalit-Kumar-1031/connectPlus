import React from "react";
import { GoHomeFill } from "react-icons/go";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function BottomNavbar() {
    const navClass = ({ isActive }) =>`
    ${isActive ? "text-orange-400" : "text-gray-500"} transform transition-transform duration-300`;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-200 py-3">
      <div className="flex items-center justify-around">
        <NavLink to="/home" className={navClass}><GoHomeFill className="h-6 w-6" /></NavLink>
        <NavLink to="/reels" className={navClass}><BsFillPlayBtnFill className="h-6 w-5" /></NavLink>
        <NavLink to="/search" className={navClass}><IoSearchOutline className="h-6 w-6" /></NavLink>
        <NavLink to="/chat" className={navClass}><FiSend className="h-6 w-6" /></NavLink>
        <NavLink to="/profile" className={navClass}><IoPersonCircleOutline className="h-6 w-6" /></NavLink>
      </div>
    </nav>
  );
}

export default BottomNavbar;
