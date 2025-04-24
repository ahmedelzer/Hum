import { useContext, useEffect, useState } from "react";
import { GetProjectUrl, request, SetHeaders } from "../../../request";
import { LocalizationContext } from "../../../context/LocalizationContext";

const useFetchWithoutBaseUrl = (realurl) => {
  const { language: Lan } = useContext(LocalizationContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const headers = await SetHeaders();
        console.log(headers);

        request.interceptors.request.use(
          (config) => {
            config.headers = {
              ...config.headers,
              ...headers,
            };
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        const res = await request.get(realurl);

        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (realurl) fetchData();
  }, [realurl, Lan]); // refetch if language or url changes

  return { data, isLoading, error };
};

export default useFetchWithoutBaseUrl;
