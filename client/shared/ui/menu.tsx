import { RefObject } from "react";

type MenuProps = Readonly<{
  trigger: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  ref: RefObject<HTMLDivElement | null>;
}>;

export const Menu = ({ trigger, content, open, ref }: MenuProps) => {
  return (
    <div className="relative">
      {trigger}
      {open && (
        <div
          ref={ref}
          className="absolute top-full right-0 z-10 p-1 bg-white border border-gray-200/15 rounded-lg shadow-2xl"
        >
          {content}
        </div>
      )}
    </div>
  );
};
