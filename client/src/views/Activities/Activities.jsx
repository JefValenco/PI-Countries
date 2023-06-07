import CardsContainerActi from "../../components/CardsContainer/CardsActi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getActi } from "../../redux/actions";
import styles from "./Activities.module.css";
import { useState } from "react";

const Activities = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getActi()).then(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{
            backgroundColor: "rgba(34, 34, 34, 0.95)",
            width: "100%",
            height: "100%",
            marginTop: "95px",
          }}
        ></span>
      </div>
    );
  }

  return (
    <>
      <CardsContainerActi />
    </>
  );
};

export default Activities;
