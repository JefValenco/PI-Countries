import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const GET_ACTI = "GET_ACTI";
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const ORDER_BY_POBLATION = "ORDER_BY_POBLATION";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_CONTINENT3 = "FILTER_BY_CONTINENT3";
export const FILTER_BY_CONTINENT4 = "FILTER_BY_CONTINENT4";
export const FILTER_BY_A = "FILTER_BY_A";

export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_BY_ACTIVITY2 = "FILTER_BY_ACTIVITY2";
export const GET_ITEM_BY_NAME = "GET_ITEM_BY_NAME";
export const GET_ACTI_BY_NAME = "GET_ACTI_BY_NAME";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const GET_MODIFY_ACTIVITIES = "GET_MODIFY_ACTIVITIES";
export const FILTER_BY_ACTI = "FILTER_BY_ACTI";
export const GET_ACTIVITY_AND_COUNTRY = "GET_ACTIVITY_AND_COUNTRY";

export const GET_PAJARO = "GET_PAJARO";
export const GET_ACTIVITY_COUNTRY = "GET_ACTIVITY_COUNTRY";
export const GET_NOMBRE_PAIS = "GET_NOMBRE_PAIS";

/* export const FILTER_BY_CREATED = "FILTER_BY_CREATED"; */

export function getCountries() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/country`);

      /*  console.log("Response data:", response.data); */
      dispatch({ type: GET_COUNTRIES, payload: response.data });
    } catch (error) {
      console.log("Get getCountries Actions Error:", error);
    }
  };
}

/* export function getNombre() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/country`);

      dispatch({ type: GET_NOMBRE_PAIS, payload: response.data });
    } catch (error) {
      console.log("Get getCountries Actions Error:", error);
    }
  };
} */

export function getNombre(payload) {
  return {
    type: "GET_NOMBRE_PAIS",
    payload,
  };
}

export function getCountryActi() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/country`);
      dispatch({ type: GET_ACTIVITY, payload: response.data });
    } catch (error) {
      console.log("Get getCountryActi Actions Error:", error);
    }
  };
}

export function fetchActivityCountry() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/activity`);
      const mappedData = response.data.map((item) => {
        const { name, id, countries } = item;
        return { activity: name, name: countries };
      });
      dispatch({ type: GET_ACTIVITY_COUNTRY, payload: mappedData });
    } catch (error) {
      console.log("Get getCountryActi Actions Error:", error);
    }
  };
}

/* export function fetchActivityCountry() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/activity`);
      const mappedData = response.data.flatMap((item) => {
        const { id, countries } = item;
        const countryNames = countries.split(",").map((name) => name.trim());
        return countryNames.map((name) => ({ id, name }));
      });
      dispatch({ type: GET_ACTIVITY_COUNTRY, payload: mappedData });
    } catch (error) {
      console.log("Get getCountryActi Actions Error:", error);
    }
  };
} */

/* export function getPajaro() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/country`);
      const mappedData = response.data.map((item) => {
        const { name, id, countries } = item;
        return { name, id, countries };
      });
      dispatch({ type: GET_PAJARO, payload: mappedData });
    } catch (error) {
      console.log("Get getCountryActi Actions Error:", error);
    }
  };
}
 */
export function getActi() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/activity`);
      dispatch({ type: GET_ACTI, payload: response.data });
    } catch (error) {
      console.log("Get getActi Actions Error:", error);
    }
  };
}

export function getItemById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/country/${id}`);
      dispatch({ type: GET_ITEM_BY_ID, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ITEM_BY_ID, payload: null });
    }
  };
}

export function orderByActivity(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
}

export function orderByActivity2() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/activity`);
      dispatch({ type: FILTER_BY_ACTIVITY2, payload: response.data });
    } catch (error) {
      console.log("Get getActi Actions Error:", error);
    }
  };
}

export function FilterByActi(payload) {
  const countries = payload.countries;
  // You can now use the 'countries' variable for further processing
  console.log(countries);

  // Alternatively, you can directly destructure the 'countries' property from the payload
  // const { countries } = payload;
  // console.log(countries);

  return {
    type: "FILTER_BY_ACTI",
    payload,
  };
}

/* export function FilterByCreated(payload) {
  if (payload === "All") {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload,
    };
  } else {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload === "true",
    };
  }
} */

export function orderByAZ(payload) {
  return {
    type: "ORDER_BY_AZ",
    payload,
  };
}

export function FilterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function FilterByContinent3(payload) {
  return {
    type: "FILTER_BY_CONTINENT3",
    payload,
  };
}

export function FilterByContinent4(payload) {
  return {
    type: "FILTER_BY_CONTINENT4",
    payload,
  };
}

export function FilterByA(payload) {
  return {
    type: "FILTER_BY_A",
    payload,
  };
}

export function orderByPoblation(payload) {
  return {
    type: "ORDER_BY_POBLATION",
    payload,
  };
}

export function getItemByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3002/country?name=` + payload
      );
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: "not found",
      });
    }
  };
}

export function getActiByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3002/activity?name=` + payload
      );
      return dispatch({
        type: GET_ACTI_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: GET_ACTI_BY_NAME,
        payload: "not found",
      });
    }
  };
}

export function clearSearch() {
  return { type: CLEAR_SEARCH };
}

export function getModifyActivities() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3002/activity`);
      dispatch({ type: GET_MODIFY_ACTIVITIES, payload: response.data });
    } catch (error) {
      console.log("Get getActi Actions Error:", error);
    }
  };
}
