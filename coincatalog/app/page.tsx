"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import CoinGecko from "coingecko-api";
import "bootstrap/dist/css/bootstrap.min.css";

const coinGeckoClient = new CoinGecko();

export default function Home() {
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumSignificantDigits,
    }).format(number);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          order: CoinGecko.ORDER.MARKET_CAP_DESC,
        };

        const result = await coinGeckoClient.coins.markets({ params });
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="min-h-screen">
      <div className="bg-black">
        <Header />
      </div>

      <div className="mt-10"></div>
      <div className="mt-20"></div>

      {data && (
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>24H Change</th>
              <th>Price</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin: any) => (
              <tr key={coin.id}>
                <td>
                  {coin.symbol.toUpperCase()}

                  <img
                    src={coin.image}
                    style={{ width: 25, height: 25, marginRight: 2 }}
                  />
                </td>
                <td>
                  <span
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td>{formatDollar(coin.current_price, 20)}</td>
                <td>{formatDollar(coin.market_cap, 12)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
