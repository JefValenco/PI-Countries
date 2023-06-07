import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getItemById } from "../../redux/actions";
import { useParams, Link, Navigate } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const itemById = useSelector((state) => state.itemById);
  const item = itemById.length > 0 ? itemById[0] : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getItemById(id)).then(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  console.log(
    "state:",
    useSelector((state) => state)
  );

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
    <div className={styles.contain}>
      <div className={styles.container} style={{ paddingRight: "8em" }}>
        <div>
          <div>
            <h1>{item.name}</h1>

            <img
              className={styles.img}
              src={item.image}
              width="250"
              height="150"
              alt="img"
            />
          </div>
        </div>
      </div>

      <div className={styles.container} style={{ paddingRight: "8em" }}>
        <div>
          <div>
            <h3>ID: </h3>
            <p>{item.id}</p>

            <h3>Continent: </h3>
            <p>{item.continent}</p>
            <h3>Capital: </h3>
            <p> {item.capital}</p>
            <h3>Subregion: </h3>
            <p>{item.subregion}</p>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div>
          <div>
            <h3>Area: </h3>
            <p>{item.area}</p>
            <h3>Population: </h3>
            <p>{item.population}</p>
            <h3>Activities: </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {item.activities && item.activities.length > 0 ? (
                item.activities.map((activity) => (
                  <li key={activity.id}>{activity.name}</li>
                ))
              ) : (
                <li>No activities available</li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.button}>
          <Link to="/countries">
            <button className={styles.Submmit}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
