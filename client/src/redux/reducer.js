import {
  GET_COUNTRIES,
  GET_ACTIVITY,
  GET_ACTI,
  GET_ITEM_BY_ID,
  ORDER_BY_AZ,
  FILTER_BY_CONTINENT,
  ORDER_BY_POBLATION,
  CLEAR_SEARCH,
  FILTER_BY_CONTINENT3,
  FILTER_BY_CONTINENT4,
  GET_ITEM_BY_NAME,
  GET_MODIFY_ACTIVITIES,
  FILTER_BY_ACTIVITY,
  FILTER_BY_ACTIVITY2,
  GET_ACTI_BY_NAME,
  FILTER_BY_A,
  FILTER_BY_ACTI,
  GET_ACTIVITY_AND_COUNTRY,
  GET_PAJARO,
  GET_ACTIVITY_COUNTRY,
  GET_NOMBRE_PAIS,
  /*   FILTER_BY_CREATED, */
} from "./actions";

const initialState = {
  countries: [],
  initialCountries: [],
  allCountries: [],
  countryActy: [],
  allActivities: [],
  pais: [],
  getActi: [],
  itemById: [],
  filteredItem: [],
  filteredCountries: [],
  modifyItem: [],
  CountryName: [],
  pajaro: [],
  activityAndCountry: [],
  allactivityAndCountry: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_ACTIVITY:
      return {
        ...state,
        countryActy: action.payload,
        allActivities: action.payload,
      };

    case GET_ACTI:
      return {
        ...state,
        getActi: action.payload,
      };

    case GET_ACTIVITY_COUNTRY:
      return {
        ...state,
        activityAndCountry: action.payload,
        allactivityAndCountry: action.payload,
      };

    /*     case GET_PAJARO:
      return {
        ...state,
        pajaro: action.payload,
      };
 */

    case GET_ITEM_BY_ID:
      return {
        ...state,
        itemById: action.payload,
      };

    case FILTER_BY_ACTIVITY2:
      return {
        ...state,
        getActi: action.payload,
      };

    case FILTER_BY_ACTIVITY:
      const allActi = state.allCountries;
      const filteredActi =
        action.payload === "All"
          ? allActi
          : allActi.filter((el) =>
              el.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      return {
        ...state,
        countryActy: filteredActi,
      };

    case FILTER_BY_CONTINENT:
      const allContinents = state.allCountries;
      const filteredContinents =
        action.payload === "All"
          ? allContinents
          : allContinents.filter((el) => el.continents === action.payload);
      return {
        ...state,
        countries: filteredContinents,
      };

    case FILTER_BY_CONTINENT3:
      const allContinents3 = state.allCountries;
      const filteredContinents3 =
        action.payload === "All"
          ? allContinents3
          : allContinents3.filter((el) => el.name === action.payload);
      return {
        ...state,
        countries: filteredContinents3,
      };

    case FILTER_BY_CONTINENT4:
      const allContinents4 = state.allActi;
      const filteredContinents4 =
        action.payload === "All"
          ? allContinents4
          : allContinents4.filter((el) => el.countries === action.payload);
      return {
        ...state,
        countries: filteredContinents4,
      };

    case FILTER_BY_A:
      const allA = state.allActi;
      const filteredA =
        action.payload === "All"
          ? allA
          : allA.filter((el) => el.name === action.payload);
      return {
        ...state,
        getActi: filteredA,
      };

    case ORDER_BY_AZ:
      const allAlphabet = state.allCountries;
      let sortedArr;
      if (action.payload === "des") {
        sortedArr = state.countries.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "asc") {
        sortedArr = state.countries.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        });
      } else if (action.payload === "clear") {
        sortedArr = allAlphabet;
      }

      return { ...state, countries: sortedArr };

    case ORDER_BY_POBLATION:
      const allItems = state.allCountries;
      let sortedItems;
      if (action.payload === "asc") {
        sortedItems = state.countries.slice().sort(function (a, b) {
          return b.population - a.population;
        });
      } else if (action.payload === "des") {
        sortedItems = state.countries.slice().sort(function (a, b) {
          return a.population - b.population;
        });
      } else if (action.payload === "clear") {
        sortedItems = allItems;
      }

      return { ...state, countries: sortedItems };

    case GET_ITEM_BY_NAME:
      let search;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        search = action.payload;
      } else {
        search = [];
      }
      return {
        ...state,
        countries: search,
      };

    case GET_ACTI_BY_NAME:
      let searchActi;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        searchActi = action.payload;
      } else {
        searchActi = [];
      }
      return {
        ...state,
        countries: searchActi.countryActy,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        allCountries: state.initialCountries,
      };

    case GET_MODIFY_ACTIVITIES:
      return {
        ...state,
        modifyItem: action.payload,
      };

    case FILTER_BY_ACTI:
      const allTypes = state.allCountries;
      const filteredTypes =
        action.payload === "All"
          ? allTypes
          : allTypes.filter((el) => el.name.includes(action.payload));
      return {
        ...state,
        countries: filteredTypes,
      };
    /*     case FILTER_BY_CREATED:
      const allCreated = state.allCountries;
      const filteredCreated =
        action.payload === "All"
          ? allCreated
          : allCreated.filter((el) => el.create === action.payload);
      return {
        ...state,
        countries: filteredCreated,
      }; */

    /*    case GET_ACTIVITY_AND_COUNTRY:
      const countryNames = action.payload.map((activity) => ({
        id: activity.id,
        countries: activity.countries,
      }));

      return {
        ...state,
        CountryName: countryNames,
      }; */

    case GET_NOMBRE_PAIS:
      const allPais = state.allCountries;
      let filteredPais = [];

      if (action.payload === "All") {
        filteredPais = allPais;
      } else {
        const selectedCountries = action.payload
          .split(",")
          .map((name) => name.trim());
        filteredPais = allPais.filter((el) =>
          selectedCountries.includes(el.name)
        );
      }

      return {
        ...state,
        countries: filteredPais,
      };

    default:
      return state;
  }
};

export default rootReducer;
