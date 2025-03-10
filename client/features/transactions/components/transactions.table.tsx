import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type BaseTransactionTableProps = PropsWithChildren & {
  isFetching?: boolean;
};

type SelectableTransactionTableProps = BaseTransactionTableProps & {
  selectedAll: boolean;
  onSelectAll: () => void;
};

type TransactionsTableProps =
  | BaseTransactionTableProps
  | SelectableTransactionTableProps;

export const TransactionsTable = ({
  isFetching,
  children,
  ...props
}: TransactionsTableProps) => {
  const isSelectable = "selectedAll" in props && "onSelectAll" in props;

  return (
    <table
      className={cn("w-full table-fixed border border-gray-100/25", {
        "opacity-50": isFetching === true,
      })}
    >
      <thead className="border-b border-gray-100/25">
        <tr>
          {isSelectable && (
            <th className="w-8 px-3 py-1.5 text-left font-semibold">
              <input
                type="checkbox"
                aria-label="all"
                checked={props.selectedAll}
                onChange={props.onSelectAll}
              />
            </th>
          )}

          <th className="px-3 py-1.5 text-left font-semibold">Name</th>
          <th className="px-3 py-1.5 text-left font-semibold">Type</th>
          <th className="px-3 py-1.5 text-left font-semibold">Amount</th>
          <th className="px-3 py-1.5 text-left font-semibold">Category</th>
          <th className="px-3 py-1.5 text-left font-semibold">Date</th>
        </tr>
      </thead>
      <tbody className="">{children}</tbody>
    </table>
  );
};
