import React from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router";
import { clearAuthSession, getAuthSession } from "../../../../utils/authStorage";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = getAuthSession();

  const handleLogout = () => {
    // Clear only the active login session so the registered user can log in again.
    localStorage.removeItem("spotifyAuthSession");
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 border-b border-white/10 bg-black px-4 sm:px-6 lg:px-7">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between gap-4">
        <div>
          <img
            className="h-10"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
            alt="Spotify"
          />
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <img
            className="h-10 invert-[.5]"
            src="https://cdn-icons-png.flaticon.com/512/9385/9385212.png"
            alt="Home"
          />

          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#b1b1b1]"></i>
            <input
              className="h-10 w-[280px] rounded-2xl bg-[#1f1f1f] pl-10 pr-3 text-white outline-none lg:w-[350px]"
              placeholder="What do you want to play?"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          <button className="rounded-2xl bg-white px-3 py-2 text-sm font-bold text-black">
            Explore premium
          </button>
          {currentUser ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl border border-white/15 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          ) : null}
          <i className="ri-notification-3-line text-xl text-[#b1b1b1]"></i>
          <i className="ri-user-line text-xl text-white"></i>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
