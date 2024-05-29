import styles from "./layout.module.css";

export default function Layout({
  children,
  commits,
  changelog,
}: {
  children: React.ReactNode;
  commits: React.ReactNode;
  changelog: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <section className={styles.overview}>{children}</section>
      <section className={styles.commits}>commits</section>
      <section className={styles.changelog}>changelog</section>
    </div>
  );
}
