import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { Link } from "react-router-dom";

const CardsContainer = ({ currentCountries }) => {
  //---------- Selectors ----------//

  return (
    <div className={styles.container}>
      {currentCountries.map((countrie) => {
        return (
          <div key={countrie.id}>
            <Link to={`${countrie.id}`} key={countrie.id}>
              <Card
                name={countrie.name}
                image={countrie.image}
                continents={countrie.continents}
                key={countrie.id}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsContainer;
