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


  return children
  
  return (
    <div className={styles.container}>
      <section>{commits}</section>
      <section>{changelog}</section>
    </div>
  );
}
