import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../../navigation/route-config";
import LayoutContainer from "./LayoutContainer";

const HeaderMenu: FC = () => {
  const menuRoutes = appRoutes.filter((route) => route.showInMenu)

  return(
    <div className="h-16 w-full mb-12 bg-[#2196F3] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.24)]">
      <LayoutContainer className="h-full">
        <nav className="h-full">
          <ul className="flex h-full flex-row">
            {menuRoutes.map(({ path, title }) => (
              <li key={path} className="h-full">
                <NavLink
                  className={({ isActive }) =>
                    `flex h-full items-center px-6.5 text-sm transition-colors font-normal ${
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
      </LayoutContainer>
    </div>
  )
}

export default HeaderMenu