import { useCallback, useContext, useState } from "react";

import { ACTION_TYPES, ShopContext } from "../shop/shopContext";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { state, dispatch } = useContext(ShopContext);

  const success: PositionCallback = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { ...state, latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };

  const error = useCallback(() => {
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
  }, [setIsFindingLocation, setLocationErrorMsg]);

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
