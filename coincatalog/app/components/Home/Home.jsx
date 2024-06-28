"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

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

  const totalCoins = 14855;
  const totalPages = Math.ceil(totalCoins / coinsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = (
      <span key="ellipsis" className="mx-1">
        ...
      </span>
    );
    const maxVisiblePages = 5;

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`btn ${
              i === page ? "btn-primary" : "btn-secondary"
            } mx-1`}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => setPage(1)}
            className={`btn ${
              1 === page ? "btn-primary" : "btn-secondary"
            } mx-1`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.push(ellipsis);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`btn ${
              i === page ? "btn-primary" : "btn-secondary"
            } mx-1`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(ellipsis);
        }
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => setPage(totalPages)}
            className={`btn ${
              totalPages === page ? "btn-primary" : "btn-secondary"
            } mx-1`}
          >
            {totalPages}
          </button>
        );
      }
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data
    ? data.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
      )
    : [];

  const selectStyles = {
    appearance: "none",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px 10px",
    fontSize: "16px",
    color: "#333",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const selectFocusStyles = {
    borderColor: "#007bff",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
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
            src="/wakwak.avif"
            alt="Error illustration"
            style={{ width: "300px", height: "300px" }}
          />
          <p className="font-sans w-fit text-xl font-bold">
            Too Many Requests!
          </p>
        </div>
      )}
      {!loading && !error && data && (
        <div className="mx-auto mt-36 max-w-[90%]">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <label
                className="mr-2 mt-1 font-semibold font-sans"
                htmlFor="coinsPerPageSelect"
              >
                Coins per page:
              </label>
              <select
                id="coinsPerPageSelect"
                value={coinsPerPage}
                onChange={(e) => {
                  setCoinsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                style={selectStyles}
                onFocus={(e) =>
                  Object.assign(e.target.style, selectFocusStyles)
                }
                onBlur={(e) => Object.assign(e.target.style, selectStyles)}
              >
                <option value={100}>100</option>
                <option value={50}>50</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Find Currency"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
                style={{ width: "200px" }}
              />
            </div>
          </div>
          <table className="table table-hover cursor-pointer w-full">
            <thead>
              <tr>
                <th>Rank 🏆</th>
                <th>Symbol</th>
                <th>Full Name</th>
                <th>24H Change 📈</th>
                <th>Price 💵</th>
                <th>Market Cap 💰</th>
                <th>Last 7 Days 🔥</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((coin) => (
                <tr key={coin.id} onClick={() => handleCoinClick(coin.id)}>
                  <td>{coin.market_cap_rank}</td>
                  <td>
                    {coin.symbol.toUpperCase()}
                    <img
                      src={coin.image}
                      style={{ width: 25, height: 25, marginRight: 2 }}
                      alt={`${coin.symbol} logo`}
                      onClick={() => handleCoinClick(coin.id)}
                    />
                  </td>
                  <td>{coin.name}</td>
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
