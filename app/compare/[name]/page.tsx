import { formatDate } from "@/utils/date";
import { Circle, Copy, Dot, Pentagon } from "lucide-react";
import { commits } from "./data";
import { TComparePageProps } from "./types";

import styles from "./page.module.css";
import clsx from "clsx";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Link from "next/link";

export default async function Page({ params }: TComparePageProps) {
  return (
    <ul className={styles.timeline}>
      <li className={clsx(styles.item, styles.head)}>
        <div className={styles.separator}>
          <div className={styles.dot}>
            <Pentagon size={14} />
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.content}>2.1.3</div>
      </li>
      {commits.commits.map((commit) => (
        <li className={styles.item}>
          <div className={styles.separator}>
            <div className={styles.dot}>
              <Circle size={12} />
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.content}>
            <div className={styles.heading}>
              <Link href={commit.url}>{commit.sha.substring(0, 7)}</Link>
              <span className={styles.title}>{commit.message.split("\n")[0]}</span>
            </div>
            <div className={styles.description}>
              <span>authored by <Link href={commit.author.url}>{commit.author.name}</Link> on {formatDate(commit.date)}</span>
            </div>
          </div>
        </li>
      ))}
      <li className={clsx(styles.item, styles.head)}>
        <div className={styles.separator}>
          <div className={styles.dot}>
            <Pentagon size={14} />
          </div>
        </div>
        <div className={styles.content}>2.1.3</div>
      </li>
    </ul>
  );
}

{
  /* <div>
<div>
  <h3>Info</h3>
  <div>React</div>
  <div>Prev ---- CUrrent</div>
  <div>Links</div>
  <div>Filter</div>
</div>
<hr />
<div>Commits</div>
<div>Compat</div>
<div>Size</div>
<div>Changelog</div>
</div> */
}
