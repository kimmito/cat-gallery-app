import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../../../navigation/route-config";

const HeaderMenu: FC = () => {
  const menuRoutes = appRoutes.filter((route) => route.showInMenu)

  return(
    <nav>
      <ul>
        {menuRoutes.map(({ path, title }) => (
          <li key={path}>
            <NavLink to={path}>{title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderMenu