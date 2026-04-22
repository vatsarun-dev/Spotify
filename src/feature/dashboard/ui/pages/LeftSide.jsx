import React from "react";
import "remixicon/fonts/remixicon.css";

const LeftSide = () => {
  return (
    <aside className="flex h-full flex-col rounded-xl bg-[#121212] text-white">
      <div className="flex items-center justify-between px-3 py-4">
        <div className="flex items-center gap-3">
          <i className="ri-book-shelf-line text-[1.45rem] text-[#b3b3b3]"></i>
          <h2 className="text-[1.05rem] font-bold tracking-[-0.02em]">
            Your Library
          </h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-[#232323] px-5 py-3 text-[1.05rem] font-semibold text-white transition hover:bg-[#2a2a2a]"
        >
          <i className="ri-add-line text-[1.45rem] leading-none"></i>
          Create
        </button>
      </div>

      <div className="scrollbar-hide space-y-6 overflow-y-auto pt-8">
        <div className="rounded-2xl bg-[#232323] px-6 py-7">
          <h3 className="text-[1.05rem] font-bold leading-7 tracking-[-0.02em]">
            Create your first playlist
          </h3>
          <p className="mt-2 text-[0.95rem] text-white/95">
            It&apos;s easy, we&apos;ll help you
          </p>
          <button
            type="button"
            className="mt-7 rounded-full bg-white px-6 py-3 text-[0.95rem] font-bold text-black transition hover:scale-[1.02]"
          >
            Create playlist
          </button>
        </div>

        <div className="rounded-2xl bg-[#232323] px-6 py-7">
          <h3 className="text-[1.05rem] font-bold leading-7 tracking-[-0.02em]">
            Let&apos;s find some podcasts to follow
          </h3>
          <p className="mt-2 text-[0.95rem] text-white/95">
            We&apos;ll keep you updated on new episodes
          </p>
          <button
            type="button"
            className="mt-7 rounded-full bg-white px-6 py-3 text-[0.95rem] font-bold text-black transition hover:scale-[1.02]"
          >
            Browse podcasts
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSide;
