import { useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";
import { getCountryActi } from "../../redux/actions";
import { getActi } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";
import { walk } from "../.././images/images.js";
import { sky } from "../.././images/images.js";
import { bike } from "../.././images/images.js";

const Form = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  //----------States----------//

  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    image: "",
    countries: [],
  });

  const [formDelete, setFormDelete] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    image: "",
    countries: [],
  });

  //----------Reset States----------//

  const resetForm = () => {
    setForm({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  };

  const resetFormDelete = () => {
    setFormDelete({
      name: "",
    });
  };

  //----------Change Handlers----------//

  const changeHandler = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value }, errors, setErrors);
    setForm({ ...form, [property]: value });
  };

  const changeHandlerCountry = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (!form.countries.includes(value)) {
      setForm({ ...form, [property]: [...form.countries, value] });
    }
  };

  const changeHandlerDelete = (event, index) => {
    const property = event.target.name;
    const value = event.target.value;

    setFormDelete({ ...formDelete, [property]: value });
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your activity." },
    {
      field: "difficulty",
      message: "Please enter the difficulty for your activity.",
    },
    {
      field: "duration",
      message: "Please enter the duration for your activity.",
    },
    {
      field: "season",
      message: "Please enter the season for your activity.",
    },
    {
      field: "countries",
      message: "Please enter the countries for your activity.",
    },
    {
      field: "image",
      message: "Please enter the image for your activity.",
    },
  ];

  //----------Summit Handlers----------//

  const submitHandler = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!form[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one activities is selected
    if (form.countries.length === 0 || form.countries.includes("")) {
      alert("Please select at least one country for your Activity.");
      return;
    }

    // Send form data to server
    axios
      .post("http://localhost:3002/activity", form)
      .then((res) => {
        alert("Country created!");
        resetForm();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const submitHandlerDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3002/activity?name=${formDelete.name}`)
      .then((res) => {
        alert("Activity deleted!");
        resetFormDelete();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };
  //----------Dispatches Handlers----------//

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getActi()).then(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  /*   useEffect(() => {
    dispatch(getActi());
  }, [dispatch]); */

  useEffect(() => {
    dispatch(getCountryActi());
  }, []);

  //---------- Selectors ----------//

  const activities = useSelector((state) => state.getActi);
  const countries = useSelector((state) => state.countryActy);

  //----------Complementary fn ----------//

  const removeCountry = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newCountries = [...form.countries];
    newCountries.splice(index, 1);
    setForm({ ...form, countries: newCountries });
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
    <div className={styles.container}>
      <div>
        <div className={styles.container}>
          <div className={styles.box}>
            <h1 className={styles.h4}>Create Activity</h1>

            <form action="POST" onSubmit={submitHandler}>
              <div>
                <label className={styles.label}>Name: </label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                ></input>
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

              <div>
                <label className={styles.label}>Difficulty: </label>
                <input
                  className={styles.input}
                  type="number"
                  value={form.difficulty}
                  onChange={changeHandler}
                  name="difficulty"
                  placeholder="Choose Difficulty"
                  style={{ color: "gray" }}
                />
                {errors.difficulty && (
                  <p className={styles.error}>{errors.difficulty}</p>
                )}
              </div>

              <div>
                <label className={styles.label}>Duration: </label>
                <select
                  className={styles.input}
                  value={form.duration}
                  onChange={changeHandler}
                  name="duration"
                  style={{ color: "gray" }}
                >
                  <option value="" disabled selected style={{ color: "gray" }}>
                    Choose duration
                  </option>

                  <option value="30">30 mins</option>
                  <option value="60">1 hr</option>
                  <option value="90">1 hr and 30 mins</option>
                  <option value="120">2 hrs</option>
                  <option value="150">2 hrs and 30 mins</option>
                  <option value="180">3 hrs</option>
                  <option value="210">3 hrs and 30 mins</option>
                  <option value="240">4 hrs</option>
                  <option value="270">4 hrs and 30 mins</option>
                  <option value="300">5 hrs</option>
                </select>
                {errors.duration && (
                  <p className={styles.error}>{errors.duration}</p>
                )}
              </div>

              <div>
                <label className={styles.label}>Season: </label>
                <select
                  className={styles.input}
                  value={form.season}
                  onChange={changeHandler}
                  name="season"
                  style={{ color: "gray" }}
                >
                  <option value="" disabled selected>
                    Choose Season
                  </option>
                  <option>Summer</option>
                  <option>Spring</option>
                  <option>Fall</option>
                  <option>Winter</option>
                </select>
                {errors.season && (
                  <p className={styles.error}>{errors.season}</p>
                )}
              </div>

              <div>
                <label className={styles.label}>Image: </label>
                <select
                  className={styles.input}
                  value={form.image}
                  onChange={changeHandler}
                  name="image"
                  style={{ color: "gray" }}
                >
                  <option value="" disabled>
                    Choose image
                  </option>

                  <option value={bike}>Biking</option>

                  <option value={sky}>Skydiving</option>
                  <option value={walk}>Walk</option>
                </select>

                <div>
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className={styles.img}
                    />
                  )}
                </div>
                {errors.image && <p className={styles.error}>{errors.image}</p>}
              </div>

              <div>
                <label className={styles.label}>Countries: </label>
                <select
                  className={styles.input}
                  placeholder="Choose a country"
                  recipe="text"
                  onChange={changeHandlerCountry}
                  name="countries"
                  style={{ color: "gray" }}
                >
                  <option value="" disabled selected>
                    Choose country
                  </option>
                  <option value=""></option>
                  {countries &&
                    countries
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((country) => {
                        return (
                          <option value={country.name} key={country.id}>
                            {country.name}
                          </option>
                        );
                      })}
                </select>

                <div>
                  {form.countries.map((country, index) => (
                    <div key={index}>
                      <span className={styles.country}>{country}</span>
                      <button
                        className={styles.Submmit2}
                        onClick={(event) => removeCountry(event, index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.Submmit} type="submit">
                Create
              </button>
            </form>
          </div>
          <div className={styles.box}>
            <h1 className={styles.h4}>Delete Activity</h1>

            <form onSubmit={submitHandlerDelete}>
              <div>
                <label className={styles.label}>Name: </label>
                <select
                  className={styles.input}
                  placeholder="Choose an activity to delete..."
                  activity="text"
                  value={formDelete.name}
                  onChange={changeHandlerDelete}
                  name="name"
                >
                  <option value="activity"></option>
                  {activities &&
                    activities
                      .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                      })
                      .map((activity) => {
                        return (
                          <option value={activity.name} key={activity.id}>
                            {activity.name}
                          </option>
                        );
                      })}
                </select>
              </div>

              {/*    <button className={styles.Submmit} type="submit">
    Confirm Delete
  </button> */}

              <button
                className={`${styles.Submmit} ${
                  form.name ? "" : styles.disabled
                }`}
                disabled={!formDelete.name}
                type="submit"
              >
                Confirm Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
