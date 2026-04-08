import type { FC } from "react";
import { NavLink } from "react-router-dom";

const HeaderMenu: FC = () => {
  return(
    <nav>
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/favorites'>Favorites</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMenu