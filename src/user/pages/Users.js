import React, { useEffect, useState } from "react";
import UserList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseJson = await response.json();

        if (!response.ok) {
          throw new Error(responseJson.message);
        }

        setLoadedUsers(responseJson.users);
      } catch (error) {
        setIsError(error.message || "Something went wrong in GET USER process");
      }
      setIsLoading(false);
    };
    console.log(loadedUsers);
    sendRequest();
  }, []);

  const errorHandler = () => {
    setIsError(null);
  };
  return (
    <React.Fragment>
      {isError && <ErrorModal error={isError} onClear={errorHandler} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
