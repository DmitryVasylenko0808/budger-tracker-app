"use client";

import { useEffect, useState } from "react";

export const usePagination = (...resetDependecies: any[]) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setPage(1);
  }, [limit, ...resetDependecies]);

  const handleClickNextPage = () => setPage((prev) => prev + 1);
  const handleClickPrevPage = () => setPage((prev) => prev - 1);
  const resetPage = () => setPage(1);
  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  return {
    page,
    limit,
    resetPage,
    onClickNextPage: handleClickNextPage,
    onClickPrevPage: handleClickPrevPage,
    onChangeLimit: handleChangeLimit,
  };
};
