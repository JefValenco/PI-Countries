import styles from "./CardActi.module.css";

const CardActi = (props) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>{props.name}</h2>
      <p className={styles.p}>Difficulty:{props.difficulty}</p>
      <p className={styles.p}>Duration:{props.duration}</p>
      <p className={styles.p}>Season:{props.season}</p>
      <p className={styles.p}>Countries:{props.countries}</p>

      <img
        className={styles.img}
        src={props.image}
        width="150"
        height="150"
        alt="img"
      />
    </div>
  );
};

export default CardActi;
