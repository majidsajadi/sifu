import { HTMLAttributes } from "react";
import { clsx } from "clsx";
import styles from "./spinner.module.css";

export function Spinner({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={clsx(styles.spinner, className)} {...props}></span>;
}
