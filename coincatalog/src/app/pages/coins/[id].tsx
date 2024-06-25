import { useRouter } from "next/router";
import CoinDetail from "../../components/CoinDetail";

export default function CoinDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return <CoinDetail id={id} />;
}
