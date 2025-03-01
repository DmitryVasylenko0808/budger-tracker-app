import { useState, useRef } from "react";
import { useClickOutside } from "./useClickOutside";

export const useToggleMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const onToggle = () => setOpen((open) => !open);

  return { open, ref, onToggle };
};
