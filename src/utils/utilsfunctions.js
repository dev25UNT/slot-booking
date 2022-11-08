import geocodeToPincode from "geocode-to-pincode";
import { GET_CITY_SUCCESS } from "redux/actions/actionTypes";
import { getCityFail, getCityStart, getCitySuccess } from "redux/actions/cityActions/cityAction";
import { GMAP_API } from "./data";

export const MatchCity = (cityData, currentCity, dispatch) => {
  for (let k1 = 0; k1 < cityData.length; k1++) {
    dispatch(getCityStart());
    if (
      cityData[k1].loc_city_title.toLowerCase() ==
      currentCity.replace(/\s/g, "").toLowerCase()
    ) {
      let id = cityData[k1].loc_city_id;
      dispatch({ type: GET_CITY_SUCCESS, payload: { city: parseInt(id), name: currentCity } })
      localStorage.setItem("cityid", parseInt(id));
      localStorage.setItem("city", currentCity);
      return true;
    } else {
      dispatch(getCityFail("we are not availble in other location"))
      localStorage.setItem("cityid", 1);
      localStorage.setItem("city", "Bengluru");
      alert("we are not availble in other location");
      return false;
    }
  }
};
export const getPincode = (lat, long) => {
  if (lat != null && long != null || lat != undefined && long != undefined) {
    geocodeToPincode({
      lat: lat,
      lng: long,
      key: GMAP_API,
    })
      .then((response) => localStorage.setItem("pincode", response.pincode))
      .catch((error) => console.log(error));
  }
};
