import { Button, Select } from "@/shared/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TransactionsPaginationPanelProps = {
  page: number;
  limit: number;
  totalPages: number;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
  onSelectLimit: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TransactionsPaginationPanel = ({
  page,
  limit,
  totalPages,
  onClickPrevPage,
  onClickNextPage,
  onSelectLimit,
}: Readonly<TransactionsPaginationPanelProps>) => {
  return (
    <div className="mb-3 flex items-center justify-end gap-4">
      <div className="inline-flex items-center gap-1">
        <label className="block text-sm font-semibold">Page:</label>
        <div className="inline-flex items-center gap-1">
          <Button variant="text" onClick={onClickPrevPage} disabled={page <= 1}>
            <ChevronLeft size={20} />
          </Button>
          <span className="font-semibold">
            {page}/{totalPages}
          </span>
          <Button
            variant="text"
            onClick={onClickNextPage}
            disabled={page >= totalPages}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div className="inline-flex items-center gap-1">
        <label className="block text-sm font-semibold">Per page:</label>
        <Select
          className="w-20"
          options={[
            { id: "1", value: 20, title: "20" },
            { id: "2", value: 30, title: "30" },
            { id: "3", value: 50, title: "50" },
          ]}
          onChange={onSelectLimit}
          value={limit}
        />
      </div>
    </div>
  );
};
