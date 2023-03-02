import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedPlacesUser, setLoadedPlacesUser] = useState([]);

  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          "http://localhost:5000/api/places/user/" + userId
        );
        console.log(response.places);
        setLoadedPlacesUser(response.places);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const DeletePlaceHandler = (deletedPlaceId) => {
    setLoadedPlacesUser((prevPlace) =>
      prevPlace.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      {isError && <ErrorModal error={isError} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlacesUser && (
        <PlaceList
          items={loadedPlacesUser}
          onDeletePlace={DeletePlaceHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
