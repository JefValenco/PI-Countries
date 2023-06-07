import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Paged from "../../components/Paged/Paged";
import styles from "./Home.module.css";
import { useDispatch } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getItemByName } from "../../redux/actions";

import {
  getCountries,
  orderByAZ,
  FilterByContinent,
  orderByPoblation,
  fetchActivityCountry,
  getNombre,
} from "../../redux/actions";

const Home = () => {
  /*  const location = useLocation(); */
  const allCountries = useSelector((state) => state.countries);

  const getActivity = useSelector((state) => state.allactivityAndCountry);

  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchActivityCountry());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getCountries()).then(() => {
        setIsLoading(false);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByAZ(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSortNombres(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(e.target.value);
      dispatch(getNombre(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSortPoblation(e) {
    e.preventDefault();
    const sortOrder = e.target.value;

    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      console.log(sortOrder);
      dispatch(orderByPoblation(sortOrder));

      setOrder(sortOrder);
      setIsLoading2(false); // Hide loader
    }, 500);
  }

  function handleSortContinents(e) {
    setIsLoading2(true); // Show loader

    setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }

      dispatch(FilterByContinent(e.target.value));

      setIsLoading2(false); // Hide loader
    }, 500);
  }

  const handleClearSearch = () => {
    setIsLoading2(true);

    setTimeout(() => {
      dispatch(getItemByName("")).then(() => {
        setIsLoading2(false);
      });
      setSearch("");
    }, 600);
  };

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
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <select
            className={styles["style-dropdown"]}
            onChange={(e) => handleSortNombres(e)}
          >
            <option value="" disabled selected hidden>
              Select Activity
            </option>

            <option value="All"> Select Activity</option>

            <option value=""></option>
            {getActivity &&
              getActivity
                .sort((a, b) => {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((acti) => {
                  return (
                    <option value={acti.name} key={acti.id}>
                      {acti.activity}
                    </option>
                  );
                })}
          </select>

          <select
            className={styles["style-dropdown"]}
            onChange={(e) => handleSort(e)}
          >
            <option value="" disabled selected hidden>
              Select an Order
            </option>
            <option value="asc">Z - A</option>
            <option value="des">A - Z</option>
            <option value="clear"> Select an Order</option>
          </select>

          <select
            className={styles["style-dropdown"]}
            onChange={(e) => handleSortContinents(e)}
          >
            <option value="All">All Continents</option>
            <option value="South America">South America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
          </select>

          <select
            className={styles["style-dropdown"]}
            onChange={(e) => handleSortPoblation(e)}
          >
            <option value="" disabled selected hidden>
              Select Population
            </option>
            <option value="des">Lower Population</option>
            <option value="asc">Higher Population</option>
            <option value="clear"> Select Population</option>
          </select>
        </div>
        <div className={styles.box}>
          <SearchBar />
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgb(191, 191, 191)",
          marginTop: "2em",
        }}
      >
        {currentCountries.length > 0 ? (
          <CardsContainer currentCountries={currentCountries} />
        ) : (
          <div>
            <div className={styles.content2}>
              <div>
                <p className={styles.p}>Oops! Error 404</p>
                <h1 className={styles.h1}> Page not found.</h1>
              </div>
              <div className={styles.contentButton}>
                <button
                  onClick={handleClearSearch}
                  className={styles.btnPrimary}
                >
                  Back Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isLoading2 && (
        <div>
          <span
            className={styles.loader}
            style={{
              backgroundColor: "rgba(34, 34, 34, 0.95)",
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}

      <div>
        <Paged
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Home;
