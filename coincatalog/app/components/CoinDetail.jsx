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
    <div className="my-6">
      <div className="flex gap-2 items-center">
        <img src={data.image.small} alt={data.name} />
        <h1 className="text-2xl mb-2 capitalize font-bold">{data.name}</h1>
      </div>
      <p
        className="mt-6 text-gray-500 [&>a]:text-blue-600 [&>a]:underline"
        dangerouslySetInnerHTML={{ __html: data.description.en }}
      ></p>
    </div>
  );
};

export default CoinDetail;
