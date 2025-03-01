import { ComponentProps } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { Portal } from "./portal";

export type ModalProps = ComponentProps<"div"> & {
  open: boolean;
  title?: string;

  onClose: () => void;
};

export const Modal = ({ children, open, title, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <Portal targetId="modals-root">
      <div className="fixed top-0 left-0 z-50 w-full min-h-screen flex items-center justify-center bg-black/30">
        <div className="w-modal max-h-modal p-5 bg-white rounded-lg shadow-xl overflow-auto">
          <div className="mb-7 flex items-center">
            <h3 className="flex-1 text-lg font-semibold">{title}</h3>
            <Button variant="text" onClick={onClose}>
              <X size={32} className="text-gray-200" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
