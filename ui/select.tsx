"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { Check, ChevronDown, ChevronsDown, ChevronsUp } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { clsx } from "clsx";
import styles from "./select.module.css";

export const Select = SelectPrimitive.Root;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { prefix?: string }
>(({ className, children, prefix, ...props }, ref) => (
  <SelectPrimitive.Trigger
    aria-label={prefix}
    ref={ref}
    className={clsx(styles.trigger, className)}
    {...props}
  >
   {!!prefix && <div className={styles.prefix}> {prefix}: </div>}
    {children}
    <SelectPrimitive.Icon className={styles.icon} asChild>
      <ChevronDown width={20} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={styles["scroll-button"]}
        {...props}
      >
        <ChevronsUp  width={20}/>
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className={styles.viewport}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={styles["scroll-button"]}
        {...props}
      >
        <ChevronsDown  width={18}/>
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={styles.item} {...props}>
    <SelectPrimitive.ItemIndicator className={styles.indicator}>
      <Check  width={18} />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
