import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../../navigation/route-config";

const HeaderMenu: FC = () => {
  const menuRoutes = appRoutes.filter((route) => route.showInMenu)

  return(
    <div className="h-16 w-full mb-9 bg-[#2196F3] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.24)]">
      <nav className="h-full">
        <ul className="flex h-full flex-row ml-15.5">
          {menuRoutes.map(({ path, title }) => (
            <li key={path} className="h-full">
              <NavLink
                className={({ isActive }) =>
                  `flex h-full items-center px-8 text-sm transition-colors font-normal ${
                    isActive ? "bg-black/10" : "bg-transparent hover:bg-white/15 text-white/70 hover:text-white"
                  }`
                }
                to={path}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default HeaderMenu