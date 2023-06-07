import { useState } from "react";
import styles from "../../views/Modify/Modify.module.css";
import axios from "axios";
import { getCountryActi } from "../../redux/actions";
import { getActi } from "../../redux/actions";
import { getModifyActivities } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validate } from "../../middleware/validate";
import { walk } from "../.././images/images.js";
import { sky } from "../.././images/images.js";
import { bike } from "../.././images/images.js";
/* import SearchBar from "../../components/SearchBar/SearchBar"; */

const Modify = () => {
  const dispatch = useDispatch();

  //----------States----------//

  const [formModify, setFormModify] = useState({
    id: "",
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    image: "",
    countries: [],
  });

  //----------Reset States----------//

  const resetFormModify = () => {
    setFormModify({
      id: "",
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      image: "",
      countries: [],
    });
  };

  //----------Change Handlers----------//

  const changeHandlerModify = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "name") {
      const selectedActivity = activities.find(
        (activity) => activity.name === value
      );
      setFormModify({
        ...formModify,
        [property]: value,
        id: selectedActivity?.id || "",
      });
    } else {
      setFormModify({ ...formModify, [property]: value });
    }
  };

  const changeHandlerCountry = (event) => {
    const value = event.target.value;

    if (!formModify.countries.includes(value)) {
      setFormModify({
        ...formModify,
        countries: [...formModify.countries, value],
      });
    }
  };

  //----------Summit Form Validation ----------//

  const requiredFields = [
    { field: "name", message: "Please enter a name for your Activity." },
    {
      field: "difficulty",
      message: "Please enter the difficulty level for your Activity.",
    },
    {
      field: "duration",
      message: "Please enter the duration of your Activity.",
    },
    { field: "season", message: "Please enter the season for your Activity." },
    {
      field: "image",
      message: "Please enter the image URL for your Activity.",
    },
    {
      field: "countries",
      message: "Please enter the countries for your Activity.",
    },
  ];

  //----------Summit Handlers----------//

  const submitHandlerModify = (event) => {
    event.preventDefault();

    // Check if required fields are missing
    for (const { field, message } of requiredFields) {
      if (!formModify[field]) {
        alert(message);
        return;
      }
    }

    // Check if at least one type is selected

    if (
      formModify.countries.length === 0 ||
      formModify.countries.includes("")
    ) {
      alert("Please select at least one country for your Activity.");
      return;
    }

    // Send formModify data to server
    axios
      .put("http://localhost:3002/activity", formModify)
      .then((res) => {
        alert("Activity updated!");
        resetFormModify();
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  //----------Dispatches Handlers----------//

  useEffect(() => {
    dispatch(getCountryActi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getModifyActivities());
  }, [dispatch]);

  //---------- Selectors ----------//

  const activities = useSelector((state) => state.modifyItem);

  const countryActy = useSelector((state) => state.countryActy);

  //----------Complementary fn ----------//

  const removeCountry = (event, index) => {
    event.preventDefault(); // prevent form submission
    const newCountry = [...formModify.countries];
    newCountry.splice(index, 1);
    setFormModify({ ...formModify, countries: newCountry });
  };

  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [image, setImage] = useState("");
  const [countries, setCountries] = useState([]);

  //---------- Render  ----------//

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1 className={styles.h4}>Select Activity</h1>
          <div className={styles.container}>
            <div className={styles.box}>
              <label className={styles.label}>Name: </label>
              <select
                className={styles.input}
                placeholder="Choose a activity to Modify..."
                activities="text"
                value={formModify.name}
                onChange={(event) => {
                  changeHandlerModify(event);
                  const selectedActivity = activities.find(
                    (activity) => activity.name === event.target.value
                  );
                  setId(selectedActivity?.id || "");
                  setName(selectedActivity?.name || "");
                  setDifficulty(selectedActivity?.difficulty || "");
                  setDuration(selectedActivity?.duration || "");
                  setSeason(selectedActivity?.season || "");
                  setImage(selectedActivity?.image || "");
                  setCountries(selectedActivity?.countries || []);
                }}
                name="name"
              >
                <option value="activities"></option>
                {activities &&
                  activities
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((activities) => {
                      return (
                        <option value={activities.name} key={activities.id}>
                          {activities.name}
                        </option>
                      );
                    })}
              </select>
              <div>
                {image && <img className={styles.img} src={image} alt={name} />}
              </div>
            </div>
            <div className={styles.box}>
              <div>
                <div className={styles.forml}>
                  <div>
                    <label className={styles.label3}>id: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={id}
                      name="id"
                      disabled // added disabled attribute
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Difficulty: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={difficulty}
                      name="difficulty"
                      disabled // added disabled attribute
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Duration: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={duration}
                      name="duration"
                      disabled // added disabled attribute
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Season: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={season}
                      name="season"
                      disabled // added disabled attribute
                    />
                  </div>

                  <div>
                    <label className={styles.label}>Countries: </label>
                    <input
                      className={styles.input3}
                      type="text"
                      value={countries}
                      name="countries"
                      disabled // added disabled attribute
                    />
                  </div>

                  {/* <div>
              <p>Countries: {countries}</p>
            </div> */}
                  {/* <p>
             <img src={image} alt={name} />
            </p> */}
                </div>

                {/*    <div>
            <p style={{ color: "gray" }}>id: {id}</p>
          </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <h1 className={styles.h4}>Modify Activity</h1>

          <form onSubmit={submitHandlerModify}>
            <div>
              <label className={styles.label}>Name: </label>
              <input
                className={styles.input}
                type="text"
                value={formModify.name}
                onChange={changeHandlerModify}
                name="name"
              ></input>
            </div>

            <div>
              <label className={styles.label}>Difficulty: </label>
              <input
                className={styles.input}
                type="number"
                value={formModify.difficulty}
                onChange={changeHandlerModify}
                name="difficulty"
                placeholder="Choose Difficulty"
              />
            </div>

            <div>
              <label className={styles.label}>Duration: </label>
              <select
                className={styles.input}
                value={formModify.duration}
                onChange={changeHandlerModify}
                name="duration"
                style={{ color: "gray" }}
              >
                <option value="" disabled selected>
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
            </div>

            <div>
              <label className={styles.label}>Season: </label>
              <select
                className={styles.input}
                value={formModify.season}
                onChange={changeHandlerModify}
                name="season"
                style={{ color: "gray" }}
              >
                <option value="" disabled selected>
                  Choose Season
                </option>
                <option>summer</option>
                <option>spring</option>
                <option>fall</option>
                <option>winter</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Image: </label>
              <select
                className={styles.input}
                value={formModify.season}
                onChange={changeHandlerModify}
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
                {formModify.image && (
                  <img
                    src={formModify.image}
                    alt="Preview"
                    className={styles.img}
                  />
                )}
              </div>
            </div>

            <div>
              <label className={styles.label}>Country: </label>
              <select
                className={styles.input}
                placeholder="Choose a country"
                type="text"
                onChange={changeHandlerCountry}
                name="countries"
                style={{ color: "gray" }}
              >
                <option value="" disabled selected>
                  Choose countries
                </option>
                <option value=""></option>
                {countryActy &&
                  countryActy
                    .sort((a, b) => {
                      if (a.name < b.name) return -1;
                      if (a.name > b.name) return 1;
                      return 0;
                    })
                    .map((countries) => {
                      return (
                        <option value={countries.name} key={countries.id}>
                          {countries.name}
                        </option>
                      );
                    })}
              </select>

              <div>
                {formModify.countries.map((countries, index) => (
                  <div key={index}>
                    <span>{countries}</span>
                    <button onClick={(event) => removeCountry(event, index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.Submmit} type="submit">
              Modify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modify;
