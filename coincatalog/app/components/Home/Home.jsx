"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const formatPercent = (number) => `${number.toFixed(2)}%`;
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);
  const { data, loading, error } = useAxios(
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
  );
  function extract(url) {
    const regex = /images\/(\d+)\/large/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  return (
    <div className="min-h-screen">
      {data && (
        <div className="mx-auto mt-36 max-w-[90%]">
          <table className="table table-hover cursor-pointer w-full">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>24H Change</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {data.map((coin) => (
                <tr key={coin.id} onClick={() => navigate(`/coin/${coin.id}`)}>
                  <td>
                    {coin.symbol.toUpperCase()}
                    <img
                      src={coin.image}
                      style={{ width: 25, height: 25, marginRight: 2 }}
                      alt={`${coin.symbol} logo`}
                      onClick={() => navigate("./CryptoDetail")}
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
                  <td>{formatDollar(coin.current_price, 11)}</td>
                  <td>{formatDollar(coin.market_cap, 10)}</td>
                  <td>
                    <img
                      src={`https://www.coingecko.com/coins/${extract(
                        coin.image
                      )}/sparkline.svg`}
                      alt="Sparkline"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
