import { useContext, useEffect, useState } from "react";
import {
  defaultProjectProxyRoute,
  GetProjectUrl,
  request,
  SetHeaders,
} from "../../../request";
import { LocalizationContext } from "../../../context/LocalizationContext";

const UseFetchWithoutBaseUrl = async (realurl) => {
  // console.log(base_URL, GetProjectUrl());
  // const navigate = useNavigate();
  const { language: Lan } = useContext(LocalizationContext);
  //base_URL = "";
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const headers = await SetHeaders();
  console.log("====================================");
  console.log(realurl, headers);
  console.log("====================================");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      request.interceptors.request.use(
        (config) => {
          config.headers = {
            ...config.headers,
            ...headers(), // Update headers before sending the request
          };
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      try {
        const res = await request.get(realurl);
        console.log("====================================");
        console.log(realurl, res);
        console.log("====================================");
        setData(res.data);
      } catch (error) {
        setError(error);
        if (error.code === 401) {
          //todo handle error message
          // RedirectToLogin(navigate, error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [realurl, Lan]);

  return { data, isLoading, error };
};

export default UseFetchWithoutBaseUrl;
