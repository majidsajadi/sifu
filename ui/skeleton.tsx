import { HTMLAttributes } from "react";
import { clsx } from "clsx";
import styles from "./skeleton.module.css";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.skeleton, className)} {...props}></div>;
}
