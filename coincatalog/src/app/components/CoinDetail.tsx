import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchCoinDetails } from "../services/api";
import styles from "../styles/CoinDetail.module.css";

export default function CoinDetail({ id }) {
  const router = useRouter();
  const [coinDetails, setCoinDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCoinDetails(id)
        .then((data) => {
          setCoinDetails(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch coin details");
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!coinDetails) return null;

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        Back to List
      </button>
      <h1>{coinDetails.name}</h1>
      <img src={coinDetails.image.large} alt={coinDetails.name} />
      <p>Symbol: {coinDetails.symbol.toUpperCase()}</p>
      <p>Current Price: ${coinDetails.market_data.current_price.usd}</p>
      <p>Market Cap: ${coinDetails.market_data.market_cap.usd}</p>
      <p>24h Trading Volume: ${coinDetails.market_data.total_volume.usd}</p>
      <h2>Description:</h2>
      <div dangerouslySetInnerHTML={{ __html: coinDetails.description.en }} />
    </div>
  );
}
