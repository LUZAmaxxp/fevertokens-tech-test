import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (param) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  axios.defaults.baseURL = "https://api.coingecko.com/api/v3";

  const fetchData = async (param) => {
    try {
      setLoading(true);
      const result = await axios(param, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: true,
        },
      });
      setData(result.data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param);
  }, [param]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(param),
  };
};

export default useAxios;
