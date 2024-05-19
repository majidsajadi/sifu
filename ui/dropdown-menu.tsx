"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Dot } from "lucide-react";
import {
  Root,
  Trigger,
  RadioGroup,
  Content,
  Separator,
  RadioItem,
  ItemIndicator,
  Portal,
  Label,
} from "@radix-ui/react-dropdown-menu";
import styles from "./dropdown-menu.module.css";

export const DropdownMenu = Root;

export const DropdownMenuTrigger = Trigger;

export const DropdownMenuRadioGroup = RadioGroup;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={styles.content}
      {...props}
    />
  </Portal>
));
DropdownMenuContent.displayName = Content.displayName;

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={styles.separator} {...props} />
));
DropdownMenuSeparator.displayName = Separator.displayName;

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem ref={ref} className={styles["radio-item"]} {...props}>
    <span className={styles.dot}>
      <ItemIndicator>
        <Dot size={24} />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Label ref={ref} className={styles.label} {...props} />
));
DropdownMenuLabel.displayName = Label.displayName;
