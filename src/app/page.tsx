import styles from "./page.module.css";

import SearchPlayer from "./SearchPlayer";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>Hello World!</div>

      <SearchPlayer />
    </main>
  );
}
