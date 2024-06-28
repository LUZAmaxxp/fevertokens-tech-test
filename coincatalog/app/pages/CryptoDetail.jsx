import React, { useState } from "react";
import CoinDetail from "../components/CoinDetail";
import HistoryChart from "../components/HistoryChart";

const CryptoDetail = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <img
          src="/wakwak.avif"
          alt="Error illustration"
          style={{ width: "300px", height: "300px" }}
        />
        <p className="font-sans w-fit text-xl font-bold">Too Many Requests!</p>
      </div>
    );
  }

  return (
    <div className="wrapper-container mt-10">
      <CoinDetail setError={setHasError} />
      <HistoryChart setError={setHasError} />
    </div>
  );
};

export default CryptoDetail;
