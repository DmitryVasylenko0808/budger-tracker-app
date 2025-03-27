import { RefObject } from 'react';

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
          className="absolute right-0 top-full z-10 rounded-lg border border-gray-200/15 bg-white p-1 shadow-2xl"
        >
          {content}
        </div>
      )}
    </div>
  );
};
