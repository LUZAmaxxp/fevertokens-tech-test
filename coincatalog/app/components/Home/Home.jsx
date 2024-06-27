"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const coinsPerPage = 50;

  const formatPercent = (number) => `${number}%`;
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }).format(number);

  const { data, loading, error } = useAxios(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${page}&sparkline=true`
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

  const totalCoins = 1423;
  const totalPages = Math.ceil(totalCoins / coinsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`btn ${i === page ? "btn-primary" : "btn-secondary"} mx-1`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleCoinClick = (id) => {
    try {
      navigate(`/coin/${id}`);
    } catch (error) {
      console.error("Error navigating to coin details:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <ClipLoader size={100} color={"#123abc"} loading={loading} />
        </div>
      )}
      {error && (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
          <img
            src="https://i.pinimg.com/564x/b0/de/75/b0de755d2943b5f201c3702fd59f20f8.jpg"
            alt="Error illustration"
            style={{ width: "300px", height: "300px" }}
          />
          <p className="font-sans w-fit text-xl font-bold">
            Sorry..... I'm just a beginner
          </p>
        </div>
      )}
      {!loading && !error && data && (
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
                <tr key={coin.id} onClick={() => handleCoinClick(coin.id)}>
                  <td>
                    {coin.symbol.toUpperCase()}
                    <img
                      src={coin.image}
                      style={{ width: 25, height: 25, marginRight: 2 }}
                      alt={`${coin.symbol} logo`}
                      onClick={() => handleCoinClick(coin.id)}
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
          <div className="d-flex justify-content-center my-4">
            <button
              className="btn btn-primary mx-1"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className="btn btn-primary mx-1"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
