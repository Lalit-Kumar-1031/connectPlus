import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Header() {
  return (
    <>
      <nav className="mx-auto w-full flex items-center justify-between py-4 px-8 border-b-4 border-gray-100">
        <div>
          <Link to="/" className="text-orange-500 text-3xl font-bold">
            ConnectPlus
          </Link>
        </div>
        <div className=" hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaTwitter className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Header;
