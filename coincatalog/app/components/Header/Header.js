"use client";

import Link from "next/link";
import Image from "next/image";

const styles = {
  navLink: `text-white flex mx-[90px]  `,
  badge: `rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 left-45 right-14 top-1 ring-4`,
  navItem: `relative mr-1 cursor-pointer hover:opacity-60 text-decoration-none `,
  nav: `flex justify-center items-center gap-[20px] text-decoration-none `,
  header: `bg-[#17171A] text-white h-20 flex gap-[100px] w-full p-[30px]`,
  headerWrapper: `flex justify-center h-full max-w-screen-xl mx-auto px-4`,
  inputContainer: `flex items-center justify-center p-2 rounded bg-[#171924]`,
  input: `bg-transparent outline-none text-white w-70 ml-3`,
  cursorPointer: `mr-5 cursor-pointer`,
};

const Header = () => {
  return (
    <div className={styles.header}>
      <img
        alt="CoinMarketCap"
        src="https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_white_1.svg"
        width={220}
        height={220}
      />

      <div className={styles.headerWrapper}>
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <Link href="/" passHref>
              <div className={styles.navLink}>Cryptocurrencies</div>
            </Link>
            <div className={styles.badge} />
          </div>

          <div className={styles.navItem}>
            <Link href="/crypto-town" passHref>
              <div className={styles.navLink}>CryptoTown</div>
            </Link>
            <div className={styles.badge} />
          </div>

          <div className={styles.navItem}>
            <Link href="/trending" passHref>
              <div className={styles.navLink}>Trending</div>
            </Link>
          </div>

          <div className={styles.navItem}>
            <Link href="/learn" passHref>
              <div className={styles.navLink}>Learn</div>
            </Link>
          </div>
        </nav>

        <div className="flex items-center">
          <div className={styles.inputContainer}>
            <input className={styles.input} placeholder="Search" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
