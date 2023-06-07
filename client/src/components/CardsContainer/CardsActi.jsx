import CardActi from "../Card/CardActi";
import styles from "./CardsContainerActi.module.css";
import { useSelector } from "react-redux";

const CardsContainerActi = () => {
  const activities = useSelector((state) => state.getActi);

  return (
    <div className={styles.container}>
      {activities.map((activity) => {
        return (
          <CardActi
            name={activity.name}
            difficulty={activity.difficulty}
            duration={activity.duration}
            season={activity.season}
            image={activity.image}
            countries={activity.countries}
          />
        );
      })}
    </div>
  );
};

export default CardsContainerActi;
