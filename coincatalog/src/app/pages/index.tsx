import { useState, useEffect } from "react";
import CoinList from "../components/CoinList";
import { fetchCoinList } from "../services/api";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCoinList()
      .then((data) => {
        setCoins(data.slice(0, 100));
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch coin data");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  <div className={styles.container}>
    <h1 className={styles.title}>Available Coins</h1>
    <CoinList coins={coins} />
  </div>;
}
