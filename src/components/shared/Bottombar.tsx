import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {" "}
      <ul className="flex w-full justify-between items-center gap-6  ">
        {sidebarLinks.map((link: INavLink) => {
          const isActive = pathname == link.route;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`group ${
                isActive && `bg-primary-500`
              } flex items-center flex-col gap-1 p-2 transition rounded-[10px]`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                className={`group-hover:invert-white  ${
                  isActive && `invert-white`
                }`}
                height={22}
                width={22}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Bottombar;
