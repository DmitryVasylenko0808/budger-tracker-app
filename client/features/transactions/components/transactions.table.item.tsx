"use client";

import { useModal } from "@/hooks";
import { TransactionModal } from "./transaction.modal";
import { cn } from "@/utils/cn";

type BaseTransactionsTableItemProps = {
  data: Transaction;
};

type SelectableTransactionsTableItemProps = BaseTransactionsTableItemProps & {
  selected: boolean;
  onSelect: () => void;
};

type TransactionsTableItemProps =
  | BaseTransactionsTableItemProps
  | SelectableTransactionsTableItemProps;

export const TransactionsTableItem = ({
  data,
  ...props
}: TransactionsTableItemProps) => {
  const modal = useModal();

  const isSelectable = "selected" in props && "onSelect" in props;
  const date = new Date(data.createdAt).toLocaleDateString();

  return (
    <tr
      className={cn("odd:bg-gray-100/10 hover:bg-primary-100/10", {
        "bg-primary-100/10 odd:bg-primary-100/10":
          isSelectable && props.selected === true,
      })}
    >
      {isSelectable && (
        <td className="w-8 px-3 py-1.5 text-left">
          <input
            type="checkbox"
            aria-label="all"
            className=""
            checked={props.selected}
            onChange={props.onSelect}
          />
        </td>
      )}

      <td className="px-3 py-1.5 text-left">
        <span onClick={modal.onOpen} className="hover:underline cursor-pointer">
          {data.name}
        </span>
        <TransactionModal
          transactionId={data.id}
          open={modal.open}
          onClose={modal.onClose}
        />
      </td>
      <td className="px-3 py-1.5 text-left">{data.category.type}</td>
      <td className="px-3 py-1.5 text-left">{data.amount}</td>
      <td className="px-3 py-1.5 text-left">{data.category.name}</td>
      <td className="px-3 py-1.5 text-left">{date}</td>
    </tr>
  );
};
