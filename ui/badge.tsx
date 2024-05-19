import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./badge.module.css";

const badgeVariants = cva(styles.base, {
  variants: {
    variant: {
      danger: styles.danger,
      success: styles.success,
      default: styles.default,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={badgeVariants({ className, variant })} {...props} />;
}
