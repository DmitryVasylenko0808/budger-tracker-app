'use client';

import { useMutation } from '@tanstack/react-query';
import { FileDown } from 'lucide-react';

import Image from 'next/image';

import { useToggleMenu } from '@/hooks';

import { Button, Menu } from '@/shared/ui';

import { ExportApi } from '../api';

type ExportingTransactionsProps = {
  categoryIds: number[];
};

export const ExportingTransactions = ({ categoryIds }: Readonly<ExportingTransactionsProps>) => {
  const { open, ref, onToggle } = useToggleMenu();
  const { mutate } = useMutation({
    mutationFn: ExportApi.exportTransactions,
    onSuccess: (data: Blob, requestParams) => {
      const blob = new Blob([data], { type: data.type });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions.${requestParams.format}`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: () => alert('Ooops... something went wrong'),
  });

  const handleClickExport = (format: ExportFormat) => mutate({ format, categoryIds });

  return (
    <Menu
      trigger={
        <Button variant="filled" className="relative" onClick={onToggle}>
          <FileDown size={20} /> Export
        </Button>
      }
      content={
        <ul className="w-32">
          <li>
            <Button variant="menu" onClick={() => handleClickExport('csv')}>
              <Image src="/csv.svg" alt="csv-icon" width={20} height={20} /> Export CSV
            </Button>
          </li>
          <li>
            <Button variant="menu" onClick={() => handleClickExport('xls')}>
              <Image src="/excel.svg" alt="csv-icon" width={20} height={20} /> Export Excel
            </Button>
          </li>
          <li>
            <Button variant="menu" onClick={() => handleClickExport('pdf')}>
              <Image src="/pdf.svg" alt="csv-icon" width={20} height={20} /> Export PDF
            </Button>
          </li>
          <li>
            <Button variant="menu" onClick={() => handleClickExport('json')}>
              <Image src="/json.svg" alt="csv-icon" width={20} height={20} /> Export JSON
            </Button>
          </li>
        </ul>
      }
      open={open}
      ref={ref}
    />
  );
};
