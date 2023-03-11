import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="max-w-5xl md:max-w-7xl mx-auto p-5 flex justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <img
              src="https://seeklogo.com/images/M/medium-logo-33836F45D2-seeklogo.com.png"
              className="w-28 md:w-44 object-contain cursor-pointer"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className="text-white bg-green-600 px-3 py-1 rounded-full">
              Follow
            </h3>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-green-600 border border-green-600 rounded-full px-3 py-1">
          Sign In
        </button>
        <button className="text-white bg-green-600 px-3 py-1 rounded-full">
          Get Started
        </button>
      </div>
    </header>
  );
}

export default Header;
