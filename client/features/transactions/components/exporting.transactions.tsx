"use client";

import { Button } from "@/shared/ui";
import { FileDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getExport } from "../api";

type ExportingTransactionsProps = {
  categoryIds: number[];
};

export const ExportingTransactions = ({
  categoryIds,
}: Readonly<ExportingTransactionsProps>) => {
  const { mutate } = useMutation({
    mutationFn: getExport,
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.csv";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: () => alert("Ooops... something went wrong"),
  });

  const handleClickExport = () => mutate({ categoryIds });

  return (
    <Button variant="filled" className="relative" onClick={handleClickExport}>
      <FileDown size={20} /> Export CSV
    </Button>
  );
};
