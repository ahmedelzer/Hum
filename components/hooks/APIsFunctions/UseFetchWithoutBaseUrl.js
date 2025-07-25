import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request, SetHeaders } from "../../../request";

const useFetchWithoutBaseUrl = (realurl) => {
  const languageRow = useSelector((state) => state.localization.languageRow);

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
  }, [realurl, languageRow]); // refetch if language or url changes

  return { data, isLoading, error };
};

export default useFetchWithoutBaseUrl;
