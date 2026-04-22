import React from "react";
import { Group, Panel } from "react-resizable-panels";
import { Outlet } from "react-router";
import Navbar from "../../feature/dashboard/ui/components/Navbar";
import Player from "../../feature/player/ui/components/Player";
import LeftSide from "../../feature/dashboard/ui/pages/LeftSide";
import RightSide from "../../feature/dashboard/ui/pages/RightSide";
const DashboardLayout = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black text-white">
      <Navbar />

      <main className="flex min-h-0 flex-1 flex-col pt-20">
        <div className="flex min-h-0 flex-1 gap-2 px-2 pb-2 pt-3">
          <Group className="min-h-0 flex-1 gap-2">
            <Panel
              defaultSize={"20%"}
              minSize={"15%"}
              maxSize={"25%"}
              className="hidden min-h-0 overflow-hidden rounded-xl bg-[#121212] lg:block"
            >
              <div className="scrollbar-hide h-full overflow-y-auto p-4 text-sm text-[#b3b3b3]">
                <LeftSide />
              </div>
            </Panel>

            <Panel className="min-h-0 overflow-hidden rounded-xl bg-[#121212]">
              <div className="scrollbar-hide h-full overflow-y-auto rounded-xl bg-[#121212]">
                <Outlet />
              </div>
            </Panel>

            <Panel
              defaultSize={"20%"}
              minSize={"15%"}
              maxSize={"25%"}
              className="hidden min-h-0 overflow-hidden rounded-xl bg-[#121212] xl:block"
            >
              <div className="scrollbar-hide h-full overflow-y-auto p-4 text-sm text-[#b3b3b3]">
                <RightSide />
              </div>
            </Panel>
          </Group>
        </div>

        <div className="shrink-0">
          <Player />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
