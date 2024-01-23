import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { Outlet } from "react-router-dom";
import Bottombar from "@/components/shared/Bottombar";
type Props = {};

const RootLayout = (props: Props) => {
  return (
    <div className="w-full md:flex ">
      <Topbar />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
