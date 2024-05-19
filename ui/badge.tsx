import type { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./badge.module.css";

export function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.badge, className)} {...props} />;
}
