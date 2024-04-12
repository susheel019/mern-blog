import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashComment from "../components/DashComment";
import DashBoardComponents from "../components/DashBoardComponents";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <DashSidebar />

      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* post..... */}
      {tab=== "posts" && <DashPost />}
      {/* users */}
      {tab === 'users' && <DashUsers></DashUsers>}
      {/* comment */}
      {tab === 'comments' && <DashComment/>}
      {/* Dashboard */}
      {tab === 'dash' && <DashBoardComponents></DashBoardComponents>}
    </div>
  );
}

export default Dashboard;
