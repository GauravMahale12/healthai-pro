import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Ambulance,
  UserCircle2,
  Activity
} from "lucide-react";

const Navbar = () => {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    window.location.href = "/login";
  };

  return (
    <nav className="
      w-full
      bg-white/80
      backdrop-blur-lg
      border-b border-white/20
      shadow-lg
      sticky top-0 z-50
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-10">

          {/* Modern Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">

              {/* Logo Box */}
              <div className="
                relative
                w-12 h-12
                rounded-2xl
                bg-gradient-to-br from-blue-600 to-cyan-400
                flex items-center justify-center
                shadow-lg shadow-cyan-500/30
                group-hover:scale-105
                transition
                duration-300
              ">

                {/* Glow Effect */}
                <div className="
                  absolute inset-0
                  rounded-2xl
                  bg-cyan-400/20
                  blur-xl
                "></div>

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  <Activity size={24} className="text-white" />
                </div>
              </div>

              {/* Logo Text */}
              <div>
                <h1 className="
                  text-xl
                  font-extrabold
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  bg-clip-text
                  text-transparent
                  leading-tight
                ">
                  HealthAI Pro
                </h1>

                <p className="text-xs text-gray-500 font-medium">
                  AI Medical Assistant
                </p>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="
            hidden md:flex
            items-center
            bg-white/70
            backdrop-blur-lg
            border border-gray-200
            rounded-2xl
            px-4 py-3
            w-[360px]
            shadow-sm
          ">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search symptoms, reports, hospitals..."
              className="
                bg-transparent
                outline-none
                ml-3
                text-sm
                w-full
                text-gray-700
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <Link href="/reports">
            <button className="
              w-11 h-11
              rounded-2xl
              bg-white
              border border-gray-200
              flex items-center justify-center
              shadow-sm
              hover:shadow-md
              hover:scale-105
              transition
            ">
              <Bell size={20} className="text-gray-700" />
            </button>
          </Link>

          {/* Emergency Button */}
          <Link href="/emergency">
            <button className="
              flex items-center gap-2
              bg-gradient-to-r
              from-red-500
              to-red-600
              text-white
              px-5 py-3
              rounded-2xl
              font-semibold
              shadow-lg
              hover:scale-105
              transition
            ">
              <Ambulance size={18} />
              Emergency
            </button>
          </Link>

          {/* Profile Button */}
          <Link href="/profile">
            <button className="
              flex items-center gap-3
              bg-white
              border border-gray-200
              px-4 py-2
              rounded-2xl
              shadow-sm
              hover:shadow-md
              hover:scale-105
              transition
            ">
              <div className="
                w-10 h-10
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-cyan-400
                flex items-center justify-center
                text-white
              ">
                <UserCircle2 size={22} />
              </div>

              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {userName || "Patient"}
                </p>

                <p className="text-xs text-gray-500">
                  View Profile
                </p>
              </div>
            </button>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              bg-gray-900
              text-white
              px-5 py-3
              rounded-2xl
              text-sm
              font-medium
              shadow-md
              hover:bg-black
              hover:scale-105
              transition
            "
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;