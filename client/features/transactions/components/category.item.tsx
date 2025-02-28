"use client";

import { Button, Menu } from "@/shared/ui";
import { Ellipsis } from "lucide-react";
import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks";

type CategoryItemProps = {
  category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const handleToggleMenu = () => setOpen((open) => !open);

  return (
    <li className="p-2 bg-gray-50 duration-100 hover:bg-gray-100/10 first:rounded-t-lg last:rounded-b-lg">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-semibold text-black">{category.name}</h3>
        </div>
        <div>
          <Menu
            open={open}
            trigger={
              <Button variant="text" onClick={handleToggleMenu}>
                <Ellipsis size={20} />
              </Button>
            }
            content={
              <ul className="w-32">
                <li>
                  <Button
                    variant="menu"
                    onClick={() => console.log("clicked 1")}
                  >
                    Edit
                  </Button>
                </li>
                <li>
                  <Button
                    variant="menu"
                    onClick={() => console.log("clicked 2")}
                  >
                    Delete
                  </Button>
                </li>
              </ul>
            }
            ref={ref}
          />
        </div>
      </div>
    </li>
  );
};
