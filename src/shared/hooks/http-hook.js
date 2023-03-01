import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpClientAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpClientAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpClientAbortCtrl.signal,
        });
        const responseJson = await response.json();
        if (!response.ok) {
          throw new Error(responseJson.message);
        }
        return responseJson;
        setIsLoading(false);
      } catch (err) {
        console.log("error", err);
        setIsError(err.message || "Something went wrong in Auth process");
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setIsError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abrtCtrl) => {
        abrtCtrl.abort();
      });
    };
  }, []);
  return { isLoading, isError, sendRequest, clearError };
};
