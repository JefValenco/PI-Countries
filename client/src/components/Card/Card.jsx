import styles from "./Card.module.css";
import { getActi } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Card = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActi());
  }, [dispatch]);

  const activities = useSelector((state) => state.getActi);

  const activity = activities.find((activity) =>
    activity.countries.includes(props.name)
  );
  const activityName = activity && activity.name;

  const isLongName =
    (props.name.length >= 8 && props.name.length < 11) ||
    props.name.length > 15 ||
    props.name.length > 10;
  return (
    <div className={styles.card}>
      <h2 className={`${styles.h2} ${isLongName ? styles["long-name"] : ""}`}>
        {props.name}
      </h2>
      <p className={styles.p}>{props.continents}</p>
      {activityName && <p className={styles.p2}>Activities: {activityName}</p>}
      <img
        className={styles.img}
        src={props.image}
        width="400px"
        height="auto"
        alt="img"
      />
    </div>
  );
};

export default Card;
