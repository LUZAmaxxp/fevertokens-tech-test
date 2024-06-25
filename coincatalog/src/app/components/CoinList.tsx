import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function CoinList({ coins }) {
  return (
    <div className={styles.grid}>
      {coins.map((coin) => (
        <Link href={`/coins/${coin.id}`} key={coin.id}>
          <div className={styles.card}>
            <img src={coin.image} alt={coin.name} width={50} height={50} />
            <h2>{coin.name}</h2>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
