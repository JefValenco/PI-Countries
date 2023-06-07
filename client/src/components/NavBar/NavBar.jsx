import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <div className={style.links}>
        <Link to="/countries" className={style.btnPrimary}>
          Countries
        </Link>
        <Link to="/activities" className={style.btnPrimary}>
          Activities
        </Link>
        <Link to="/createactivities" className={style.btnPrimary}>
          Create / Delete Activity
        </Link>
        <Link to="/modify" className={style.btnPrimary}>
          Modify Activity
        </Link>
        <Link to="/" className={style.btnPrimary}>
          Landing
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
