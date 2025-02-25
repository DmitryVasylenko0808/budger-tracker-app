import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type PortalProps = PropsWithChildren & {
  targetId: string;
};

export const Portal = ({ children, targetId }: PortalProps) => {
  return createPortal(
    children,
    document.querySelector(`#${targetId}`) as Element
  );
};
