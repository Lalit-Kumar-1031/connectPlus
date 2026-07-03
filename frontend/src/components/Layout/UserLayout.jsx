import Header from "../common/Header";
import { Outlet } from "react-router-dom";
import BottomNavbar from "../common/BottomNavbar";
import { useState } from "react";



function UserLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  return (
    <>
      <div className="min-h-screen">
        <header>
          <Header/>
        </header>
        {/* Page Content */}
      <main>
        <Outlet />
      </main>
        {/* Bottom Navigation */}
        <BottomNavbar/> 
      </div>
    </>
  );
}

export default UserLayout;
