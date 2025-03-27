import { X } from 'lucide-react';

import { ComponentProps } from 'react';

import { Button } from './button';
import { Portal } from './portal';

export type ModalProps = ComponentProps<'div'> & {
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
      <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        <div className="max-h-modal w-modal overflow-auto rounded-lg bg-white p-5 shadow-xl">
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
