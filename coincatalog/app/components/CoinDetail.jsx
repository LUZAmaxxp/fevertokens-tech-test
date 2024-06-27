import { useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import Skeleton from "./Skeleton";

const CoinDetail = () => {
  const { id } = useParams();
  const { data } = useAxios(
    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  if (!data) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-72 w-full mb-10" />
      </div>
    );
  }

  return (
    <div className="mt-11 ml-11 mr-11">
      <div className="flex gap-2  mb-6">
        <img src={data.image.small} alt={data.name} />
        <h1 className="text-2xl capitalize font-bold font-sans flex items-center ">
          {data.name}
        </h1>
      </div>
      <p
        className=" text-black font-sans "
        dangerouslySetInnerHTML={{ __html: data.description.en }}
      ></p>
    </div>
  );
};

export default CoinDetail;
